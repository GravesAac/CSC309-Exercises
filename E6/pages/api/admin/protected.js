import { withAuth } from '@/utils/middleware';

async function adminProtectedHandler(req, res) {
  // This will only run if the user has the ADMIN role
  res.status(200).json({ message: 'Access granted to admin-protected route', user: req.user });
}

export default withAuth(adminProtectedHandler);
