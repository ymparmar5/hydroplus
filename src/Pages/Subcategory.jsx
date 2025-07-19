import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import myContext from '../Context/myContext';

const Subcategory = () => {
  const { category } = useParams();
  const { categories } = useContext(myContext);
  const navigate = useNavigate();
  const subcategories = categories[category] || [];

  return (
    <div className="min-h-[80vh] bg-gray-100 text-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-blue-700 font-bold text-2xl md:text-3xl mb-8 text-center">Subcategories for {category}</div>
      {subcategories.length === 0 ? (
        <div className="text-lg text-gray-500">No subcategories found.</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
          {subcategories.map((subcat, idx) => (
            <div
              key={idx}
              className="bg-white border border-blue-700 rounded-lg px-8 py-6 text-lg font-medium shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 w-full sm:w-auto text-center"
              onClick={() => navigate(`/shop?subcategory=${encodeURIComponent(subcat)}`)}
            >
              {subcat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subcategory; 