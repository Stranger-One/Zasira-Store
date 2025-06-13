import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";


const PageNotFound = () => {
  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>
      <p className="text-2xl mt-4 text-gray-800 font-semibold">Page Not Found</p>
      <p className="text-gray-600 mt-2 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
      >
        <FaArrowLeft className="w-5 h-5 mr-2" />
        Go back home
      </Link>
    </div>
  )
}

export default PageNotFound