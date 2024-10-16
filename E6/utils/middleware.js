import { verifyToken } from './auth';

/**
 * Middleware to protect API routes with token verification and role-based access.
 * @param {function} handler - The API route handler to wrap.
 * @returns {function} - A new handler function with token verification and role-based access.
 */
export function withAuth(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and extract the token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part after 'Bearer'

    // Verify the token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized access, invalid token' });
    }

    // Add the token payload to the request object for use in the handler
    req.user = decoded;

    // Role-based access control for /api/admin routes
    if (req.url.startsWith('/api/admin') && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Admins only' });
    }

    // Proceed to the original handler
    return handler(req, res);
  };
}
