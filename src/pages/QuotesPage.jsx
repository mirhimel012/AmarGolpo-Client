// src/pages/QuotesPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const categories = [
  "Motivational",
  "Inspirational",
  "Life",
  "Humor",
  "Philosophy",
];

const API_BASE = "https://amargolpo.vercel.app";

const QuotesPage = ({ userId }) => {
  const [quotes, setQuotes] = useState([]); // MUST be array
  const [newQuote, setNewQuote] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const author = userId || "Anonymous";

  // 🔹 Normalize any backend response into an array
  const normalizeQuotes = (data) => {
    if (Array.isArray(data)) return data;
    return [];
  };

  // 🔹 Fetch quotes
  const fetchQuotes = async (category = "") => {
    try {
      setLoading(true);
      const url = category
        ? `${API_BASE}/quotes?category=${category}`
        : `${API_BASE}/quotes`;

      const res = await axios.get(url);
      setQuotes(normalizeQuotes(res.data));
    } catch (err) {
      console.error("❌ Fetch quotes failed:", err);
      setQuotes([]); // NEVER allow non-array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // 🔹 Post quote
  const handlePostQuote = async (e) => {
    e.preventDefault();
    if (!newQuote.trim()) return;

    try {
      const res = await axios.post(`${API_BASE}/quotes`, {
        text: newQuote.trim(),
        author,
        category: newCategory,
      });

      if (res.data?.insertedId) {
        setNewQuote("");
        setNewCategory(categories[0]);
        fetchQuotes(selectedCategory); // reload safely
      }
    } catch (err) {
      console.error("❌ Post quote failed:", err);
    }
  };

  // 🔹 Like / Unlike
  const handleLike = async (quoteId) => {
    try {
      const res = await axios.put(
        `${API_BASE}/quotes/${quoteId}/like`,
        { userId: author }
      );

      if (typeof res.data?.likesCount === "number") {
        setQuotes((prev) =>
          prev.map((q) =>
            q._id === quoteId
              ? {
                  ...q,
                  likes: Array(res.data.likesCount).fill(author),
                }
              : q
          )
        );
      }
    } catch (err) {
      console.error("❌ Like failed:", err);
    }
  };

  // 🔹 Category filter
  const handleCategoryFilter = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    fetchQuotes(cat);
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        ✨ Share & Discover Quotes ✨
      </h1>

      {/* Post Quote */}
      <div className="max-w-2xl mx-auto mb-10 bg-white/70 p-6 rounded-2xl shadow-lg">
        <form onSubmit={handlePostQuote} className="space-y-4">
          <textarea
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            placeholder="Write your quote..."
            className="w-full p-4 rounded-lg border focus:ring-2 focus:ring-purple-500"
            required
          />

          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-3 rounded-lg border"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Post Quote
          </button>
        </form>
      </div>

      {/* Filter */}
      <div className="max-w-2xl mx-auto mb-6 flex justify-end">
        <select
          value={selectedCategory}
          onChange={handleCategoryFilter}
          className="p-3 rounded-lg border"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Quotes */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : quotes.length === 0 ? (
        <p className="text-center text-gray-500">No quotes found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote) => (
            <motion.div
              key={quote._id}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-white shadow-lg flex flex-col justify-between"
            >
              <div>
                <p className="italic text-lg mb-4">“{quote.text}”</p>
                <p className="text-right text-blue-600 font-semibold">
                  — {quote.author}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Category: {quote.category}
                </p>
              </div>

              <button
                onClick={() => handleLike(quote._id)}
                className="mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                ❤️ {Array.isArray(quote.likes) ? quote.likes.length : 0} Like
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuotesPage;
