import React, { useState, useEffect } from "react";
import newsData from "../../json/news.json"; // Importa el JSON local

interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageURL: string;
  date: string;
}

const NewsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
   
    setNewsItems(newsData);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= newsItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsItems.length - 2 : prevIndex - 1
    );
  };

  if (newsItems.length === 0) {
    return <div>No hay noticias disponibles.</div>;
  }

  return (
    <div className="relative w-full rounded-lg">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="min-w-1/2 flex-shrink-0 w-1/2 px-2 box-border" 
            >
              <div className="bg-white rounded-lg shadow-lg">
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-xl"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-700 text-white rounded-xl"
      >
        &#10095;
      </button>
    </div>
  );
};

export default NewsCarousel;
