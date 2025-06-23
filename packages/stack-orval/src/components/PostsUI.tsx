// 共通UIコンポーネント
import { useState } from "react";
import type { Post } from "../generated/model";
import {
  useCreatePost,
  useDeletePost,
  usePosts,
  useUpdatePost,
} from "../hooks/usePosts";

interface PostsUIProps {
  isMockMode?: boolean;
  onToggleMode?: () => void;
}

export function PostsUI({ isMockMode = false, onToggleMode }: PostsUIProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // APIフックは条件分岐の外で宣言
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

  return (
    <div className="container">
      <h1
        style={{
          backgroundColor: isMockMode ? "#e74c3c" : "#9b59b6",
          color: "white",
          padding: "1rem",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "background-color 0.3s ease",
        }}
      >
        <span>⚔️ Stack Orval (orval)</span>
        {onToggleMode && (
          <button
            type="button"
            onClick={onToggleMode}
            style={{
              backgroundColor: isMockMode ? "#c0392b" : "#8e44ad",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
          >
            {isMockMode ? "🔧 MSWモード" : "🌐 実APIモード"}
          </button>
        )}
      </h1>

      {isMockMode && (
        <div
          style={{
            backgroundColor: "#fff3cd",
            color: "#856404",
            padding: "0.75rem 1rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #ffeaa7",
            fontSize: "14px",
          }}
        >
          <strong>🔧 MSWモックで動作中:</strong>{" "}
          Faker.jsで生成されたデータが表示されています
        </div>
      )}

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
        {posts && Array.isArray(posts)
          ? posts.map((post: Post) => (
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
            ))
          : null}
      </div>
    </div>
  );
}
