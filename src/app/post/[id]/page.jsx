'use client';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@tanstack/react-query';
import supabaseInstance from '../../utils/supabaseInstance';

const fetchPost = async (id) => {
  const response = await supabaseInstance.get(`/posts/${id}`);
  return response.data;
};

const addComment = async ({ postId, content }) => {
  const response = await supabaseInstance.post(`/posts/${postId}/comments`, {
    content,
  });
  return response.data;
};

export default function PostDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: post, isLoading } = useQuery(['post', id], () => fetchPost(id));
  const mutation = useMutation(addComment);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.comment.value) {
      alert('Comment is required');
      return;
    }
    mutation.mutate({ postId: id, content: e.target.comment.value });
    e.target.reset();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
      <h1>{post.content}</h1>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="comment"
          placeholder="Add a comment"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white">
          Submit
        </button>
      </form>
      <ul>
        {post.comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
