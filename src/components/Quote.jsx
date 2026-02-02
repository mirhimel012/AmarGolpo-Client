import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const API_BASE = "https://amar-golpo-server.vercel.app";

const Quote = () => {
  const [topLiked, setTopLiked] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/quotes`);
      const quotes = Array.isArray(res.data) ? res.data : [];

      const now = new Date();

      // 🏆 Top 3 Most Liked (All Time)
      const mostLiked = [...quotes]
        .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
        .slice(0, 3);

      // 🔥 Top 3 Trending (Last 7 Days)
      const trendingQuotes = quotes
        .filter((q) => {
          const days =
            (now - new Date(q.createdAt)) / (1000 * 60 * 60 * 24);
          return days <= 7;
        })
        .sort((a, b) => {
          const daysA = Math.max(
            (now - new Date(a.createdAt)) / (1000 * 60 * 60 * 24),
            1
          );
          const daysB = Math.max(
            (now - new Date(b.createdAt)) / (1000 * 60 * 60 * 24),
            1
          );
          return (
            (b.likes?.length || 0) / daysB -
            (a.likes?.length || 0) / daysA
          );
        })
        .slice(0, 3);

      setTopLiked(mostLiked);
      setTrending(trendingQuotes);
    } catch (err) {
      console.error("❌ Failed to load home quotes", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* Background effects */}
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
          ✨ Quotes People Love ✨
        </motion.h2>

        {/* 🏆 Top Liked */}
        {topLiked.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-purple-600 mb-6">
              🏆 Community Favorites
            </h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
              {topLiked.map((q) => (
                <QuoteCard key={q._id} quote={q} badge="❤️ Most Liked" />
              ))}
            </div>
          </>
        )}

        {/* 🔥 Trending */}
        {trending.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-blue-600 mb-6">
              🔥 Trending This Week
            </h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {trending.map((q) => (
                <QuoteCard key={q._id} quote={q} badge="🔥 Trending" />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const QuoteCard = ({ quote, badge }) => {
  return (
    <motion.div
      data-aos="fade-up"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-white/40 hover:shadow-2xl transition-all text-left flex flex-col justify-between"
    >
      <span className="text-xs mb-2 inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 w-fit">
        {badge}
      </span>

      <p className="text-gray-800 italic mb-4 text-lg leading-relaxed line-clamp-4">
        “{quote.text}”
      </p>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>— {quote.author || "Anonymous"}</span>
        <span>❤️ {quote.likes?.length || 0}</span>
      </div>
    </motion.div>
  );
};

export default Quote;
