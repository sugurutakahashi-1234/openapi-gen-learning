import { useState } from "react";
import {
  useDeletePostsByIdApi,
  useGetPostsApi,
  usePostPostsApi,
  usePutPostsByIdApi,
} from "./generated/api";
import type { Post } from "./generated/model";

function App() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const { data: postsResponse, isLoading, error } = useGetPostsApi();
  const createPost = usePostPostsApi();
  const updatePost = usePutPostsByIdApi();
  const deletePost = useDeletePostsByIdApi();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: "clh1234567890abcdef",
    published: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPostId) {
      updatePost.mutate({
        id: selectedPostId,
        data: formData,
      });
    } else {
      createPost.mutate({
        data: formData,
      });
    }
    setFormData({
      title: "",
      content: "",
      userId: "clh1234567890abcdef",
      published: false,
    });
    setSelectedPostId(null);
  };

  const handleEdit = (post: Post) => {
    setSelectedPostId(post.id);
    setFormData({
      title: post.title,
      content: post.content,
      userId: post.userId,
      published: post.published,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const posts = postsResponse?.data?.data;

  return (
    <div className="container">
      <h1>Orval Stack - Post Management</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
        />
        <label>
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
          />
          Published
        </label>
        <button type="submit">
          {selectedPostId ? "Update" : "Create"} Post
        </button>
        {selectedPostId && (
          <button
            type="button"
            onClick={() => {
              setSelectedPostId(null);
              setFormData({
                title: "",
                content: "",
                userId: "clh1234567890abcdef",
                published: false,
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="posts">
        <h2>Posts</h2>
        {posts?.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="post-meta">
              <span>Status: {post.published ? "Published" : "Draft"}</span>
              <span>
                Created: {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="post-actions">
              <button type="button" onClick={() => handleEdit(post)}>
                Edit
              </button>
              <button
                type="button"
                onClick={() => deletePost.mutate({ id: post.id })}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
