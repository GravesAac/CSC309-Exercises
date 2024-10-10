import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    // Updating a book
    const { title, isbn, publishedDate, available } = req.body;

    try {
      const updatedBook = await prisma.book.update({
        where: { id: parseInt(id) },
        data: {
          ...(title && { title }),
          ...(isbn && { isbn }),
          ...(publishedDate && { publishedDate: new Date(publishedDate) }),
          ...(available !== undefined && { available }),
        },
      });
      res.status(200).json(updatedBook);
    } catch (error) {
      if (error.code === 'P2025') {
        res.status(404).json({ message: 'Book not found' });
      } else if (error.code === 'P2002') {
        res.status(400).json({ message: 'Duplicate ISBN detected' });
      } else {
        res.status(500).json({ message: 'Error updating book', error });
      }
    }
  } else if (req.method === 'DELETE') {
    // Deleting a book
    try {
      await prisma.book.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      if (error.code === 'P2025') {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.status(500).json({ message: 'Error deleting book', error });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
