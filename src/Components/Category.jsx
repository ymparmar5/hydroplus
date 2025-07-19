import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { fireDB } from "../FireBase/FireBaseConfig";
import { getAuth } from "firebase/auth";

const Category = () => {
    const [category, setCategory] = useState([]);
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user?.email) {
            setRole("admin");
        }
    }, [user]);

    // Fetch categories from Firestore
    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(fireDB, "categories"));
            const categoryList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategory(categoryList);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Upload image to Cloudinary and update Firestore
    const handleImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!user) {
            alert("You must be logged in to upload images.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "category"); // Replace with your Cloudinary upload preset

            const response = await fetch("https://api.cloudinary.com/v1_1/dn5vvxkra/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!data.secure_url) throw new Error("Cloudinary upload failed");
            console.log("Cloudinary Image URL:", data.secure_url);

            // Update Firestore with Cloudinary Image URL
            const categoryRef = doc(fireDB, "categories", category[index].id);
            await setDoc(categoryRef, { ...category[index], image: data.secure_url });

            // Refresh categories
            fetchCategories();
            console.log("Image uploaded & URL stored in Firestore successfully.");
        } catch (error) {
            console.error("Image upload failed", error);
        }
    };

    const handleCategoryClick = (name) => {
        navigate(`/shop?category=${name}`);
    };

    return (
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-white to-blue-50">
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Featured Categories</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-2">
                {category.map((item, index) => (
                    <div key={item.id} className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                        <div onClick={() => handleCategoryClick(item.name)} className="flex flex-col items-center w-full">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 border-2 border-blue-700 flex items-center justify-center bg-gray-50">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <h1 className="text-lg font-semibold text-gray-900 mb-1 text-center">{item.name}</h1>
                            <p className="text-blue-500 text-sm font-medium">View more..</p>
                        </div>
                        {role === "admin" && (
                            <input
                                className="w-32 text-xs p-1 mt-2 border border-gray-300 rounded cursor-pointer"
                                type="file"
                                onChange={(e) => handleImageUpload(e, index)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Category;