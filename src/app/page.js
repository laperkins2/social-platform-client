import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { supabaseInstance } from '../utils/supabaseInstance';

const fetchPosts = async () => {
  const { data } = await supabaseInstance.get('/posts');
  return data;
};

createPost = async (post) => {
  const { data } = await supabaseInstance.post('/posts', post);
  return data;
};

export function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: posts } = useQuery('posts', fetchPosts);
  const { mutate } = useMutation(createPost);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Title and content are required');
      return;
    }
    mutate({ title, content });
  };

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
