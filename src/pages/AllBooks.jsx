import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const AllBooks = () => {
  const loadedbook = useLoaderData();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Sort by number of likes descending
    const sortedBooks = [...loadedbook].sort((a, b) => {
      const likesA = Array.isArray(a.likes) ? a.likes.length : 0;
      const likesB = Array.isArray(b.likes) ? b.likes.length : 0;
      return likesB - likesA; // highest likes first
    });
    setBooks(sortedBooks);
  }, [loadedbook]);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-extrabold text-center text-purple-600 mb-12">
        All Stories ({books.length})
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            books={books}
            setbooks={setBooks}
          />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
