import React from 'react';

const ScrollUpButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 focus:outline-none"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollUpButton;
