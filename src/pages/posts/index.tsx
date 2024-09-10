import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/rootReducer';
import { addPost, deletePost, updatePost } from '../../store/posts/postsAction';
import { Post } from '../../store/posts/types';

const PostComponent: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error, success } = useSelector((state: RootState) => state.posts);

    const handleAddOrUpdatePost = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPostId !== null) {
            const updatedPost: Post = { id: editingPostId, title, content };
            dispatch(updatePost(updatedPost) as any);
        } else {
            const newPost: Post = { id: Date.now(), title, content };
            dispatch(addPost(newPost) as any);
        }

        setTitle('');
        setContent('');
        setEditingPostId(null);
    };

    const handleEditPost = (post: Post) => {
        setTitle(post.title);
        setContent(post.content);
        setEditingPostId(post.id);
    };

    const handleDeletePost = (id: number) => {
        dispatch(deletePost(id) as any);
        if (editingPostId === id) {
            setTitle('');
            setContent('');
            setEditingPostId(null);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className='text-center text-2xl font-bold uppercase mb-5'>
                {editingPostId !== null ? 'Edit Post' : 'Add Post'}
            </h1>

            {loading && <p className="text-center text-blue-500">Loading...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}
            {success && <p className="text-center text-green-500">Success: {success}</p>}

            <form onSubmit={handleAddOrUpdatePost} className="flex flex-col gap-4 mb-5">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="form-control"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    className="form-control"
                    required
                />
                <button
                    type='submit'
                    className="btn btn-primary flex-shrink-0"
                >
                    {loading && "Loading..."}
                    {(!loading && editingPostId == null) && "Add Post"}
                    {editingPostId !== null && 'Update Post'}
                </button>
            </form>

            {posts.length > 0 ? (
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm">
                            <div>
                                <h2 className="text-lg font-semibold">{post.title}</h2>
                                <p>{post.content}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEditPost(post)}
                                    className="btn-primary btn-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeletePost(post.id)}
                                    className="btn-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No posts found!!!</p>
            )}
        </div>
    );
};

export default PostComponent;
