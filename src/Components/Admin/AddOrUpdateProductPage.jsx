import { Timestamp, addDoc, collection, getDoc, doc, setDoc } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../FireBase/FireBaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import myContext from '../../Context/myContext';
import { uploadImage } from './Cloudnary';

const AddOrUpdateProductPage = () => {
    const { id } = useParams();
    const { categories, addNewCategory, deleteCategory, addNewSubcategory, deleteSubcategory, updateCategory, updateSubcategory } = useContext(myContext);
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
    const [newCategoryImage, setNewCategoryImage] = useState("");
    const [newSubcategory, setNewSubcategory] = useState("");
    const [newSubcategoryImage, setNewSubcategoryImage] = useState("");
    const [selectedCategoryForSub, setSelectedCategoryForSub] = useState("");
    const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState("");
    const [selectedSubcategoryToDelete, setSelectedSubcategoryToDelete] = useState("");
    const [categoryToUpdate, setCategoryToUpdate] = useState("");
    const [updatedCategoryName, setUpdatedCategoryName] = useState("");
    const [updatedCategoryImage, setUpdatedCategoryImage] = useState("");
    const [subcategoryToUpdate, setSubcategoryToUpdate] = useState("");
    const [updatedSubcategoryName, setUpdatedSubcategoryName] = useState("");
    const [updatedSubcategoryImage, setUpdatedSubcategoryImage] = useState("");
    const [selectedCategoryForSubUpdate, setSelectedCategoryForSubUpdate] = useState("");
    const [loading, setLoading] = useState(false);
    const [categoryImageUploading, setCategoryImageUploading] = useState(false);
    const [subcategoryImageUploading, setSubcategoryImageUploading] = useState(false);
    const [updatedCategoryImageUploading, setUpdatedCategoryImageUploading] = useState(false);
    const [updatedSubcategoryImageUploading, setUpdatedSubcategoryImageUploading] = useState(false);
    const [managementMode, setManagementMode] = useState('add'); // 'add', 'update', 'delete'

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

    const handleCategoryImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setCategoryImageUploading(true);
            try {
                const url = await uploadImage(file);
                setNewCategoryImage(url);
                toast.success('Category image uploaded successfully!');
            } catch (error) {
                toast.error('Category image upload failed');
            } finally {
                setCategoryImageUploading(false);
            }
        }
    };

    const handleSubcategoryImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSubcategoryImageUploading(true);
            try {
                const url = await uploadImage(file);
                setNewSubcategoryImage(url);
                toast.success('Subcategory image uploaded successfully!');
            } catch (error) {
                toast.error('Subcategory image upload failed');
            } finally {
                setSubcategoryImageUploading(false);
            }
        }
    };

    const handleUpdatedCategoryImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedCategoryImageUploading(true);
            try {
                const url = await uploadImage(file);
                setUpdatedCategoryImage(url);
                toast.success('Updated category image uploaded successfully!');
            } catch (error) {
                toast.error('Updated category image upload failed');
            } finally {
                setUpdatedCategoryImageUploading(false);
            }
        }
    };

    const handleUpdatedSubcategoryImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedSubcategoryImageUploading(true);
            try {
                const url = await uploadImage(file);
                setUpdatedSubcategoryImage(url);
                toast.success('Updated subcategory image uploaded successfully!');
            } catch (error) {
                toast.error('Updated subcategory image upload failed');
            } finally {
                setUpdatedSubcategoryImageUploading(false);
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
        if (newCategory.trim()) {
            addNewCategory(newCategory.trim(), newCategoryImage);
            toast.success(`Category "${newCategory}" added successfully!`);
            setNewCategory("");
            setNewCategoryImage("");
        } else {
            toast.error("Please enter a category name");
        }
    };

    const handleDeleteCategory = () => {
        if (selectedCategoryToDelete) {
            deleteCategory(selectedCategoryToDelete);
            toast.success(`Category "${selectedCategoryToDelete}" deleted successfully!`);
            setSelectedCategoryToDelete("");
        } else {
            toast.error("Please select a category to delete");
        }
    };

    const handleUpdateCategory = () => {
        if (categoryToUpdate && updatedCategoryName.trim()) {
            if (updateCategory) {
                updateCategory(categoryToUpdate, updatedCategoryName.trim(), updatedCategoryImage);
                toast.success(`Category "${categoryToUpdate}" updated successfully!`);
            } else {
                // Fallback: delete old and add new if updateCategory is not available
                deleteCategory(categoryToUpdate);
                addNewCategory(updatedCategoryName.trim(), updatedCategoryImage);
                toast.success(`Category updated successfully!`);
            }
            setCategoryToUpdate("");
            setUpdatedCategoryName("");
            setUpdatedCategoryImage("");
        } else {
            toast.error("Please select a category and enter new name");
        }
    };

    const handleAddSubcategory = () => {
        if (selectedCategoryForSub && newSubcategory.trim()) {
            addNewSubcategory(selectedCategoryForSub, newSubcategory.trim(), newSubcategoryImage);
            toast.success(`Subcategory "${newSubcategory}" added to "${selectedCategoryForSub}" successfully!`);
            setNewSubcategory("");
            setNewSubcategoryImage("");
            setSelectedCategoryForSub("");
        } else {
            toast.error("Please select a category and enter subcategory name");
        }
    };

    const handleDeleteSubcategory = () => {
        if (selectedCategoryForSub && selectedSubcategoryToDelete) {
            deleteSubcategory(selectedCategoryForSub, selectedSubcategoryToDelete);
            toast.success(`Subcategory "${selectedSubcategoryToDelete}" deleted successfully!`);
            setSelectedSubcategoryToDelete("");
            setSelectedCategoryForSub("");
        } else {
            toast.error("Please select both category and subcategory to delete");
        }
    };

    const handleUpdateSubcategory = () => {
        if (selectedCategoryForSubUpdate && subcategoryToUpdate && updatedSubcategoryName.trim()) {
            if (updateSubcategory) {
                updateSubcategory(selectedCategoryForSubUpdate, subcategoryToUpdate, updatedSubcategoryName.trim(), updatedSubcategoryImage);
                toast.success(`Subcategory "${subcategoryToUpdate}" updated successfully!`);
            } else {
                // Fallback: delete old and add new if updateSubcategory is not available
                deleteSubcategory(selectedCategoryForSubUpdate, subcategoryToUpdate);
                addNewSubcategory(selectedCategoryForSubUpdate, updatedSubcategoryName.trim(), updatedSubcategoryImage);
                toast.success(`Subcategory updated successfully!`);
            }
            setSelectedCategoryForSubUpdate("");
            setSubcategoryToUpdate("");
            setUpdatedSubcategoryName("");
            setUpdatedSubcategoryImage("");
        } else {
            toast.error("Please select category, subcategory and enter new name");
        }
    };

    const resetCategoryForms = () => {
        setNewCategory("");
        setNewCategoryImage("");
        setSelectedCategoryToDelete("");
        setCategoryToUpdate("");
        setUpdatedCategoryName("");
        setUpdatedCategoryImage("");
    };

    const resetSubcategoryForms = () => {
        setNewSubcategory("");
        setNewSubcategoryImage("");
        setSelectedCategoryForSub("");
        setSelectedSubcategoryToDelete("");
        setSelectedCategoryForSubUpdate("");
        setSubcategoryToUpdate("");
        setUpdatedSubcategoryName("");
        setUpdatedSubcategoryImage("");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-lg font-semibold text-white">
                <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    const inputClass = "border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-700 text-white placeholder-gray-400";
    const buttonClass = "px-4 py-2 rounded font-medium transition-colors";
    const labelClass = "text-sm text-gray-300 mb-1 block";

    return (
        <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {id ? 'Update Product' : 'Add Product'}
                    </h2>
                </div>

                <form className="space-y-6" onSubmit={e => { e.preventDefault(); id ? updateProduct() : addProduct(); }}>
                    {/* Product Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Product Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Title <span className="text-red-400">*</span></label>
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
                        <h3 className="text-lg font-semibold text-white mb-3">Product Images</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <div key={num} className="space-y-2">
                                    <label className={labelClass}>Image {num}</label>
                                    <input
                                        type="file"
                                        name={`imgurl${num}`}
                                        onChange={handleImageUpload}
                                        className="w-full text-sm text-gray-300 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700 file:rounded"
                                        accept="image/*"
                                    />
                                    {product[`imgurl${num}`] && (
                                        <div className="relative">
                                            <img
                                                src={product[`imgurl${num}`]}
                                                alt={`Preview ${num}`}
                                                className="w-20 h-20 object-cover rounded border border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setProduct({ ...product, [`imgurl${num}`]: "" })}
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Categories & Subcategories</h3>
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
                                            className={`${inputClass} w-full disabled:bg-gray-600 disabled:text-gray-400`}
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
                        <h3 className="text-lg font-semibold text-white mb-3">Product Description</h3>
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
            </div>

            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
                {/* Category Management */}
                <h3 className="text-lg font-semibold text-white mb-4">Category Management</h3>
                
                {/* Management Mode Selector */}
                <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                        <button
                            className={`${buttonClass} ${managementMode === 'add' ? 'bg-primary-600 text-white' : 'bg-gray-600 text-gray-300'} hover:bg-primary-700`}
                            onClick={() => {
                                setManagementMode('add');
                                resetCategoryForms();
                                resetSubcategoryForms();
                            }}
                        >
                            Add
                        </button>
                        <button
                            className={`${buttonClass} ${managementMode === 'update' ? 'bg-primary-600 text-white' : 'bg-gray-600 text-gray-300'} hover:bg-primary-700`}
                            onClick={() => {
                                setManagementMode('update');
                                resetCategoryForms();
                                resetSubcategoryForms();
                            }}
                        >
                            Update
                        </button>
                        <button
                            className={`${buttonClass} ${managementMode === 'delete' ? 'bg-primary-600 text-white' : 'bg-gray-600 text-gray-300'} hover:bg-primary-700`}
                            onClick={() => {
                                setManagementMode('delete');
                                resetCategoryForms();
                                resetSubcategoryForms();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Category Management */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-300">
                            {managementMode === 'add' && 'Add Categories'}
                            {managementMode === 'update' && 'Update Categories'}
                            {managementMode === 'delete' && 'Delete Categories'}
                        </h4>
                        
                        {managementMode === 'add' && (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className={`${inputClass} w-full`}
                                />
                                <div>
                                    <label className={labelClass}>Category Image</label>
                                    <input
                                        type="file"
                                        onChange={handleCategoryImageUpload}
                                        className="w-full text-sm text-gray-300 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700 file:rounded"
                                        accept="image/*"
                                        disabled={categoryImageUploading}
                                    />
                                    {categoryImageUploading && (
                                        <div className="flex items-center mt-2 text-sm text-gray-400">
                                            <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg>
                                            Uploading...
                                        </div>
                                    )}
                                    {newCategoryImage && (
                                        <div className="relative inline-block mt-2">
                                            <img
                                                src={newCategoryImage}
                                                alt="Category Preview"
                                                className="w-20 h-20 object-cover rounded border border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setNewCategoryImage("")}
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className={`${buttonClass} bg-primary-600 text-white hover:bg-primary-700 w-full`}
                                    onClick={handleAddCategory}
                                    disabled={categoryImageUploading}
                                >
                                    Add Category
                                </button>
                            </div>
                        )}

                        {managementMode === 'update' && (
                            <div className="space-y-3">
                                <select
                                    value={categoryToUpdate}
                                    onChange={(e) => {
                                        setCategoryToUpdate(e.target.value);
                                        setUpdatedCategoryName(e.target.value);
                                    }}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select Category to Update</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="New Category Name"
                                    value={updatedCategoryName}
                                    onChange={(e) => setUpdatedCategoryName(e.target.value)}
                                    className={`${inputClass} w-full`}
                                />
                                <div>
                                    <label className={labelClass}>New Category Image (Optional)</label>
                                    <input
                                        type="file"
                                        onChange={handleUpdatedCategoryImageUpload}
                                        className="w-full text-sm text-gray-300 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700 file:rounded"
                                        accept="image/*"
                                        disabled={updatedCategoryImageUploading}
                                    />
                                    {updatedCategoryImageUploading && (
                                        <div className="flex items-center mt-2 text-sm text-gray-400">
                                            <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg>
                                            Uploading...
                                        </div>
                                    )}
                                    {updatedCategoryImage && (
                                        <div className="relative inline-block mt-2">
                                            <img
                                                src={updatedCategoryImage}
                                                alt="Updated Category Preview"
                                                className="w-20 h-20 object-cover rounded border border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setUpdatedCategoryImage("")}
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700 w-full`}
                                    onClick={handleUpdateCategory}
                                    disabled={updatedCategoryImageUploading}
                                >
                                    Update Category
                                </button>
                            </div>
                        )}

                        {managementMode === 'delete' && (
                            <div className="space-y-3">
                                <select
                                    value={selectedCategoryToDelete}
                                    onChange={(e) => setSelectedCategoryToDelete(e.target.value)}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select Category to Delete</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className={`${buttonClass} bg-red-600 text-white hover:bg-red-700 w-full`}
                                    onClick={handleDeleteCategory}
                                >
                                    Delete Category
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Subcategory Management */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-300">
                            {managementMode === 'add' && 'Add Subcategories'}
                            {managementMode === 'update' && 'Update Subcategories'}
                            {managementMode === 'delete' && 'Delete Subcategories'}
                        </h4>

                        {managementMode === 'add' && (
                            <div className="space-y-3">
                                <select
                                    value={selectedCategoryForSub}
                                    onChange={(e) => setSelectedCategoryForSub(e.target.value)}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Subcategory Name"
                                    value={newSubcategory}
                                    onChange={(e) => setNewSubcategory(e.target.value)}
                                    className={`${inputClass} w-full`}
                                />
                                <div>
                                    <label className={labelClass}>Subcategory Image</label>
                                    <input
                                        type="file"
                                        onChange={handleSubcategoryImageUpload}
                                        className="w-full text-sm text-gray-300 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700 file:rounded"
                                        accept="image/*"
                                        disabled={subcategoryImageUploading}
                                    />
                                    {subcategoryImageUploading && (
                                        <div className="flex items-center mt-2 text-sm text-gray-400">
                                            <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg>
                                            Uploading...
                                        </div>
                                    )}
                                    {newSubcategoryImage && (
                                        <div className="relative inline-block mt-2">
                                            <img
                                                src={newSubcategoryImage}
                                                alt="Subcategory Preview"
                                                className="w-20 h-20 object-cover rounded border border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setNewSubcategoryImage("")}
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className={`${buttonClass} bg-primary-600 text-white hover:bg-primary-700 w-full`}
                                    onClick={handleAddSubcategory}
                                    disabled={subcategoryImageUploading}
                                >
                                    Add Subcategory
                                </button>
                            </div>
                        )}

                        {managementMode === 'update' && (
                            <div className="space-y-3">
                                <select
                                    value={selectedCategoryForSubUpdate}
                                    onChange={(e) => {
                                        setSelectedCategoryForSubUpdate(e.target.value);
                                        setSubcategoryToUpdate("");
                                    }}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={subcategoryToUpdate}
                                    onChange={(e) => {
                                        setSubcategoryToUpdate(e.target.value);
                                        setUpdatedSubcategoryName(e.target.value);
                                    }}
                                    disabled={!selectedCategoryForSubUpdate}
                                    className={`${inputClass} w-full disabled:bg-gray-600 disabled:text-gray-400`}
                                >
                                    <option value="">Select Subcategory to Update</option>
                                    {selectedCategoryForSubUpdate &&
                                        categories[selectedCategoryForSubUpdate].map((subcategory) => (
                                            <option key={subcategory} value={subcategory}>
                                                {subcategory}
                                            </option>
                                        ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="New Subcategory Name"
                                    value={updatedSubcategoryName}
                                    onChange={(e) => setUpdatedSubcategoryName(e.target.value)}
                                    className={`${inputClass} w-full`}
                                />
                                <div>
                                    <label className={labelClass}>New Subcategory Image (Optional)</label>
                                    <input
                                        type="file"
                                        onChange={handleUpdatedSubcategoryImageUpload}
                                        className="w-full text-sm text-gray-300 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700 file:rounded"
                                        accept="image/*"
                                        disabled={updatedSubcategoryImageUploading}
                                    />
                                    {updatedSubcategoryImageUploading && (
                                        <div className="flex items-center mt-2 text-sm text-gray-400">
                                            <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg>
                                            Uploading...
                                        </div>
                                    )}
                                    {updatedSubcategoryImage && (
                                        <div className="relative inline-block mt-2">
                                            <img
                                                src={updatedSubcategoryImage}
                                                alt="Updated Subcategory Preview"
                                                className="w-20 h-20 object-cover rounded border border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setUpdatedSubcategoryImage("")}
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700 w-full`}
                                    onClick={handleUpdateSubcategory}
                                    disabled={updatedSubcategoryImageUploading}
                                >
                                    Update Subcategory
                                </button>
                            </div>
                        )}

                        {managementMode === 'delete' && (
                            <div className="space-y-3">
                                <select
                                    value={selectedCategoryForSub}
                                    onChange={(e) => {
                                        setSelectedCategoryForSub(e.target.value);
                                        setSelectedSubcategoryToDelete("");
                                    }}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={selectedSubcategoryToDelete}
                                    onChange={(e) => setSelectedSubcategoryToDelete(e.target.value)}
                                    disabled={!selectedCategoryForSub}
                                    className={`${inputClass} w-full disabled:bg-gray-600 disabled:text-gray-400`}
                                >
                                    <option value="">Select Subcategory to Delete</option>
                                    {selectedCategoryForSub &&
                                        categories[selectedCategoryForSub].map((subcategory) => (
                                            <option key={subcategory} value={subcategory}>
                                                {subcategory}
                                            </option>
                                        ))}
                                </select>
                                <button
                                    className={`${buttonClass} bg-red-600 text-white hover:bg-red-700 w-full`}
                                    onClick={handleDeleteSubcategory}
                                >
                                    Delete Subcategory
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrUpdateProductPage;