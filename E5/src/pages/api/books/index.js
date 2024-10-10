import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, isbn, publishedDate, available = true, authorId } = req.body;

    if (!title || !isbn || !publishedDate || !authorId) {
      return res.status(400).json({ message: 'Title, ISBN, published date, and author ID are required.' });
    }

    try {
      const authorExists = await prisma.author.findUnique({ where: { id: authorId } });

      if (!authorExists) {
        return res.status(404).json({ message: 'Author not found' });
      }

      const newBook = await prisma.book.create({
        data: {
          title,
          isbn,
          publishedDate: new Date(publishedDate),
          available,
          authorId,
        },
      });
      res.status(201).json(newBook);
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(409).json({ message: 'A book with this ISBN already exists.' });
      }
      res.status(500).json({ message: 'Error creating book', error });
    }
  } else if (req.method === 'GET') {
    const { id, authorId, title, available } = req.query;

    try {
      const books = await prisma.book.findMany({
        where: {
          ...(id && { id: parseInt(id) }),
          ...(authorId && { authorId: parseInt(authorId) }),
          ...(title && { title: { contains: title, mode: 'insensitive' } }),
          ...(available !== undefined && { available: available === 'true' }),
        },
        include: { author: true },
      });
      res.status(200).json(books);
    } catch (error) {
      res.status(400).json({ message: 'Invalid query parameters', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
