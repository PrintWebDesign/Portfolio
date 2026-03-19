import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const BlogPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blog`);
        setPosts(response.data);
        
        if (slug) {
          const post = response.data.find(p => p.slug === slug);
          setSelectedPost(post);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  // Single post view
  if (slug && selectedPost) {
    return (
      <div data-testid="blog-post-page" className="min-h-screen bg-[#FAFAF9]">
        <Navbar />
        
        <article className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/blog" 
                data-testid="back-to-blog-link"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Blog</span>
              </Link>
              
              <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Tag size={14} />
                  {selectedPost.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(selectedPost.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
                {selectedPost.title}
              </h1>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <User size={20} className="text-slate-500" />
                </div>
                <span className="text-slate-600">{selectedPost.author}</span>
              </div>
              
              {selectedPost.image && (
                <div className="rounded-2xl overflow-hidden mb-10">
                  <img 
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              )}
              
              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  {selectedPost.excerpt}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {selectedPost.content}
                </p>
              </div>
            </motion.div>
          </div>
        </article>
        
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  // Blog listing view
  return (
    <div data-testid="blog-listing-page" className="min-h-screen bg-[#FAFAF9]">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium tracking-wide text-slate-500 uppercase mb-4 block">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
              Health Insights & News
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Stay informed with the latest health tips, clinic news, and expert advice from our medical team.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="blog-card bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
              >
                <Link to={`/blog/${post.slug}`} data-testid={`blog-card-${post.id}`}>
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'}
                      alt={post.title}
                      className="blog-image w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-sm text-slate-500">
                      <span className="px-3 py-1 bg-slate-100 rounded-full">{post.category}</span>
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default BlogPage;
