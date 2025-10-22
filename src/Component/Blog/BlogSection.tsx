import React, { useState, useEffect } from 'react';
import { getAllPosts, getPostById } from '../Api';
import { Post } from '../CommenType/Types';
import { Link } from 'react-router-dom';

const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await getAllPosts(6); // Load 6 posts
      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load posts:', error);
      setLoading(false);
    }
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Latest News & Updates</h2>
          <p className="text-gray-600 text-lg">Stay informed with our latest blog posts and announcements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {post.tags[0] || 'General'}
                  </span>
                  <span className="ml-2 text-gray-500 text-sm">
                    {post.reactions} reactions
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {truncateText(post.body)}
                </p>
                
                <div className="flex items-center justify-between">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-red-500 hover:text-red-600 font-semibold transition-colors duration-200"
                  >
                    Read More →
                  </Link>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>User {post.userId}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-block"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
