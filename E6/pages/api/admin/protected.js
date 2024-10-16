import { withAuth } from '@/utils/middleware';

async function adminProtectedHandler(req, res) {
  res.status(200).json({ message: 'Access granted to admin-protected route', user: req.user });
}

export default withAuth(adminProtectedHandler);
