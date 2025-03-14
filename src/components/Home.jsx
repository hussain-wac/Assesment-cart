import React from "react";
import SearchBox from "./SearchBox";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">Trycart</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Find exactly what you're looking for with our powerful search engine
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Start your search
          </h2>
          <SearchBox className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Home;
