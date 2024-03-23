import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './path/to/postReducer'; // Make sure to provide the correct path

const CreatePostcopy = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector(state => state.post);

  useEffect(() => {
    // Fetch posts when the component mounts
    dispatch(fetchPosts());
  }, [dispatch]); // Ensure dispatch is added as a dependency

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.content}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreatePostcopy;
