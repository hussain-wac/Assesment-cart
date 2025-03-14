import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PaginationSection = ({ page, totalPages, setPage }) => {
  // Function to determine which page numbers to show
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Always show first and last page, and 3 pages around current
    if (page <= 3) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    } else if (page >= totalPages - 2) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, "...", page - 1, page, page + 1, "...", totalPages];
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Page navigation" className="mt-6 border-t border-gray-200 pt-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </p>
        <ul className="flex justify-center items-center">
          <li className={`${page === 1 ? "pointer-events-none opacity-50" : ""}`}>
            <a
              className="px-3 py-2 mx-1 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:-translate-x-1"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage(page - 1);
              }}
              aria-label="Previous page"
            >
              <ArrowLeft size={16} />
            </a>
          </li>
          
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === "...") {
              return (
                <li key={`ellipsis-${index}`} className="mx-1">
                  <span className="px-2 text-gray-500">...</span>
                </li>
              );
            }
            
            return (
              <li key={`page-${pageNum}`}>
                <a
                  className={`relative px-4 py-2 mx-1 border rounded-md transition-all duration-300 overflow-hidden ${
                    page === pageNum
                      ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-md"
                      : "border-gray-200 hover:bg-gray-50 hover:border-blue-300"
                  }`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pageNum !== page) {
                      // Create ripple effect on click
                      const button = e.currentTarget;
                      const circle = document.createElement("span");
                      const diameter = Math.max(button.clientWidth, button.clientHeight);
                      
                      circle.style.width = circle.style.height = `${diameter}px`;
                      circle.style.left = `${e.clientX - button.offsetLeft - diameter / 2}px`;
                      circle.style.top = `${e.clientY - button.offsetTop - diameter / 2}px`;
                      circle.classList.add("absolute", "bg-white", "rounded-full", "opacity-30", "transform", "scale-0");
                      
                      button.appendChild(circle);
                      
                      setTimeout(() => {
                        circle.classList.add("transition-all", "duration-300", "scale-100", "opacity-0");
                        setTimeout(() => {
                          circle.remove();
                          setPage(pageNum);
                        }, 300);
                      }, 10);
                    }
                  }}
                  style={{ 
                    transform: page === pageNum ? "scale(1.05)" : "scale(1)"
                  }}
                >
                  {pageNum}
                </a>
              </li>
            );
          })}
          
          <li className={`${page === totalPages ? "pointer-events-none opacity-50" : ""}`}>
            <a
              className="px-3 py-2 mx-1 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:translate-x-1"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) setPage(page + 1);
              }}
              aria-label="Next page"
            >
              <ArrowRight size={16} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PaginationSection;