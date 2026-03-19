import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blog`);
        setPosts(response.data.slice(0, 3)); // Show only 3 posts on home
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback data
        setPosts([
          {
            id: '1',
            title: 'Understanding the Importance of Annual Health Checkups',
            slug: 'importance-annual-health-checkups',
            excerpt: 'Regular health checkups are essential for maintaining your well-being and catching potential issues early.',
            category: 'Health Tips',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
            author: 'Dr. Saima Qureshi',
            published_at: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Travel Health: What You Need to Know Before Your Trip',
            slug: 'travel-health-tips',
            excerpt: "Planning an international trip? Here's everything you need to know about travel vaccinations.",
            category: 'Travel Health',
            image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
            author: 'Dr. Saima Qureshi',
            published_at: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Skin Care Tips for the Canadian Winter',
            slug: 'winter-skin-care-tips',
            excerpt: 'Keep your skin healthy and glowing during the harsh Canadian winter with these expert tips.',
            category: 'Aesthetics',
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=800',
            author: 'Milton Health Centre',
            published_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section 
      id="blog" 
      data-testid="blog-section"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-sm font-medium tracking-wide text-slate-500 uppercase mb-4 block">
              Health Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-slate-600 max-w-xl">
              Expert advice and health tips from our medical team to help you stay informed.
            </p>
          </div>
          <Link 
            to="/blog"
            data-testid="view-all-posts-link"
            className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-blue-600 transition-colors mt-6 md:mt-0"
          >
            View All Posts
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="blog-card group"
              >
                <Link 
                  to={`/blog/${post.slug}`}
                  data-testid={`blog-preview-${post.id}`}
                  className="block bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="blog-image w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3 text-sm">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
