import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import BookCard from '../components/BookCard';

const AllBooks = () => {
  const loadedbook = useLoaderData();
  const [books, setBooks] = useState(loadedbook);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-extrabold text-center text-purple-600 mb-12">
        All Stories ({books.length})
      </h1>

      {/* Optional: Add search/filter later */}

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
