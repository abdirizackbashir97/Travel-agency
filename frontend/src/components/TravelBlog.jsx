import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const TravelBlog = () => {
  const posts = [
    {
      title: 'Top 10 Best Beaches in the World',
      excerpt: 'Discover the most stunning beaches for your next tropical getaway...',
      date: 'May 15, 2024',
      author: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
    },
    {
      title: 'How to Travel on a Budget',
      excerpt: 'Smart tips and tricks to explore the world without breaking the bank...',
      date: 'May 12, 2024',
      author: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
    },
    {
      title: 'Hidden Gems of Europe',
      excerpt: 'Off-the-beaten-path destinations you need to visit in Europe...',
      date: 'May 10, 2024',
      author: 'Emma Wilson',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=250&fit=crop',
    },
  ];

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Travel Blog</h2>
            <p className="text-gray-500 dark:text-gray-400">Latest travel stories and tips</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm font-medium">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700 hover:shadow-lg transition-shadow group">
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{post.excerpt}</p>
                <button className="mt-3 text-sm text-blue-600 font-medium hover:underline">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelBlog;
