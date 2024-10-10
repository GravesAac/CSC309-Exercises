import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, bio } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'First and last names are required.' });
    }

    try {
      const newAuthor = await prisma.author.create({
        data: { firstName, lastName, bio },
      });
      res.status(201).json(newAuthor);
    } catch (error) {
      res.status(500).json({ message: 'Error creating author', error });
    }
  } else if (req.method === 'GET') {
    const { id, firstName, lastName } = req.query;

    try {
      const authors = await prisma.author.findMany({
        where: {
          ...(id && { id: parseInt(id) }),
          ...(firstName && { firstName: { contains: firstName, mode: 'insensitive' } }),
          ...(lastName && { lastName: { contains: lastName, mode: 'insensitive' } }),
        },
      });
      res.status(200).json(authors);
    } catch (error) {
      res.status(400).json({ message: 'Invalid query parameters', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
