import prisma from '@/utils/db';
import { hashPassword } from '@/utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  if (role && role !== 'ADMIN' && role !== 'USER') {
    return res.status(400).json({ error: "Invalid role value. Must be either 'ADMIN' or 'USER'." });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: role || 'USER',
      },
    });

    res.status(201).json({ user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
}
