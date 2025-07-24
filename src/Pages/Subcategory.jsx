import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import myContext from '../Context/myContext';

const Subcategory = () => {
  const { category } = useParams();
  const { categories } = useContext(myContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const subcategories = categories[category] || [];
  const productsPerPage = 12;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentSubcategories = subcategories.slice(indexOfFirst, indexOfLast);
  const [expandedCategory, setExpandedCategory] = useState(category || '');

  const totalPages = Math.ceil(subcategories.length / productsPerPage);
  const paginate = (page) => setCurrentPage(page);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-[80vh] text-gray-900">
      {/* Sidebar (exactly copied from Shop page) */}
      <aside className="w-full md:w-64 bg-white border-r border-primary-700 p-4 md:p-8 min-h-[80vh]">
        <h2 className="text-primary-500 mb-4 text-xl font-bold">Categories</h2>
        <ul className="space-y-2">
            {Object.keys(categories).map((categoryName, index) => (
              <li key={index}>
               <div
  className={`px-4 py-2 rounded-lg cursor-pointer font-medium flex justify-between items-center transition-colors duration-200 ${
    category === categoryName
      ? 'bg-primary-700 text-white'
      : 'bg-white text-gray-900 border border-primary-700'
  }`}
  onClick={() => {
    setExpandedCategory(prev => prev === categoryName ? '' : categoryName);
    navigate(`/subcategory/${encodeURIComponent(categoryName)}`);
  }}
>
  {categoryName}
  <span>{expandedCategory === categoryName ? '-' : '+'}</span>
</div>

                {expandedCategory === categoryName && categories[categoryName].length > 0 && (
                  <ul className="pl-4 mt-2 space-y-1">
                    {categories[categoryName].map((subcat, subIndex) => (
                      <li
                        key={subIndex}
                        className="px-3 py-1 rounded-md bg-orange-400 text-white cursor-pointer text-base font-normal hover:bg-orange-500 transition-colors duration-200"
                        onClick={() =>
                          navigate(`/shop?subcategory=${encodeURIComponent(subcat)}`)
                        }
                      >
                        {subcat}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </aside>

      {/* Main Subcategory Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="text-2xl font-bold text-primary-500">{category}</div>
        </div>

        {subcategories.length === 0 ? (
          <div className="text-lg text-gray-500">No subcategories found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentSubcategories.map((subcat, index) => (
                <div
                  key={index}
                  className="bg-white border border-primary-700 rounded-lg p-4 cursor-pointer shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105"
                  onClick={() =>
                    navigate(`/shop?subcategory=${encodeURIComponent(subcat)}`)
                  }
                >
                  <div className="flex flex-col items-center">
                    <img
                      src="/ENGINE.png"
                      alt={subcat}
                      className="w-full max-w-[180px] h-[180px] object-contain mb-4"
                    />
                    <div className="text-lg font-semibold text-gray-900 text-center mb-2">
                      {subcat.substring(0, 25)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-md font-medium ${
                      currentPage === i + 1
                        ? 'bg-primary-700 text-white'
                        : 'bg-white border border-primary-700 text-primary-500'
                    } transition-colors duration-200`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Subcategory;
