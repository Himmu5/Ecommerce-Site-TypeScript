import React, { useState, useEffect } from 'react';
import { getAllQuotes, getRandomQuote } from '../Api';
import { Quote } from '../CommenType/Types';

const Testimonials: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const response = await getAllQuotes(10); // Load 10 quotes
      setQuotes(response.data.quotes);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load quotes:', error);
      setLoading(false);
    }
  };

  const getRandomQuoteIndex = () => {
    return Math.floor(Math.random() * quotes.length);
  };

  const nextQuote = () => {
    setCurrentQuoteIndex(getRandomQuoteIndex());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (quotes.length === 0) {
    return null;
  }

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 text-lg">Real testimonials from satisfied customers</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="mb-6">
              <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            <blockquote className="text-xl text-gray-700 mb-6 italic">
              "{currentQuote.quote}"
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                {currentQuote.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{currentQuote.author}</p>
                <p className="text-gray-500 text-sm">Verified Customer</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={nextQuote}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Next Testimonial
            </button>
          </div>
        </div>

        {/* Quote indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {quotes.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuoteIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentQuoteIndex ? 'bg-red-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
