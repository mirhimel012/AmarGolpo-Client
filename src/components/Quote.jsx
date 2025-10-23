import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const quotes = [
  {
    author: "ডঃ এপিজি আব্দুল কালাম",
    text: "পাখি পোষলাম উড়ে গেল, কাঠবিড়ালি পোষলাম পালিয়ে গেলো, এরপর আমি একটা গাছ লাগালাম, পাখি ও কাঠবিড়ালি দুটোই ফিরে এলো",
  },
  {
    author: "হিমেল মীর",
    text: "আপনার কুকুর যদি মানুষকে বাদ দিয়ে আপনাকেই ঘেউ ঘেউ করা শুরু করে তাহলে বুঝবেন আপনার কুকুরকে অন্য কেউ খাবার খাওয়াচ্ছে",
  },
  {
    author: "হুমায়ূন আহমেদ",
    text: "পায়ের কাঁটার দিকে বার বার নজর দিলে হাঁটার আনন্দ উপভোগ করা যায় না",
  },
  {
    author: "ইসলামী নীতিবাক্য",
    text: "আপনি নামাজ পরুন আপনার নামাজ পড়ার পূর্বে",
  },
  {
    author: "বুদ্ধদেব বসু",
    text: "মানুষ যত বড় স্বপ্ন দেখে, তত বড় হয় তার জীবন",
  },
   {
    author: "প্রেরণামূলক",
    text: "জুতা চেটে তৈরি করা পরিচয়ের থেকে জুতা ক্ষয় করে তৈরি করা পরিচয় অনেক সম্মানজনক এবং মর্যাদাপূর্ণ",
  },
  {
    author: "কাজী নজরুল ইসলাম",
    text: "অন্যায়ের বিরুদ্ধে প্রতিবাদই মানবতার প্রথম শর্ত",
  },
 {
    author: "ড. মুহাম্মদ শহীদুল্লাহ",
    text: "যুগের বাস্তবতায় জাতির ধনের ভান্ডার জ্ঞানের উপর নির্ভর করে",
  },
 {
    author: "চাণক্য নীতির ভাবধারার অংশ",
    text: "ক্ষতিকর সত্যের চেয়ে উপকারী মিথ্যা অনেক ভালো",
  },
  
];

const Quote = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 container mx-auto text-center">
        {/* Title Section */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4"
        >
          ✨ Timeless Quotes ✨
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg max-w-2xl mx-auto mb-12"
        >
          Echoes of wisdom that inspire generations — discover the beauty of
          thought and the power of words.
        </motion.p>

        {/* Quotes Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-white/40 hover:shadow-2xl transition-all"
            >
              <p className="text-gray-800 italic mb-4 text-lg leading-relaxed">
                “{q.text}”
              </p>
              <h3 className="text-blue-600 font-semibold text-right">
                — {q.author}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quote;
