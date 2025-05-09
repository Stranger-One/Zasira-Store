import React from 'react';

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between sticky top-0 bg-white shadow z-10'>
        <img src="/20240604_155758.png" alt="Admin Logo" className='w-24' />
        <button 
            onClick={() => setToken('')} 
            className='bg-gray-600 hover:bg-red-500 text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer logout'
        >
            Logout
        </button>
    </div>
  );
};

export default Navbar;
