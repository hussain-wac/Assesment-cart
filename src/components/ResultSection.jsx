const ResultSection = ({ items ,navigate }) => (
    <div className="overflow-auto max-h-[calc(100vh-200px)]">
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {items.map((item) => (
            <div key={item.id} className="h-full">
              <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 flex flex-col overflow-hidden group">
                <div className="h-48 relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${item.image_link})`,
                    }}
                    aria-label={item.title}
                  ></div>
                </div>
                <div className="p-4 flex-grow">
                  <p className="text-xs text-gray-500 mb-1">
                    {item.brand_key}
                  </p>
                  <h5 className="text-gray-800 font-medium mb-2 line-clamp-2">
                    {item.title}
                  </h5>
                </div>
                  <div className="p-4 border-t border-gray-200">
                    {!item.discount ? (
                      <p className="font-bold text-gray-500 text-lg">
                        {item.price}
                      </p>
                    ) : (
                      <>
                        <p className="font-bold text-gray-500 text-lg line-through">
                          {item.price}
                        </p>
                        <p className="font-bold text-green-600 text-lg">
                          {item.sale_price}
                        </p>
                        <p className="font-bold text-green-600 text-lg">
                          {item.discount}
                        </p>
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
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => navigate("/")}>
            Go To Home
          </button>
        </div>
      )}
    </div>
  );
  
  export default ResultSection;
  