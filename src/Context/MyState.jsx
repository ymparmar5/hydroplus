import { useState, useEffect } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, addDoc, setDoc } from 'firebase/firestore';
import { fireDB } from "../FireBase/FireBaseConfig";
import toast from 'react-hot-toast';

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [categories, setCategorie] = useState({});
    const [categoryImages, setCategoryImages] = useState({});
    const [subcategoryImages, setSubcategoryImages] = useState({});

    const getAllProductFunction = () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "products"), orderBy('time'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let productArray = [];
                querySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                extractCategories(productArray);
                setLoading(false);
            });
            return unsubscribe;
        } catch (error) {
            console.error("Error fetching products: ", error);
            setLoading(false);
        }
    };

    // Fetch categories and subcategories with images from Firestore
    const getCategoriesFunction = () => {
        try {
            const q = query(collection(fireDB, "categories"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let categoryData = {};
                let categoryImageData = {};
                let subcategoryImageData = {};
                
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    categoryData[data.name] = data.subcategories || [];
                    categoryImageData[data.name] = data.image || '';
                    
                    // Handle subcategory images
                    if (data.subcategoryImages) {
                        subcategoryImageData[data.name] = data.subcategoryImages;
                    }
                });
                
                setCategorie(categoryData);
                setCategoryImages(categoryImageData);
                setSubcategoryImages(subcategoryImageData);
            });
            return unsubscribe;
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };

    const extractCategories = (products) => {
        const categoryMap = {};
        products.forEach(product => {
            const { category1, subcategory1, category2, subcategory2, category3, subcategory3, category4, subcategory4 } = product;
            [category1, category2, category3, category4].forEach((cat, index) => {
                if (cat) {
                    if (!categoryMap[cat]) {
                        categoryMap[cat] = new Set();
                    }
                    const subcat = product[`subcategory${index + 1}`];
                    if (subcat) {
                        categoryMap[cat].add(subcat);
                    }
                }
            });
        });
        const finalCategories = {};
        for (let [category, subcategories] of Object.entries(categoryMap)) {
            finalCategories[category] = Array.from(subcategories);
        }
        // Only update if we don't have categories from Firestore
        if (Object.keys(categories).length === 0) {
            setCategorie(finalCategories);
        }
    };

    const addNewCategory = async (newCategory, categoryImage = '') => {
        try {
            // Add to Firestore
            await setDoc(doc(fireDB, "categories", newCategory), {
                name: newCategory,
                image: categoryImage,
                subcategories: [],
                subcategoryImages: {}
            });

            // Update local state
            setCategorie((prevCategories) => ({
                ...prevCategories,
                [newCategory]: []
            }));

            if (categoryImage) {
                setCategoryImages((prev) => ({
                    ...prev,
                    [newCategory]: categoryImage
                }));
            }
        } catch (error) {
            console.error("Error adding category: ", error);
            toast.error("Failed to add category.");
        }
    };

    const addNewSubcategory = async (category, newSubcategory, subcategoryImage = '') => {
        try {
            const categoryRef = doc(fireDB, "categories", category);
            const currentSubcategories = categories[category] || [];
            const currentSubcategoryImages = subcategoryImages[category] || {};

            await updateDoc(categoryRef, {
                subcategories: [...currentSubcategories, newSubcategory],
                subcategoryImages: {
                    ...currentSubcategoryImages,
                    [newSubcategory]: subcategoryImage
                }
            });

            // Update local state
            setCategorie((prevCategories) => ({
                ...prevCategories,
                [category]: [...prevCategories[category], newSubcategory]
            }));

            if (subcategoryImage) {
                setSubcategoryImages((prev) => ({
                    ...prev,
                    [category]: {
                        ...prev[category],
                        [newSubcategory]: subcategoryImage
                    }
                }));
            }
        } catch (error) {
            console.error("Error adding subcategory: ", error);
            toast.error("Failed to add subcategory.");
        }
    };

    const deleteCategory = async (categoryToDelete) => {
        try {
            await deleteDoc(doc(fireDB, "categories", categoryToDelete));
            
            // Update local state
            const updatedCategories = { ...categories };
            delete updatedCategories[categoryToDelete];
            setCategorie(updatedCategories);

            const updatedCategoryImages = { ...categoryImages };
            delete updatedCategoryImages[categoryToDelete];
            setCategoryImages(updatedCategoryImages);

            const updatedSubcategoryImages = { ...subcategoryImages };
            delete updatedSubcategoryImages[categoryToDelete];
            setSubcategoryImages(updatedSubcategoryImages);
        } catch (error) {
            console.error("Error deleting category: ", error);
            toast.error("Failed to delete category.");
        }
    };

    const deleteSubcategory = async (category, subcategoryToDelete) => {
        try {
            const categoryRef = doc(fireDB, "categories", category);
            const currentSubcategories = categories[category] || [];
            const updatedSubcategories = currentSubcategories.filter(sub => sub !== subcategoryToDelete);
            
            const currentSubcategoryImages = subcategoryImages[category] || {};
            const updatedSubcategoryImages = { ...currentSubcategoryImages };
            delete updatedSubcategoryImages[subcategoryToDelete];

            await updateDoc(categoryRef, {
                subcategories: updatedSubcategories,
                subcategoryImages: updatedSubcategoryImages
            });

            // Update local state
            setCategorie((prevCategories) => ({
                ...prevCategories,
                [category]: updatedSubcategories
            }));

            setSubcategoryImages((prev) => ({
                ...prev,
                [category]: updatedSubcategoryImages
            }));
        } catch (error) {
            console.error("Error deleting subcategory: ", error);
            toast.error("Failed to delete subcategory.");
        }
    };

    useEffect(() => {
        const unsubscribeProducts = getAllProductFunction();
        const unsubscribeCategories = getCategoriesFunction();

        return () => {
            if (unsubscribeProducts) unsubscribeProducts();
            if (unsubscribeCategories) unsubscribeCategories();
        };
    }, []);

    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            categories,
            categoryImages,
            subcategoryImages,
            addNewCategory,
            addNewSubcategory,
            deleteCategory,
            deleteSubcategory,
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;