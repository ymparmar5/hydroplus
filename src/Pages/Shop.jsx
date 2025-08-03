import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import myContext from '../Context/myContext';
import { useDispatch, useSelector } from 'react-redux';

const Shop = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { category } = useParams(); // Get category from URL params
    const { getAllProduct, loading, categories } = useContext(myContext);
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [expandedCategory, setExpandedCategory] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const productsPerPage = 12;

    // Determine if we're showing subcategories or products
    const isShowingSubcategories = Boolean(category);
    const subcategories = category ? (categories[category] || []) : [];
console.log(subcategories)
    useEffect(() => {
        if (category) {
            // We're on /shop/:category route - showing subcategories
            setSelectedCategory(category);
            setExpandedCategory(category);
            setSelectedSubcategory('');
        } else {
            // We're on /shop route - check query params for filtering
            const queryParams = new URLSearchParams(location.search);
            const categoryParam = queryParams.get('category');
            const subcategoryParam = queryParams.get('subcategory');
            if (categoryParam) setSelectedCategory(categoryParam);
            if (subcategoryParam) setSelectedSubcategory(subcategoryParam);
        }
    }, [category, location.search]);

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        setSelectedSubcategory('');
        setExpandedCategory(prev => prev === categoryName ? '' : categoryName);
        navigate(`/shop/${encodeURIComponent(categoryName)}`);
        setSidebarOpen(false);
    };

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        navigate(`/shop?subcategory=${encodeURIComponent(subcategory)}`);
        setSidebarOpen(false);
    };

    // Products filtering and sorting (only used when not showing subcategories)
    const sortedProducts = [...getAllProduct].sort((a, b) => {
        if (sortOption === 'price-low-high') {
            return a.price - b.price;
        } else if (sortOption === 'price-high-low') {
            return b.price - a.price;
        } else if (sortOption === 'name-az') {
            return a.title.localeCompare(b.title);
        } else if (sortOption === 'name-za') {
            return b.title.localeCompare(a.title);
        }
        return 0;
    });

    const filteredProducts = sortedProducts.filter(product => {
        if (selectedSubcategory) {
            return (
                product.subcategory1 === selectedSubcategory ||
                product.subcategory2 === selectedSubcategory ||
                product.subcategory3 === selectedSubcategory ||
                product.subcategory4 === selectedSubcategory
            );
        }
        if (selectedCategory && !category) { // Only filter by category if we're not showing subcategories
            return (
                product.category1 === selectedCategory ||
                product.category2 === selectedCategory ||
                product.category3 === selectedCategory ||
                product.category4 === selectedCategory
            );
        }
        return true;
    });

    // Pagination logic
    const dataToShow = isShowingSubcategories ? subcategories : filteredProducts;
    const indexOfLastItem = currentPage * productsPerPage;
    const indexOfFirstItem = indexOfLastItem - productsPerPage;
    const currentItems = dataToShow.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalItems = dataToShow.length;
    const totalPages = Math.ceil(totalItems / productsPerPage);

    // Reset pagination when switching between views
    useEffect(() => {
        setCurrentPage(1);
    }, [category, selectedSubcategory]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="flex items-center space-x-2 text-primary-700 font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span>Categories</span>
                </button>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`
                    fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-72 
                    bg-white shadow-lg lg:shadow-md border-r border-gray-200
                    transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 transition-transform duration-300 ease-in-out
                `}>
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-primary-900">Categories</h2>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden text-primary-600 hover:text-primary-800"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-4 h-full overflow-y-auto">
                        <ul className="space-y-2">
                            {Object.keys(categories).map((categoryName, index) => (
                                <li key={index} className="group">
                                    <div
                                        className={`
                                            px-4 py-3 rounded-lg cursor-pointer font-medium 
                                            flex justify-between items-center transition-all duration-200
                                            ${selectedCategory === categoryName 
                                                ? 'bg-primary-600 text-white shadow-md' 
                                                : 'bg-gray-50 text-gray-700 hover:bg-primary-50 hover:text-primary-700 border border-gray-200'
                                            }
                                        `}
                                        onClick={() => handleCategoryClick(categoryName)}
                                    >
                                        <span className="truncate">{categoryName}</span>
                                        <span className={`
                                            ml-2 w-6 h-6 flex items-center justify-center rounded-full text-sm
                                            ${selectedCategory === categoryName 
                                                ? 'bg-white/20 text-white' 
                                                : 'bg-primary-100 text-primary-600 group-hover:bg-primary-200'
                                            }
                                        `}>
                                            {expandedCategory === categoryName ? '−' : '+'}
                                        </span>
                                    </div>
                                    
                                    {expandedCategory === categoryName && categories[categoryName].length > 0 && (
                                        <ul className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top duration-200">
                                            {categories[categoryName].map((subcategory, subIndex) => (
                                                <li
                                                    key={subIndex}
                                                    className={`
                                                        px-3 py-2 rounded-md cursor-pointer text-sm font-medium
                                                        transition-all duration-200 border
                                                        ${selectedSubcategory === subcategory
                                                            ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                                                            : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 hover:border-orange-300'
                                                        }
                                                    `}
                                                    onClick={() => handleSubcategoryClick(subcategory)}
                                                >
                                                    {subcategory}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 min-h-screen">
                    <div className="p-6 lg:p-8">
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                        {isShowingSubcategories 
                                            ? category 
                                            : (selectedSubcategory || selectedCategory || 'All Products')
                                        }
                                    </h1>
                                    <p className="text-gray-600">
                                        {totalItems} {isShowingSubcategories ? 'subcategories' : 'products'} found
                                    </p>
                                </div>
                                
                                {/* Only show sorting for products, not subcategories */}
                                {!isShowingSubcategories && (
                                    <div className="flex items-center space-x-3">
                                        <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                            Sort by:
                                        </label>
                                        <select
                                            id="sort"
                                            onChange={handleSort}
                                            value={sortOption}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                                        >
                                            <option value="">Default</option>
                                            <option value="price-low-high">Price: Low to High</option>
                                            <option value="price-high-low">Price: High to Low</option>
                                            <option value="name-az">Name: A to Z</option>
                                            <option value="name-za">Name: Z to A</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                                        <p className="text-gray-600 font-medium">Loading...</p>
                                    </div>
                                </div>
                            ) : currentItems.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        No {isShowingSubcategories ? 'subcategories' : 'products'} found
                                    </h3>
                                    <p className="text-gray-600">
                                        {isShowingSubcategories 
                                            ? 'This category has no subcategories' 
                                            : 'Try adjusting your filters or search criteria'
                                        }
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {isShowingSubcategories ? (
                                        // Render Subcategories
                                        currentItems.map((subcat, index) => (
                                            <div
                                                key={index}
                                                className="group bg-white border border-gray-200 rounded-xl p-4 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                                onClick={() => handleSubcategoryClick(subcat)}
                                            >
                                                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                                                    <img
                                                        src="/ENGINE.png"
                                                        alt={subcat}
                                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200">
                                                        {subcat.substring(0, 50)}{subcat.length > 50 ? '...' : ''}
                                                    </h3>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        // Render Products
                                        currentItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className="group bg-white border border-gray-200 rounded-xl p-4 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                                onClick={() => navigate(`/productinfo/${item.id}`)}
                                            >
                                                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50">
                                                    <img
                                                        src={item.imgurl1}
                                                        alt={item.title}
                                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200">
                                                        {item.title.substring(0, 50)}{item.title.length > 50 ? '...' : ''}
                                                    </h3>
                                                    {item.price && (
                                                        <p className="text-xl font-bold text-primary-600">
                                                            ₹{item.price.toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`
                                            px-4 py-2 rounded-lg font-medium transition-all duration-200
                                            ${currentPage === 1 
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        Previous
                                    </button>

                                    {/* Page Numbers */}
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        
                                        return (
                                            <button
                                                key={pageNum}
                                                className={`
                                                    px-4 py-2 rounded-lg font-medium transition-all duration-200
                                                    ${currentPage === pageNum 
                                                        ? 'bg-primary-600 text-white shadow-md' 
                                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-primary-50 hover:border-primary-300'
                                                    }
                                                `}
                                                onClick={() => paginate(pageNum)}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    {/* Next Button */}
                                    <button
                                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`
                                            px-4 py-2 rounded-lg font-medium transition-all duration-200
                                            ${currentPage === totalPages 
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        Next
                                    </button>
                                </div>
                                
                                <div className="text-center mt-4 text-sm text-gray-600">
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} {isShowingSubcategories ? 'subcategories' : 'products'}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Shop;