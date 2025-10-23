import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 container mx-auto text-center max-w-5xl">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-6"
        >
          ✨ About AmarGolpo ✨
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-gray-700 text-lg md:text-xl mb-12 leading-relaxed"
        >
          AmarGolpo (আমারগল্প) is a platform to explore, share, and cherish stories.
          Dive into a world of imagination, creativity, and timeless tales that resonate
          with every reader. From classic literature to modern narratives, AmarGolpo
          brings stories to life in a magical, interactive way.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Curated Stories",
              description:
                "Handpicked tales from across genres to enrich your reading journey.",
              icon: "📚",
            },
            {
              title: "Personal Library",
              description:
                "Save and organize your favorite stories in your personal library.",
              icon: "🏠",
            },
            {
              title: "Community Sharing",
              description:
                "Connect with fellow readers and share your own stories effortlessly.",
              icon: "🤝",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/40 hover:shadow-2xl transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{feature.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
