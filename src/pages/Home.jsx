import { useLoaderData } from "react-router-dom";
import Slider from "../components/Slider";
import Quote from "../components/Quote";
import BookCard from "../components/BookCard";
import { motion } from "framer-motion";

const Home = () => {
  const loadedBooks = useLoaderData() || []; // default to empty array

  // Ensure we have an array
  const booksArray = Array.isArray(loadedBooks) ? loadedBooks : [loadedBooks];

  // Sort by likes and take top 3
  const topBooks = booksArray
    .sort((a, b) => {
      const likesA = Array.isArray(a.likes) ? a.likes.length : 0;
      const likesB = Array.isArray(b.likes) ? b.likes.length : 0;
      return likesB - likesA;
    })
    .slice(0, 3);

  return (
    <div>
      <Slider />

      {/* Top 3 Most Liked Stories Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
        {/* Decorative background orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 container mx-auto text-center">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-12"
          >
            ✨ Top 3 Most Liked Stories ✨
          </motion.h2>

          {/* Books Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {topBooks.map((book) => (
              <motion.div
                key={book._id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/30 hover:shadow-2xl transition-all"
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <Quote />
    </div>
  );
};

export default Home;
