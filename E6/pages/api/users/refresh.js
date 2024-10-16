import { verifyRefreshToken, generateAccessToken } from '@/utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { refreshToken } = req.body;

  // Validate that a refresh token is provided
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required.' });
  }

  // Verify the refresh token
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired refresh token.' });
  }

  // Generate a new access token with the same payload
  const payload = {
    username: decoded.username,
    role: decoded.role,
  };
  const newAccessToken = generateAccessToken(payload);

  // Return the new access token in the response
  res.status(200).json({ accessToken: newAccessToken });
}
