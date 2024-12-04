import React, { useState } from 'react';
import { SliderData } from '../Components/SliderData';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import './ComponentCss/ImageSlider.css'

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className='imageSliderDivision'>
      <section className='slider'>
        <FaChevronLeft className='left-arrow' onClick={prevSlide} />
        <FaChevronRight className='right-arrow' onClick={nextSlide} />
        {slides.map((slide, index) => {
          return (
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (
                <>
                  <img src={slide.image} alt='slide' className='image' />
                  <div className='caption'>{slide.caption}</div> {/* Optional caption */}
                </>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ImageSlider;