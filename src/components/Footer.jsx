import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mb-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="text-2xl font-semibold mb-4 md:mb-0">
          <a href="/" className="hover:text-blue-500">TryCart</a>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-400">Terms of Service</a>
          <a href="/contact" className="hover:text-blue-400">Contact Us</a>
        </div>
        <div className="text-sm text-gray-400 mt-4 md:mt-0">
          <p>&copy; 2025 TryCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
