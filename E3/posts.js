// pages/api/posts.js

const posts = [
    { id: 1, title: "Learning JavaScript", content: "JavaScript is a versatile language...", author: "John Doe", createdAt: "2024-08-15T08:00:00Z", tags: ["javascript", "programming"] },
    { id: 2, title: "Understanding React", content: "React is a powerful library for building UIs...", author: "Jane Smith", createdAt: "2024-08-16T09:00:00Z", tags: ["react", "javascript"] },
  ];
  
  export default function handler(req, res) {
    const { tags, page = 1, limit = 5 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    let filteredPosts = posts;
  
    if (tags) {
      const tagList = tags.split(',');
      filteredPosts = filteredPosts.filter(post =>
        tagList.every(tag => post.tags.includes(tag))
      );
    }

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    res.status(200).json(paginatedPosts);
  }
  