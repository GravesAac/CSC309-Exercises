import { withAuth } from '@/utils/middleware';

async function protectedHandler(req, res) {
  // This will only run if the token is valid
  res.status(200).json({ message: 'Access granted to protected route', user: req.user });
}

export default withAuth(protectedHandler);
