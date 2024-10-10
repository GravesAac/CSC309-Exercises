export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, isbn, publishedDate, available = true, authorId } = req.body;

    if (!title || !isbn || !publishedDate || !authorId) {
      return res.status(400).json({ message: 'Title, ISBN, published date, and author ID are required.' });
    }

    try {
      const authorExists = await prisma.author.findUnique({ where: { id: authorId } });
      if (!authorExists) {
        return res.status(400).json({ message: 'Invalid authorId provided' });
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
        return res.status(400).json({ message: 'A book with this ISBN already exists.' });
      }
      res.status(500).json({ message: 'Error creating book', error });
    }
  }
}
