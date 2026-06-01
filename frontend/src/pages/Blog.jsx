import SectionHeader from "@/components/SectionHeader.jsx";
import { blogPosts } from "@/data/mockData";

const Blog = () => {
  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Journal"
        title="Beauty insights and trends"
        subtitle="Stories, techniques, and Glam Beauty rituals."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.id} className="glass-panel p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              {post.date}
            </p>
            <h3 className="mt-4 font-display text-2xl text-ink">{post.title}</h3>
            <p className="mt-3 text-sm text-ink/70">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Blog;
