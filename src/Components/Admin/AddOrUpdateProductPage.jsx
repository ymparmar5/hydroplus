import { Timestamp, addDoc, collection, getDoc, doc, setDoc } from "firebase/firestore";
import { useContext, useState, useEffect, useCallback } from "react";
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
        title: "",  imgurl1: "", imgurl2: "", imgurl3: "", imgurl4: "", imgurl5: "",
        bestSell: "", category1: "", subcategory1: "", category2: "", subcategory2: "",
        category3: "", subcategory3: "", category4: "", subcategory4: "",
        description: "", specification: "", features: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    });
    
    const [categoryForm, setCategoryForm] = useState({
        newCategory: "", newCategoryImage: "", selectedCategoryToDelete: "",
        categoryToUpdate: "", updatedCategoryName: "", updatedCategoryImage: "",
    });
    
    const [subcategoryForm, setSubcategoryForm] = useState({
        newSubcategory: "", newSubcategoryImage: "", selectedCategoryForSub: "",
        selectedSubcategoryToDelete: "", selectedCategoryForSubUpdate: "",
        subcategoryToUpdate: "", updatedSubcategoryName: "", updatedSubcategoryImage: "",
    });
    
    const [loadingStates, setLoadingStates] = useState({
        page: false, productSubmit: false, categoryImage: false, subcategoryImage: false,
        updatedCategoryImage: false, updatedSubcategoryImage: false,
        categoryAction: false, subcategoryAction: false
    });
    
    const [managementMode, setManagementMode] = useState('add');

    // Prevent duplicate submissions with debounce
    const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
    const SUBMISSION_COOLDOWN = 2000; // 2 seconds

    const canSubmit = useCallback((actionType) => {
        const now = Date.now();
        const key = `${actionType}_${now}`;
        
        if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
            toast.error('Please wait before submitting again');
            return false;
        }
        
        setLastSubmissionTime(now);
        return true;
    }, [lastSubmissionTime]);

    const updateLoadingState = (key, value) => {
        setLoadingStates(prev => ({ ...prev, [key]: value }));
    };

    const updateProduct = (updates) => setProduct(prev => ({ ...prev, ...updates }));
    const updateCategoryForm = (updates) => setCategoryForm(prev => ({ ...prev, ...updates }));
    const updateSubcategoryForm = (updates) => setSubcategoryForm(prev => ({ ...prev, ...updates }));

    const resetForms = () => {
        setCategoryForm({
            newCategory: "", newCategoryImage: "", selectedCategoryToDelete: "",
            categoryToUpdate: "", updatedCategoryName: "", updatedCategoryImage: "",
        });
        setSubcategoryForm({
            newSubcategory: "", newSubcategoryImage: "", selectedCategoryForSub: "",
            selectedSubcategoryToDelete: "", selectedCategoryForSubUpdate: "",
            subcategoryToUpdate: "", updatedSubcategoryName: "", updatedSubcategoryImage: "",
        });
    };

    useEffect(() => {
        if (!id) return;
        
        const fetchProduct = async () => {
            updateLoadingState('page', true);
            try {
                const docRef = doc(fireDB, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    toast.error("Product not found!");
                    navigate("/admin");
                }
            } catch (error) {
                console.error("Error fetching product: ", error);
                toast.error("Failed to fetch product.");
            } finally {
                updateLoadingState('page', false);
            }
        };
        
        fetchProduct();
    }, [id, navigate]);

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        
        if (!canSubmit('product') || loadingStates.productSubmit) return;
        
        if (!product.title.trim()) {
            toast.error("Product title is required");
            return;
        }

        updateLoadingState('productSubmit', true);
        
        try {
            const productData = {
                ...product,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
            };

            if (id) {
                await setDoc(doc(fireDB, "products", id), productData);
                toast.success("Product updated successfully!");
            } else {
                await addDoc(collection(fireDB, "products"), productData);
                toast.success("Product added successfully!");
            }
            navigate("/admin");
        } catch (error) {
            console.error(`Error ${id ? 'updating' : 'adding'} product: `, error);
            toast.error(`Failed to ${id ? 'update' : 'add'} product.`);
        } finally {
            updateLoadingState('productSubmit', false);
        }
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const url = await uploadImage(file);
            if (field.startsWith('imgurl')) {
                updateProduct({ [field]: url });
            } else if (field.includes('category')) {
                if (field.includes('updated')) {
                    updateCategoryForm({ [field]: url });
                } else {
                    updateCategoryForm({ [field]: url });
                }
            } else if (field.includes('subcategory')) {
                if (field.includes('updated')) {
                    updateSubcategoryForm({ [field]: url });
                } else {
                    updateSubcategoryForm({ [field]: url });
                }
            }
            toast.success('Image uploaded successfully!');
        } catch (error) {
            toast.error('Image upload failed');
        }
    };

    const createImageUploadHandler = (field, loadingKey) => async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        updateLoadingState(loadingKey, true);
        try {
            await handleImageUpload(e, field);
        } finally {
            updateLoadingState(loadingKey, false);
        }
    };

    const handleCategoryAction = async (action, data) => {
        if (!canSubmit(`category_${action}`) || loadingStates.categoryAction) return;

        updateLoadingState('categoryAction', true);
        
        try {
            switch (action) {
                case 'add':
                    if (!data.name.trim()) {
                        toast.error("Category name is required");
                        return;
                    }
                    addNewCategory(data.name.trim(), data.image);
                    toast.success(`Category "${data.name}" added successfully!`);
                    updateCategoryForm({ newCategory: "", newCategoryImage: "" });
                    break;
                    
                case 'update':
                    if (!data.oldName || !data.newName.trim()) {
                        toast.error("Please select a category and enter new name");
                        return;
                    }
                    if (updateCategory) {
                        updateCategory(data.oldName, data.newName.trim(), data.image);
                    } else {
                        deleteCategory(data.oldName);
                        addNewCategory(data.newName.trim(), data.image);
                    }
                    toast.success(`Category "${data.oldName}" updated successfully!`);
                    updateCategoryForm({ categoryToUpdate: "", updatedCategoryName: "", updatedCategoryImage: "" });
                    break;
                    
                case 'delete':
                    if (!data.name) {
                        toast.error("Please select a category to delete");
                        return;
                    }
                    deleteCategory(data.name);
                    toast.success(`Category "${data.name}" deleted successfully!`);
                    updateCategoryForm({ selectedCategoryToDelete: "" });
                    break;
            }
        } catch (error) {
            toast.error(`Failed to ${action} category`);
        } finally {
            updateLoadingState('categoryAction', false);
        }
    };

    const handleSubcategoryAction = async (action, data) => {
        if (!canSubmit(`subcategory_${action}`) || loadingStates.subcategoryAction) return;

        updateLoadingState('subcategoryAction', true);
        
        try {
            switch (action) {
                case 'add':
                    if (!data.category || !data.name.trim()) {
                        toast.error("Please select a category and enter subcategory name");
                        return;
                    }
                    addNewSubcategory(data.category, data.name.trim(), data.image);
                    toast.success(`Subcategory "${data.name}" added successfully!`);
                    updateSubcategoryForm({ newSubcategory: "", newSubcategoryImage: "", selectedCategoryForSub: "" });
                    break;
                    
                case 'update':
                    if (!data.category || !data.oldName || !data.newName.trim()) {
                        toast.error("Please select category, subcategory and enter new name");
                        return;
                    }
                    if (updateSubcategory) {
                        updateSubcategory(data.category, data.oldName, data.newName.trim(), data.image);
                    } else {
                        deleteSubcategory(data.category, data.oldName);
                        addNewSubcategory(data.category, data.newName.trim(), data.image);
                    }
                    toast.success(`Subcategory "${data.oldName}" updated successfully!`);
                    updateSubcategoryForm({ 
                        selectedCategoryForSubUpdate: "", subcategoryToUpdate: "", 
                        updatedSubcategoryName: "", updatedSubcategoryImage: "" 
                    });
                    break;
                    
                case 'delete':
                    if (!data.category || !data.name) {
                        toast.error("Please select both category and subcategory to delete");
                        return;
                    }
                    deleteSubcategory(data.category, data.name);
                    toast.success(`Subcategory "${data.name}" deleted successfully!`);
                    updateSubcategoryForm({ selectedSubcategoryToDelete: "", selectedCategoryForSub: "" });
                    break;
            }
        } catch (error) {
            toast.error(`Failed to ${action} subcategory`);
        } finally {
            updateLoadingState('subcategoryAction', false);
        }
    };

    const handleCategoryChange = (index, value) => {
        updateProduct({ [`category${index}`]: value, [`subcategory${index}`]: '' });
    };

    if (loadingStates.page) {
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

    const ImageUploadField = ({ name, field, value, onUpload, loading, label }) => (
        <div className="space-y-2">
            <label className={labelClass}>{label}</label>
            <input
                type="file"
                name={name}
                onChange={onUpload}
                className="w-full text-sm text-gray-300 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700 file:rounded"
                accept="image/*"
                disabled={loading}
            />
            {loading && (
                <div className="flex items-center text-sm text-gray-400">
                    <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Uploading...
                </div>
            )}
            {value && (
                <div className="relative inline-block">
                    <img src={value} alt="Preview" className="w-20 h-20 object-cover rounded border border-gray-600" />
                    <button
                        type="button"
                        onClick={() => {
                            if (field.startsWith('imgurl')) updateProduct({ [field]: "" });
                            else if (field.includes('category')) updateCategoryForm({ [field]: "" });
                            else updateSubcategoryForm({ [field]: "" });
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );

    const ActionButton = ({ onClick, loading, className, children, disabled = false }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={loading || disabled}
            className={`${buttonClass} ${className} ${(loading || disabled) ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
            {loading && (
                <svg className="animate-spin h-4 w-4 mr-2 inline" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
            )}
            {children}
        </button>
    );

    return (
        <div className="min-h-screen flex flex-col gap-2 items-center justify-center bg-gray-900 p-4">
            {/* Product Form */}
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {id ? 'Update Product' : 'Add Product'}
                    </h2>
                </div>

                <form className="space-y-6" onSubmit={handleProductSubmit}>
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
                                    onChange={(e) => updateProduct({ title: e.target.value })}
                                    className={`${inputClass} w-full`}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Best Selling?</label>
                                <select
                                    onChange={(e) => updateProduct({ bestSell: e.target.value })}
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
                                <ImageUploadField
                                    key={num}
                                    name={`imgurl${num}`}
                                    field={`imgurl${num}`}
                                    value={product[`imgurl${num}`]}
                                    onUpload={createImageUploadHandler(`imgurl${num}`, 'productSubmit')}
                                    loading={false}
                                    label={`Image ${num}`}
                                />
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
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Subcategory {index}</label>
                                        <select
                                            value={product[`subcategory${index}`]}
                                            onChange={(e) => updateProduct({ [`subcategory${index}`]: e.target.value })}
                                            disabled={!product[`category${index}`]}
                                            className={`${inputClass} w-full disabled:bg-gray-600 disabled:text-gray-400`}
                                        >
                                            <option value="">Select Subcategory {index}</option>
                                            {product[`category${index}`] &&
                                                categories[product[`category${index}`]].map((subcategory) => (
                                                    <option key={subcategory} value={subcategory}>{subcategory}</option>
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
                            {[
                                { key: 'features', label: 'Features', placeholder: 'Product Features' },
                                { key: 'specification', label: 'Specification', placeholder: 'Product Specification' },
                                { key: 'description', label: 'Description', placeholder: 'Product Description' }
                            ].map(({ key, label, placeholder }) => (
                                <div key={key}>
                                    <label className={labelClass}>{label}</label>
                                    <textarea
                                        placeholder={placeholder}
                                        value={product[key]}
                                        onChange={(e) => updateProduct({ [key]: e.target.value })}
                                        rows={3}
                                        className={`${inputClass} w-full`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <ActionButton
                        onClick={() => {}}
                        loading={loadingStates.productSubmit}
                        className="w-full bg-primary-600 text-white hover:bg-primary-700"
                        disabled={loadingStates.productSubmit}
                    >
                        {id ? 'Update Product' : 'Add Product'}
                    </ActionButton>
                </form>
            </div>

            {/* Category Management */}
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Category Management</h3>
                
                {/* Management Mode Selector */}
                <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                        {['add', 'update', 'delete'].map((mode) => (
                            <button
                                key={mode}
                                className={`${buttonClass} ${managementMode === mode ? 'bg-primary-600 text-white' : 'bg-gray-600 text-gray-300'} hover:bg-primary-700 capitalize`}
                                onClick={() => {
                                    setManagementMode(mode);
                                    resetForms();
                                }}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Category Management */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-300 capitalize">
                            {managementMode} Categories
                        </h4>
                        
                        {managementMode === 'add' && (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    value={categoryForm.newCategory}
                                    onChange={(e) => updateCategoryForm({ newCategory: e.target.value })}
                                    className={`${inputClass} w-full`}
                                />
                                <ImageUploadField
                                    name="categoryImage"
                                    field="newCategoryImage"
                                    value={categoryForm.newCategoryImage}
                                    onUpload={createImageUploadHandler('newCategoryImage', 'categoryImage')}
                                    loading={loadingStates.categoryImage}
                                    label="Category Image"
                                />
                                <ActionButton
                                    onClick={() => handleCategoryAction('add', {
                                        name: categoryForm.newCategory,
                                        image: categoryForm.newCategoryImage
                                    })}
                                    loading={loadingStates.categoryAction}
                                    className="bg-primary-600 text-white hover:bg-primary-700 w-full"
                                >
                                    Add Category
                                </ActionButton>
                            </div>
                        )}

                        {managementMode === 'update' && (
                            <div className="space-y-3">
                                <select
                                    value={categoryForm.categoryToUpdate}
                                    onChange={(e) => updateCategoryForm({
                                        categoryToUpdate: e.target.value,
                                        updatedCategoryName: e.target.value
                                    })}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select Category to Update</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="New Category Name"
                                    value={categoryForm.updatedCategoryName}
                                    onChange={(e) => updateCategoryForm({ updatedCategoryName: e.target.value })}
                                    className={`${inputClass} w-full`}
                                />
                                <ImageUploadField
                                    name="updatedCategoryImage"
                                    field="updatedCategoryImage"
                                    value={categoryForm.updatedCategoryImage}
                                    onUpload={createImageUploadHandler('updatedCategoryImage', 'updatedCategoryImage')}
                                    loading={loadingStates.updatedCategoryImage}
                                    label="New Category Image (Optional)"
                                />
                                <ActionButton
                                    onClick={() => handleCategoryAction('update', {
                                        oldName: categoryForm.categoryToUpdate,
                                        newName: categoryForm.updatedCategoryName,
                                        image: categoryForm.updatedCategoryImage
                                    })}
                                    loading={loadingStates.categoryAction}
                                    className="bg-blue-600 text-white hover:bg-blue-700 w-full"
                                >
                                    Update Category
                                </ActionButton>
                            </div>
                        )}

                        {managementMode === 'delete' && (
                            <div className="space-y-3">
                                <select
                                    value={categoryForm.selectedCategoryToDelete}
                                    onChange={(e) => updateCategoryForm({ selectedCategoryToDelete: e.target.value })}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select Category to Delete</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <ActionButton
                                    onClick={() => handleCategoryAction('delete', {
                                        name: categoryForm.selectedCategoryToDelete
                                    })}
                                    loading={loadingStates.categoryAction}
                                    className="bg-red-600 text-white hover:bg-red-700 w-full"
                                >
                                    Delete Category
                                </ActionButton>
                            </div>
                        )}
                    </div>

                    {/* Subcategory Management */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-300 capitalize">
                            {managementMode} Subcategories
                        </h4>

                        {managementMode === 'add' && (
                            <div className="space-y-3">
                                <select
                                    value={subcategoryForm.selectedCategoryForSub}
                                    onChange={(e) => updateSubcategoryForm({ selectedCategoryForSub: e.target.value })}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Subcategory Name"
                                    value={subcategoryForm.newSubcategory}
                                    onChange={(e) => updateSubcategoryForm({ newSubcategory: e.target.value })}
                                    className={`${inputClass} w-full`}
                                />
                                <ImageUploadField
                                    name="subcategoryImage"
                                    field="newSubcategoryImage"
                                    value={subcategoryForm.newSubcategoryImage}
                                    onUpload={createImageUploadHandler('newSubcategoryImage', 'subcategoryImage')}
                                    loading={loadingStates.subcategoryImage}
                                    label="Subcategory Image"
                                />
                                <ActionButton
                                    onClick={() => handleSubcategoryAction('add', {
                                        category: subcategoryForm.selectedCategoryForSub,
                                        name: subcategoryForm.newSubcategory,
                                        image: subcategoryForm.newSubcategoryImage
                                    })}
                                    loading={loadingStates.subcategoryAction}
                                    className="bg-primary-600 text-white hover:bg-primary-700 w-full"
                                >
                                    Add Subcategory
                                </ActionButton>
                            </div>
                        )}

                        {managementMode === 'update' && (
                            <div className="space-y-3">
                                <select
                                    value={subcategoryForm.selectedCategoryForSubUpdate}
                                    onChange={(e) => updateSubcategoryForm({
                                        selectedCategoryForSubUpdate: e.target.value,
                                        subcategoryToUpdate: ""
                                    })}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <select
                                    value={subcategoryForm.subcategoryToUpdate}
                                    onChange={(e) => updateSubcategoryForm({
                                        subcategoryToUpdate: e.target.value,
                                        updatedSubcategoryName: e.target.value
                                    })}
                                    disabled={!subcategoryForm.selectedCategoryForSubUpdate}
                                    className={`${inputClass} w-full disabled:bg-gray-600 disabled:text-gray-400`}
                                >
                                    <option value="">Select Subcategory to Update</option>
                                    {subcategoryForm.selectedCategoryForSubUpdate &&
                                        categories[subcategoryForm.selectedCategoryForSubUpdate].map((subcategory) => (
                                            <option key={subcategory} value={subcategory}>{subcategory}</option>
                                        ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="New Subcategory Name"
                                    value={subcategoryForm.updatedSubcategoryName}
                                    onChange={(e) => updateSubcategoryForm({ updatedSubcategoryName: e.target.value })}
                                    className={`${inputClass} w-full`}
                                />
                                <ImageUploadField
                                    name="updatedSubcategoryImage"
                                    field="updatedSubcategoryImage"
                                    value={subcategoryForm.updatedSubcategoryImage}
                                    onUpload={createImageUploadHandler('updatedSubcategoryImage', 'updatedSubcategoryImage')}
                                    loading={loadingStates.updatedSubcategoryImage}
                                    label="New Subcategory Image (Optional)"
                                />
                                <ActionButton
                                    onClick={() => handleSubcategoryAction('update', {
                                        category: subcategoryForm.selectedCategoryForSubUpdate,
                                        oldName: subcategoryForm.subcategoryToUpdate,
                                        newName: subcategoryForm.updatedSubcategoryName,
                                        image: subcategoryForm.updatedSubcategoryImage
                                    })}
                                    loading={loadingStates.subcategoryAction}
                                    className="bg-blue-600 text-white hover:bg-blue-700 w-full"
                                >
                                    Update Subcategory
                                </ActionButton>
                            </div>
                        )}

                        {managementMode === 'delete' && (
                            <div className="space-y-3">
                                <select
                                    value={subcategoryForm.selectedCategoryForSub}
                                    onChange={(e) => updateSubcategoryForm({
                                        selectedCategoryForSub: e.target.value,
                                        selectedSubcategoryToDelete: ""
                                    })}
                                    className={`${inputClass} w-full`}
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <select
                                    value={subcategoryForm.selectedSubcategoryToDelete}
                                    onChange={(e) => updateSubcategoryForm({ selectedSubcategoryToDelete: e.target.value })}
                                    disabled={!subcategoryForm.selectedCategoryForSub}
                                    className={`${inputClass} w-full disabled:bg-gray-600 disabled:text-gray-400`}
                                >
                                    <option value="">Select Subcategory to Delete</option>
                                    {subcategoryForm.selectedCategoryForSub &&
                                        categories[subcategoryForm.selectedCategoryForSub].map((subcategory) => (
                                            <option key={subcategory} value={subcategory}>{subcategory}</option>
                                        ))}
                                </select>
                                <ActionButton
                                    onClick={() => handleSubcategoryAction('delete', {
                                        category: subcategoryForm.selectedCategoryForSub,
                                        name: subcategoryForm.selectedSubcategoryToDelete
                                    })}
                                    loading={loadingStates.subcategoryAction}
                                    className="bg-red-600 text-white hover:bg-red-700 w-full"
                                >
                                    Delete Subcategory
                                </ActionButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrUpdateProductPage;