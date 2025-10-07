import React, { useEffect, useRef, useState } from 'react';
import styles from './SlideGallery.module.css';

type SlideGalleryProps = {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
};

const SlideGallery: React.FC<SlideGalleryProps> = ({
  images,
  autoPlay = false,
  interval = 3000,
  showArrows = true,
  showDots = true,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Автопрокрутка
  useEffect(() => {
    if (!autoPlay) return;
    timeoutRef.current = window.setTimeout(nextSlide, interval);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, autoPlay, interval]);

  // Переключение стрелками
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Свайп
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prevSlide();
    if (diff < -50) nextSlide();
    touchStartX.current = null;
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.gallery} ${className || ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>

        {/* Слайды */}
        <div
          className={styles.slider}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className={styles.slide}>
              <img src={src} alt={`slide-${i + 1}`} draggable={false} />
            </div>
          ))}

        </div>


        {/* Индикаторы */}
        {showDots && (
          <div className={styles.dots}>
            {images.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentIndex ? styles.active : ''}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Навигация */}
      {showArrows && (
        <>
          <button className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
            ‹
          </button>
          <button className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
            ›
          </button>
        </>
      )}
    </div>
  );
};

export default SlideGallery;
