import React, { useEffect } from "react";
import AOS from "aos";
import { Reveal } from "react-awesome-reveal";

const Quote = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div>
      <section className="bg-gray-100 rounded-2xl py-12 px-4">
        <div className="container mx-auto">
          <Reveal className="about-section" direction="fade-up">
            <h2
              data-aos="fade-up"
              className="text-2xl font-bold text-purple-600 text-center mb-6 md:text-5xl"
            >
              QUOTES
            </h2>
          </Reveal>

          <Reveal className="about-section" direction="fade-left">
            <p
              data-aos="fade-left"
              className="text-lg text-gray-700 text-center mb-8 leading-relaxed mx-auto max-w-2xl"
            >
                Echoes of Wisdom: Timeless Words That Resonate Through History
            </p>
          </Reveal>

            <Reveal className="about-section" direction="fade-left">
              <h3 className="text-xl text-blue-500 font-semibold mb-2">- Mahatma Gandhi</h3>
              <p className="text-lg text-gray-700 leading-relaxed mx-auto max-w-2xl">
                "Be the change that you wish to see in the world."
              </p>
            </Reveal>

            <Reveal className="about-section" direction="zoom-in" delay={400}>
              <h3 className="text-xl text-blue-500 font-semibold mb-2">- Edmund Burke</h3>
              <p className="text-lg text-gray-700 leading-relaxed mx-auto max-w-2xl">
                "The only thing necessary for the triumph of evil is for good men to do nothing."
              </p>
            </Reveal>

            <Reveal className="about-section" direction="fade-left">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">
              - Martin Luther King Jr
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mx-auto max-w-2xl">
                "I have a dream..."
              </p>
            </Reveal>
            <Reveal className="about-section" direction="fade-left">
              <h3 className="text-xl text-blue-500 font-semibold mb-2">- William Shakespeare</h3>
              <p className="text-lg text-gray-700 leading-relaxed mx-auto max-w-2xl">
              "To be, or not to be, that is the question."               
              </p>
            </Reveal>

            <Reveal className="about-section" direction="zoom-in" delay={400}>
              <h3 className="text-xl text-blue-500 font-semibold mb-2">- Martin Luther King Jr</h3>
              <p className="text-lg text-gray-700 leading-relaxed mx-auto max-w-2xl">
              "In the end, we will remember not the words of our enemies, but the silence of our friends." 
              </p>
            </Reveal>

            <Reveal className="about-section" direction="fade-left">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">
              - Steve Jobs
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mx-auto max-w-2xl">
              "The only way to do great work is to love what you do."              
             </p>
            </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Quote;
