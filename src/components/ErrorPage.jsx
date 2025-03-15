import React from "react";
import { useLocation, Link } from "react-router-dom";

const ErrorPage = () => {
    const location = useLocation();
    const errorCode = 404; 

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold text-red-500">Error {errorCode}</h1>
            <p className="mt-4 text-lg">Oops! The page <span className="font-semibold">{location.pathname}</span> does not exist.</p>
            <Link to="/" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Go Home
            </Link>
        </div>
    );
};

export default ErrorPage;
