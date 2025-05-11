import { createContext, useState, useContext, useMemo } from 'react';

const ForumContext = createContext();

export function ForumProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalPosts: 0,
    activeUsers: 0,
    popularTopics: []
  });

  const addPost = (newPost) => {
    setPosts(prev => [...prev, newPost]);
    setAnalytics(prev => ({
      ...prev,
      totalPosts: prev.totalPosts + 1,
      popularTopics: [...new Set([...prev.popularTopics, newPost.category])]
    }));
  };

  const addComment = (postId, newComment) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  const value = useMemo(() => ({
    posts,
    analytics,
    addPost,
    addComment
  }), [posts, analytics]);

  return (
    <ForumContext.Provider value={value}>
      {children}
    </ForumContext.Provider>
  );
}

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
};