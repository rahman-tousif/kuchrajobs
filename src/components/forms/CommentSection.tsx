import React, { useState } from 'react';
import { Star, ThumbsUp, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Comment } from '../../types';

interface CommentSectionProps {
  postId: string;
  postType: 'job' | 'service';
  comments: Comment[];
  onSubmitComment: (comment: Omit<Comment, 'id' | 'postedDate'>) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  postType,
  comments,
  onSubmitComment
}) => {
  const [newComment, setNewComment] = useState({
    authorName: '',
    authorPhone: '',
    authorEmail: '',
    content: '',
    rating: 5
  });

  const postComments = comments.filter(comment => comment.postId === postId && comment.postType === postType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.authorName && newComment.authorPhone && newComment.content) {
      onSubmitComment({
        postId,
        postType,
        authorName: newComment.authorName,
        authorPhone: newComment.authorPhone,
        authorEmail: newComment.authorEmail || undefined,
        content: newComment.content,
        rating: newComment.rating
      });
      setNewComment({ authorName: '', authorPhone: '', authorEmail: '', content: '', rating: 5 });
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-blue-600" />
        মন্তব্য ({postComments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">আপনার নাম *</label>
            <input
              type="text"
              required
              value={newComment.authorName}
              onChange={(e) => setNewComment({...newComment, authorName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="আপনার পূর্ণ নাম"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ফোন নম্বর *</label>
            <input
              type="tel"
              required
              value={newComment.authorPhone}
              onChange={(e) => setNewComment({...newComment, authorPhone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="০১৭১২৩৪৫৬৭৮"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল (ঐচ্ছিক)</label>
          <input
            type="email"
            value={newComment.authorEmail}
            onChange={(e) => setNewComment({...newComment, authorEmail: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="আপনার ইমেইল ঠিকানা"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">মন্তব্য *</label>
          <textarea
            required
            rows={3}
            value={newComment.content}
            onChange={(e) => setNewComment({...newComment, content: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="আপনার মন্তব্য লিখুন..."
          />
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">রেটিং</label>
            <select
              value={newComment.rating}
              onChange={(e) => setNewComment({...newComment, rating: parseInt(e.target.value)})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value={5}>৫ ⭐ (চমৎকার)</option>
              <option value={4}>৪ ⭐ (ভালো)</option>
              <option value={3}>৩ ⭐ (মাঝারি)</option>
              <option value={2}>২ ⭐ (খারাপ)</option>
              <option value={1}>১ ⭐ (খুব খারাপ)</option>
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          মন্তব্য করুন
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {postComments.map(comment => (
          <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{comment.authorName}</div>
                  <div className="text-sm text-gray-500">{comment.postedDate.toLocaleDateString('bn-BD')}</div>
                </div>
              </div>
              {comment.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < comment.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            <p className="text-gray-700 mb-2">{comment.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {comment.authorPhone}
              </span>
              {comment.authorEmail && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {comment.authorEmail}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {postComments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>এখনো কোন মন্তব্য নেই। প্রথম মন্তব্য করুন!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;

