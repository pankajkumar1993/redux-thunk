// ********************* While Using Create React App *********************
// const BASE_PATH = process.env.REACT_APP_API_URL;

// ********************* While Using Vite *********************
const BASE_PATH = import.meta.env.VITE_API_URL;
console.log(BASE_PATH);

export {
    BASE_PATH
}