import { useState, useEffect } from "react";
import SectionHeader from "@/components/SectionHeader.jsx";
import apiClient from "@/api/client";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiClient.get("/blog");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load blog posts", err);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Journal"
        title="Beauty insights and trends"
        subtitle="Stories, techniques, and Glam Beauty rituals."
      />
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} className="glass-panel p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                {formatDate(post.publishedAt || post.createdAt)}
              </p>
              <h3 className="mt-4 font-display text-2xl text-ink">{post.title}</h3>
              <p className="mt-3 text-sm text-ink/70">{post.excerpt}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-ink/50 py-10">No articles published yet.</p>
      )}
    </main>
  );
};

export default Blog;
