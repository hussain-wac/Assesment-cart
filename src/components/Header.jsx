import React from "react";

function Header() {
  return (
    <div>
      <header className="bg-gray-900 text-white py-4 mb-0">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-2">
          <div className="text-lg font-semibold mb-4 md:mb-0">
            <a href="/" className="hover:text-blue-500">
              TryCart
            </a>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
          
          </div>
          
        </div>
      </header>
    </div>
  );
}

export default Header;
