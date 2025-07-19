import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import myContext from '../Context/myContext';
import { useDispatch, useSelector } from 'react-redux';

const Shop = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getAllProduct, loading, categories } = useContext(myContext);
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const productsPerPage = 12;

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get('category');
        const subcategory = queryParams.get('subcategory');
        if (category) setSelectedCategory(category);
        if (subcategory) setSelectedSubcategory(subcategory);
    }, [location.search]);

    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedSubcategory('');
        navigate(`/subcategory/${encodeURIComponent(category)}`);
    };

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        navigate(`/shop?subcategory=${encodeURIComponent(subcategory)}`);
    };

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
        if (selectedCategory) {
            return (
                product.category1 === selectedCategory ||
                product.category2 === selectedCategory ||
                product.category3 === selectedCategory ||
                product.category4 === selectedCategory
            );
        }
        return true;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-[80vh] text-gray-900">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-blue-700 p-4 md:p-8 min-h-[80vh]">
                <h2 className="text-blue-700 mb-4 text-xl font-bold">Categories</h2>
                <ul className="space-y-2">
                    {Object.keys(categories).map((categoryName, index) => (
                        <li key={index}>
                            <div
                                className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-colors duration-200 ${selectedCategory === categoryName ? 'bg-blue-700 text-white' : 'bg-white text-gray-900 border border-blue-700'}`}
                                onClick={() => handleCategoryClick(categoryName)}
                            >
                                {categoryName}
                            </div>
                            {categories[categoryName].length > 0 && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    {categories[categoryName].map((subcategory, subIndex) => (
                                        <li
                                            key={subIndex}
                                            className="px-3 py-1 rounded-md bg-orange-400 text-white cursor-pointer text-base font-normal hover:bg-orange-500 transition-colors duration-200"
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
            </aside>
            {/* Products Section */}
            <main className="flex-1 p-4 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <div className="text-2xl font-bold text-blue-700">{selectedSubcategory || selectedCategory || 'All Products'}</div>
                    <select onChange={handleSort} value={sortOption} className="px-3 py-2 rounded-md border border-blue-700 text-base">
                        <option value="">Filter</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="name-az">Name: A to Z</option>
                        <option value="name-za">Name: Z to A</option>
                    </select>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            currentProducts.map((item, index) => (
                                <div key={index} className="bg-white border border-blue-700 rounded-lg p-4 cursor-pointer shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105" onClick={() => navigate(`/productinfo/${item.id}`)}>
                                    <div className="flex flex-col items-center">
                                        <img src={item.imgurl1} alt={item.title} className="w-full max-w-[180px] h-[180px] object-contain mb-4" />
                                        <div className="text-lg font-semibold text-gray-900 text-center mb-2">{item.title.substring(0, 25)}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`px-4 py-2 rounded-md font-medium ${currentPage === i + 1 ? 'bg-blue-700 text-white' : 'bg-white border border-blue-700 text-blue-700'} transition-colors duration-200`}
                                onClick={() => paginate(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Shop;