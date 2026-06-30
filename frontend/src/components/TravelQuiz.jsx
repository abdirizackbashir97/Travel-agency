import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, RefreshCw, Star } from 'lucide-react';

const TravelQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');

  const questions = [
    {
      question: 'What type of vacation do you prefer?',
      options: ['Beach & Relaxation', 'Adventure & Nature', 'City & Culture', 'Luxury & Comfort']
    },
    {
      question: 'What is your ideal travel budget?',
      options: ['Budget ($500-1000)', 'Moderate ($1000-2000)', 'Premium ($2000-4000)', 'Luxury ($4000+)']
    },
    {
      question: 'How many days do you want to travel?',
      options: ['3-5 days', '6-10 days', '11-15 days', '16+ days']
    },
    {
      question: 'What kind of accommodation do you prefer?',
      options: ['Hostel/Budget Hotel', 'Boutique Hotel', 'Resort', 'Luxury Villa']
    },
    {
      question: 'What activities do you enjoy most?',
      options: ['Water Sports', 'Hiking & Trekking', 'Museums & History', 'Fine Dining & Shopping']
    }
  ];

  const destinations = [
    { name: 'Bali, Indonesia', match: '92%', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop' },
    { name: 'Dubai, UAE', match: '88%', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop' },
    { name: 'Paris, France', match: '85%', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop' },
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      setShowResult(true);
      const randomDest = destinations[Math.floor(Math.random() * destinations.length)];
      setResult(randomDest);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult('');
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-green-600 fill-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Perfect Destination!</h3>
          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
            <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xl font-bold">{result.name}</p>
              <p className="text-sm text-white/80">{result.match} Match</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/destinations" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Explore Now
            </Link>
            <button
              onClick={resetQuiz}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retake
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Compass className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Find Your Perfect Destination</h3>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      <p className="text-lg font-semibold text-gray-900 mb-4">
        {questions[currentQuestion].question}
      </p>
      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-between group"
          >
            <span className="text-gray-700 group-hover:text-blue-600">{option}</span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TravelQuiz;
