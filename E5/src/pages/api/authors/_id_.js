import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    // Updating an author
    const { firstName, lastName, bio } = req.body;

    try {
      const updatedAuthor = await prisma.author.update({
        where: { id: parseInt(id) },
        data: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(bio !== undefined && { bio }),
        },
      });

      res.status(200).json(updatedAuthor);
    } catch (error) {
      if (error.code === 'P2025') {
        res.status(404).json({ message: 'Author not found' });
      } else {
        res.status(500).json({ message: 'Error updating author', error });
      }
    }
  } else if (req.method === 'DELETE') {
    // Deleting an author
    try {
      await prisma.author.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json({ message: 'Author and associated books deleted successfully' });
    } catch (error) {
      if (error.code === 'P2025') {
        res.status(404).json({ message: 'Author not found' });
      } else {
        res.status(500).json({ message: 'Error deleting author', error });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
