
# what is cache busting?
Understanding Cache Busting: A Practical Approach for React-Razzle Applications
Cache busting is a technique used in web development to ensure that the latest version of a file is fetched from the server, bypassing cached versions. By appending a unique identifier like a version number or timestamp to the file’s URL, the browser treats it as a new resource, fetching the most up-to-date version. This technique prevents users from seeing outdated cached content and improves the overall user experience.

# Bundling
Bundling involves combining multiple JavaScript and CSS files into a single bundle. This reduces the number of network requests required to load the app, resulting in faster initial load times.

# Chunk Loading
Chunk loading is the process of breaking down the bundle into smaller chunks. Each chunk contains a specific set of code required for a particular page or component. This allows for more efficient loading, as only the necessary code is fetched, reducing the initial load size.

# Lazy Loading
Lazy loading is a technique where chunks are loaded asynchronously when needed. This helps improve performance by deferring the loading of non-essential code until it is required, reducing the initial load time.

# Code Splitting
Code splitting involves strategically splitting the code into chunks based on routes or components. This enables efficient caching and faster subsequent loads, as only the changed or required chunks need to be fetched.

1. Implementing cache busting in razzle.config.js:
2. Using react-cache-buster package
3. Implementing cache busting as an HOC pattern
4. Implementing cache busting as a custom hook


As updates roll in with increasing frequency, applications need to embrace efficient caching strategies to ensure users can easily access the latest versions without encountering temporary storage issues.

This is something I recently encountered. I received complaints from users who hadn’t received the most recent update upon its release.

Upon closer inspection, the issue stemmed from the users’ browser cache.

While the solution might seem straightforward — clear the cache — it’s far from ideal, as users would need to perform this action every time an update is released.

This inconvenience prompted me to develop a more effective caching strategy.

During exploration of developing a caching strategy, I came across a technique called cache busting.

This technique is used to force the browser to download the latest file version by changing its unique identifier, usually by adding query parameters or modifying the file name.



# Build Structure
build/
├── asset-manifest.json
├── favicon.ico
├── index.html
├── logo192.png
├── logo512.png
├── manifest.json
├── robots.txt
└── static/
    ├── css/
    │   ├── main.f855e6bc.css
    │   └── main.f855e6bc.css.map
    ├── js/
    │   ├── 638.2ef45c58.chunk.js
    │   ├── 638.2ef45c58.chunk.js.map
    │   ├── main.6204db87.js
    │   ├── main.6204db87.js.LICENSE.txt
    │   └── main.6204db87.js.map
    └── media/
        └── logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg


# Usage: React Cache Buster
This package allows clients to automatically check the new version when a new version is released in the production environment, and if a new version is published, clearing the cache and reload the page.

1. Installation
`npm install react-cache-buster`


2. Add a new script to package.json
"generate-meta-tag": "node ./node_modules/react-cache-buster/dist/generate-meta-tag.js"

3. change your build script like below;
<script>
"scripts": {
  "build": "yarn generate-meta-tag && react-scripts build"

  #or

  "build": "npm run generate-meta-tag && react-scripts build"

  #or

   "build": "npm run generate-meta-tag && tsc -b && vite build",
}
</script>

The generate-meta-tag script command creates a file named meta.json under the public folder under the root directory of your project and writes the current package.json version into the created file.

4. Warp the root element by <CacheBuster></CacheBuster>
<script>
import React from 'react';
import CacheBuster from 'react-cache-buster';
import { version } from '../package.json';
import Loading from './loading';

const App = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return (
    <CacheBuster
      currentVersion={version}
      isEnabled={isProduction} //If false, the library is disabled.
      isVerboseMode={false} //If true, the library writes verbose logs to console.
      loadingComponent={<Loading />} //If not pass, nothing appears at the time of new version check.
      metaFileDirectory={'.'} //If public assets are hosted somewhere other than root on your server.
    >

      // Your actual root component...

    </CacheBuster>
  );
};

export default App;
</script>


The process works as follows;
- When you run the build script, the generate-meta-tag script writes the current package.json version into meta.json and then the build process continues.
- When the client opens the website, the CacheBuster component makes a request to the /meta.json file located in the root.
- Although the website is initially loaded via cache, the updated version data is obtained through the request since XHR requests are not kept in the cache.
- Then, the current version of the cached project is compared with the version received over the request.
- If it is understood that a new version has been published as a result of this comparison, the whole cache is deleted and the project is reloaded.



# Props
Props	                        | Type	    | Required	 | Description
children	                    | JSX	      | ✅	        | Must be your actual root component. If you don't need to clear the cache, React Cache Buster renders the actual component.
currentVersion	              | String	  | ✅	        | Point to the package.json version inside your project.
isEnabled	                    | Boolean	  | ✅	        | Enable/disable React Cache Buster. Default: false
isVerboseMode	                | Boolean	  | ❌	        | If true, React Cache Buster writes verbose logs to console. Default: false
loadingComponent	            | JSX	      | ❌	        | Component to be rendered during the new version control.
metaFileDirectory	            | String	  | ❌	        | If public assets are hosted somewhere other than root on your server, you can pass the directory with this prop.
reloadOnDowngrade	            | Boolean	  | ❌	        | Whether to also bust the cache and reload if the version fetched from the server is lower. Default: false
onCacheClear	                | Function	| ❌	        | This function is called before clearing the cache when a new version is found. If you pass this prop, cache clearing is not performed. Instead, the cache clearing function is sent as a parameter to this function and you are expected to call this function.
Structure of the function: onCacheClear: (refreshCacheAndReload: () => Promise<void>) => void; make table in md format



# Check for new version manually
From any component child of the <CacheBuster> provider, you can use the useCacheBuster hook to get the checkCacheStatus function and trigger a version check and possible cache bust whenever you want, such as on any route change (be mindful of when this can interrupt your user's experience). When you call the checkCacheStatus function, if there is a new version, this method will be called if you have given the onCacheClear prop to CacheBuster, otherwise the page will be refreshed automatically. See example for a simple use case.

const VersionCheckButton = () => {
  const { checkCacheStatus } = useCacheBuster();

  return <button onClick={checkCacheStatus}>Check for new version</button>;
};
