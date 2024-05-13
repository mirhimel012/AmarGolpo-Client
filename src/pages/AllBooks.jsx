import { useLoaderData } from 'react-router-dom'
import { useState } from 'react';
import BookCard from '../components/BookCard';

const AllBooks = () => {
    const loadedbook = useLoaderData();
  const [books, setbooks] = useState(loadedbook);
    return (
        <div className='m-20'>
      <h1 className='text-5xl font-bold text-center my-16 text-purple-600'>Total books: {books.length}</h1>
      <div className='grid md:grid-cols-3 gap-4'>
        {
          books.map(book => <BookCard
            key={book._id}
            book={book}
            books={books}
            setbooks={setbooks}
          ></BookCard>)
        }
      </div>
    </div>
    );
};

export default AllBooks;