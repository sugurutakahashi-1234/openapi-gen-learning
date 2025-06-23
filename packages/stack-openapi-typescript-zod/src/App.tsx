import { useState } from "react";
import type { components } from "./generated/schema";
import {
  useCreatePost,
  useDeletePost,
  usePosts,
  useUpdatePost,
} from "./hooks/usePosts";

function App() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const { data: posts, isLoading, error } = usePosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

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
        params: { path: { id: selectedPostId } },
        body: formData,
      });
    } else {
      createPost.mutate({ body: formData });
    }
    setFormData({
      title: "",
      content: "",
      userId: "clh1234567890abcdef",
      published: false,
    });
    setSelectedPostId(null);
  };

  const handleEdit = (post: components["schemas"]["Post"]) => {
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

  return (
    <div className="container">
      <h1 style={{ backgroundColor: "#9b59b6", color: "white", padding: "1rem", borderRadius: "8px" }}>
        ⚡ Stack OpenAPI TypeScript + Zod
      </h1>

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
                onClick={() =>
                  deletePost.mutate({ params: { path: { id: post.id } } })
                }
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
