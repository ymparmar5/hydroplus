import { Timestamp, addDoc, collection, getDoc, doc, setDoc } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../FireBase/FireBaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import myContext from '../../Context/myContext';
import { uploadImage } from '../Admin/Cloudnary';

const AddOrUpdateProductPage = () => {
    const { id } = useParams();
    const { categories, addNewCategory, deleteCategory, addNewSubcategory, deleteSubcategory } = useContext(myContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: "",
        imgurl1: "",
        imgurl2: "",
        imgurl3: "",
        imgurl4: "",
        imgurl5: "",
        bestSell: "",
        category1: "",
        subcategory1: "",
        category2: "",
        subcategory2: "",
        category3: "",
        subcategory3: "",
        category4: "",
        subcategory4: "",
        description: "",
        specification: "",
        features: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });
    const [newCategory, setNewCategory] = useState("");
    const [newSubcategory, setNewSubcategory] = useState("");
    const [selectedCategoryForSub, setSelectedCategoryForSub] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            const fetchProduct = async () => {
                try {
                    const docRef = doc(fireDB, "products", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setProduct(docSnap.data());
                    } else {
                        toast.error("No such product!");
                        navigate("/admin");
                    }
                } catch (error) {
                    console.error("Error fetching product: ", error);
                    toast.error("Failed to fetch product.");
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, navigate]);

    const addProduct = async () => {
        try {
            await addDoc(collection(fireDB, "products"), product);
            toast.success("Product added successfully!");
            navigate("/admin");
        } catch (error) {
            console.error("Error adding product: ", error);
            toast.error("Failed to add product.");
        }
    };

    const updateProduct = async () => {
        try {
            const docRef = doc(fireDB, "products", id);
            await setDoc(docRef, {
                ...product,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }),
            });
            toast.success("Product updated successfully!");
            navigate("/admin");
        } catch (error) {
            console.error("Error updating product: ", error);
            toast.error("Failed to update product.");
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const url = await uploadImage(file);
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    [e.target.name]: url,
                }));
            } catch (error) {
                toast.error('Image upload failed');
            }
        }
    };

    const handleCategoryChange = (index, value) => {
        const updatedProduct = { ...product, [`category${index}`]: value, [`subcategory${index}`]: '' };
        setProduct(updatedProduct);
    };

    const handleSubcategoryChange = (index, value) => {
        setProduct({ ...product, [`subcategory${index}`]: value });
    };

    const handleAddCategory = () => {
        if (newCategory) {
            addNewCategory(newCategory);
            toast.success(`Category "${newCategory}" added successfully!`);
            setNewCategory("");
        }
    };

    const handleDeleteCategory = () => {
        if (newCategory) {
            deleteCategory(newCategory);
            toast.success(`Category "${newCategory}" deleted successfully!`);
            setNewCategory("");
        }
    };

    const handleAddSubcategory = () => {
        if (selectedCategoryForSub && newSubcategory) {
            addNewSubcategory(selectedCategoryForSub, newSubcategory);
            toast.success(`Subcategory "${newSubcategory}" added to "${selectedCategoryForSub}" successfully!`);
            setNewSubcategory("");
            setSelectedCategoryForSub("");
        }
    };

    const handleDeleteSubcategory = () => {
        if (selectedCategoryForSub && newSubcategory) {
            deleteSubcategory(selectedCategoryForSub, newSubcategory);
            toast.success(`Subcategory "${newSubcategory}" deleted successfully!`);
            setNewSubcategory("");
            setSelectedCategoryForSub("");
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-lg font-semibold">Loading...</div>;
    }

    const inputClass = "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200";
    const buttonClass = "px-4 py-2 rounded font-medium transition-colors";
    const labelClass = "text-sm text-gray-600 mb-1";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {id ? 'Update Product' : 'Add Product'}
                    </h2>
                    <p className="text-gray-600">
                        Fill in the details below to {id ? 'update' : 'add'} a product.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={e => { e.preventDefault(); id ? updateProduct() : addProduct(); }}>
                    {/* Product Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Product Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Product Title"
                                    value={product.title}
                                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                    className={`${inputClass} w-full`}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Best Selling?</label>
                                <select 
                                    onChange={(e) => setProduct({ ...product, bestSell: e.target.value })} 
                                    value={product.bestSell}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Product Images */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Product Images</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {[1,2,3,4,5].map((num) => (
                                <div key={num} className="space-y-2">
                                    <label className={labelClass}>Image {num}</label>
                                    <input
                                        type="file"
                                        name={`imgurl${num}`}
                                        onChange={handleImageUpload}
                                        className="w-full text-sm file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                    />
                                    {product[`imgurl${num}`] && (
                                        <img
                                            src={product[`imgurl${num}`]}
                                            alt={`Preview ${num}`}
                                            className="w-20 h-20 object-cover rounded border"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Categories & Subcategories</h3>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Category {index}</label>
                                        <select
                                            value={product[`category${index}`]}
                                            onChange={(e) => handleCategoryChange(index, e.target.value)}
                                            className={`${inputClass} w-full`}
                                        >
                                            <option value="">Select Category {index}</option>
                                            {Object.keys(categories).map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Subcategory {index}</label>
                                        <select
                                            value={product[`subcategory${index}`]}
                                            onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                                            disabled={!product[`category${index}`]}
                                            className={`${inputClass} w-full disabled:bg-gray-100`}
                                        >
                                            <option value="">Select Subcategory {index}</option>
                                            {product[`category${index}`] &&
                                                categories[product[`category${index}`]].map((subcategory) => (
                                                    <option key={subcategory} value={subcategory}>
                                                        {subcategory}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Product Description</h3>
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Features</label>
                                <textarea
                                    placeholder="Product Features"
                                    value={product.features}
                                    onChange={(e) => setProduct({ ...product, features: e.target.value })}
                                    rows={3}
                                    className={`${inputClass} w-full`}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Specification</label>
                                <textarea
                                    placeholder="Product Specification"
                                    value={product.specification}
                                    onChange={(e) => setProduct({ ...product, specification: e.target.value })}
                                    rows={3}
                                    className={`${inputClass} w-full`}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Description</label>
                                <textarea
                                    placeholder="Product Description"
                                    value={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                    rows={3}
                                    className={`${inputClass} w-full`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className={`${buttonClass} w-full bg-primary-600 text-white hover:bg-primary-700 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading && (
                            <svg className="animate-spin h-4 w-4 mr-2 inline" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                        )}
                        {id ? 'Update Product' : 'Add Product'}
                    </button>
                </form>

                {/* Category Management */}
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Category Management</h3>
                    
                    {/* Category Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-600">Manage Categories</h4>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className={`${inputClass} flex-1`}
                                />
                                <button 
                                    className={`${buttonClass} bg-green-600 text-white hover:bg-green-700`}
                                    onClick={handleAddCategory}
                                >
                                    Add
                                </button>
                                {!id && (
                                    <button 
                                        className={`${buttonClass} bg-red-600 text-white hover:bg-red-700`}
                                        onClick={handleDeleteCategory}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-600">Manage Subcategories</h4>
                            <div className="flex gap-2">
                                <select
                                    value={selectedCategoryForSub}
                                    onChange={(e) => setSelectedCategoryForSub(e.target.value)}
                                    className={`${inputClass} flex-1`}
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Subcategory Name"
                                    value={newSubcategory}
                                    onChange={(e) => setNewSubcategory(e.target.value)}
                                    className={`${inputClass} flex-1`}
                                />
                                <button 
                                    className={`${buttonClass} bg-primary-600 text-white hover:bg-primary-700`}
                                    onClick={handleAddSubcategory}
                                >
                                    Add
                                </button>
                                {!id && (
                                    <button 
                                        className={`${buttonClass} bg-red-600 text-white hover:bg-red-700`}
                                        onClick={handleDeleteSubcategory}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrUpdateProductPage;