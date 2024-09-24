// pages/api/posts/[id].js

// Simulated database: Array of post objects
const posts = [
    { id: 1, title: "Learning JavaScript", content: "JavaScript is a versatile language...", author: "John Doe", createdAt: "2024-08-15T08:00:00Z", tags: ["javascript", "programming"] },
    { id: 2, title: "Understanding React", content: "React is a powerful library for building UIs...", author: "Jane Smith", createdAt: "2024-08-16T09:00:00Z", tags: ["react", "javascript"] },
  ];
  
  export default function handler(req, res) {
    // Get the id from the URL
    const { id } = req.query;
  
    const postId = parseInt(id);
  
    const post = posts.find(p => p.id === postId);
  
    // If post is not found, return a 404 error
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
  
    // Return the post data if found
    res.status(200).json(post);
  }
  