import { ArrowLeft, ArrowRight } from "lucide-react";

const PaginationSection = ({ page, totalPages, setPage }) => (
  <nav aria-label="Page navigation" className="mt-6 border-t border-gray-200 pt-6">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </p>
      <ul className="flex justify-center">
        <li className={`${page === 1 ? "pointer-events-none opacity-50" : ""}`}>
          <a
            className="px-3 py-2 mx-1 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) setPage(page - 1);
            }}
          >
            <ArrowLeft size={16} />
          </a>
        </li>
        {[...Array(Math.min(5, totalPages))].map((_, index) => {
          const pageNum = index + 1;
          return (
            <li key={pageNum}>
              <a
                className={`px-4 py-2 mx-1 border rounded-md transition-colors ${
                  page === pageNum
                    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(pageNum);
                }}
              >
                {pageNum}
              </a>
            </li>
          );
        })}
        <li className={`${page === totalPages ? "pointer-events-none opacity-50" : ""}`}>
          <a
            className="px-3 py-2 mx-1 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) setPage(page + 1);
            }}
          >
            <ArrowRight size={16} />
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default PaginationSection;
