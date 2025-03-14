import React from "react";

const ResultSection = ({ items, navigate, isLoading }) => (
  <div className="relative overflow-auto max-h-[calc(100vh-200px)]">
    <div
      className={`${isLoading ? "blur-sm" : ""} transition-all duration-300`}
    >
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {items.map((item) => (
            <div key={item.id} className="h-full">
              <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 flex flex-col overflow-hidden group">
                <div className="h-48 relative">

                  <div
                    className={`absolute inset-0 bg-cover bg-center w-full h-full transition-all duration-300 group-hover:scale-105 ${!item.in_stock ? 'grayscale' : ''}`}
                    style={{
                      backgroundImage: `url(${item.image_link})`,
                    }}
                    aria-label={item.title}
                  ></div>

                  {!item.in_stock && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-xl font-bold">
                      Sold Out
                    </div>
                  )}
                </div>
                <div className="p-4 flex-grow">
                  <p className="text-xs text-gray-500 mb-1">{item.brand_key}</p>
                  <h5 className="text-gray-800 font-medium mb-2 line-clamp-2">
                    {item.title}
                  </h5>
                </div>
                <div className="p-4">
                  {!item.discount ? (
                    <p className="font-bold text-black-500 text-lg">
                      <span className="text text-bold text-sm">KWD</span> {item.price}
                    </p>
                  ) : (
                    <>
                      <p className="font-bold text-black-600 text-lg">
                        <span className="text text-bold">KWD</span> {item.sale_price}
                      </p>
                      <div className="mt-0 flex items-center">
                        <p className="font-bold text-gray-500 text-sm line-through mt-1 mr-2">
                          <span className="text text-bold text-sm">KWD</span> {item.price}
                        </p>
                        <p className="font-bold text-green-600 text-sm">
                          {item.discount}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xl text-gray-600 mb-2">No results found</p>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filters
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/")}
          >
            Go To Home
          </button>
        </div>
      )}
    </div>

    {isLoading && (
      <div className="absolute inset-0 flex justify-center items-center bg-transparent z-10">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent shadow-lg"></div>
      </div>
    )}
  </div>
);

export default ResultSection;
