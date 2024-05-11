import { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextSlide = currentSlide === 4 ? 1 : currentSlide + 1;
      setCurrentSlide(nextSlide);
    }, 5000); // Change slide every 5 seconds

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    const prevSlide = currentSlide === 1 ? 4 : currentSlide - 1;
    setCurrentSlide(prevSlide);
  };

  const handleNextSlide = () => {
    const nextSlide = currentSlide === 4 ? 1 : currentSlide + 1;
    setCurrentSlide(nextSlide);
  };

  return (
    <div>
      <div className="carousel w-full h-svh">
        <div id={`slide1`} className={`carousel-item relative w-full h-fit ${currentSlide === 1 ? 'block' : 'hidden'}`}>
            <img src="https://i.ibb.co/DRwHvfs/pexels-technobulka-2908984.jpg" className="w-full h-fit" />        
        </div>
        <div id={`slide2`} className={`carousel-item relative w-full h-fit ${currentSlide === 2 ? 'block' : 'hidden'}`}>
            <img src="https://i.ibb.co/xJMTfGq/pexels-pixabay-256455.jpg" className="w-full h-fit"/>
        </div>
        <div id={`slide3`} className={`carousel-item relative w-full h-fit ${currentSlide === 3 ? 'block' : 'hidden'}`}>
            <img src="https://i.ibb.co/DWDY1v8/reading-8575569-1280.jpg" className="w-full h-fit" />
        </div>
        <div id={`slide4`} className={`carousel-item relative w-full h-fit ${currentSlide === 4 ? 'block' : 'hidden'}`}>
            <img src="https://i.ibb.co/1m8xxhN/pexels-pixabay-159775.jpg" className="w-full h-fit" />
        </div>
      </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button onClick={handlePrevSlide} className="btn btn-circle">❮</button>
        <button onClick={handleNextSlide} className="btn btn-circle">❯</button>
      </div>
    </div>
  );
};

export default Slider;
