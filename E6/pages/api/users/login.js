import prisma from '@/utils/db';
import { comparePassword, generateAccessToken, generateRefreshToken } from '@/utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Check if user exists and the password is valid
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Create payload for the JWT
    const payload = {
      username: user.username,
      role: user.role,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), 
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the login request.' });
  }
}
