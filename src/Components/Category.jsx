import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { fireDB } from "../FireBase/FireBaseConfig";
import { getAuth } from "firebase/auth";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";

const Category = () => {
    const [category, setCategory] = useState([]);
    const [role, setRole] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState(null);
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
            formData.append("upload_preset", "category");

            const response = await fetch("https://api.cloudinary.com/v1_1/dn5vvxkra/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!data.secure_url) throw new Error("Cloudinary upload failed");

            const categoryRef = doc(fireDB, "categories", category[index].id);
            await setDoc(categoryRef, { ...category[index], image: data.secure_url });

            fetchCategories();
        } catch (error) {
            console.error("Image upload failed", error);
        }
    };

    const handleCategoryClick = (name) => {
        navigate(`/shop?category=${name}`);
    };

    return (
        <section className="w-full relative bg-gradient-to-br from-black via-gray-900 to-black pt-6 pb-12 md:pt-8 md:pb-16 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-6 py-3 border border-primary/30 mb-6">
                        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                        <span className="text-primary font-semibold text-sm">Premium Selection</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-up">
                        Featured <span className="text-primary">Categories</span>
                    </h1>

                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {category.map((item, index) => (
                        <div 
                            key={item.id} 
                            className={`group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-500 cursor-pointer overflow-hidden ${
                                hoveredIndex === index ? 'scale-105' : 'scale-100'
                            }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => handleCategoryClick(item.name)}
                        >
                            {/* Hover Effect Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Image Container */}
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-primary/50 transition-all duration-500 bg-gradient-to-br from-white/10 to-white/5">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                    </div>
                                    
                                    {/* Floating Icon */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                                        <Star className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="text-center">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4">
                                        Premium quality solutions
                                    </p>
                                    
                                    {/* CTA Button */}
                                    <div className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                                        <span className="text-sm">Explore</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>

                            {/* Admin Upload (if admin) */}
                            {role === "admin" && (
                                <div className="absolute top-2 right-2 z-20">
                                    <input
                                        className="w-20 text-xs p-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded cursor-pointer text-white"
                                        type="file"
                                        onChange={(e) => handleImageUpload(e, index)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/25 flex items-center gap-3 mx-auto group">
                        <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>View All Categories</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide-up {
                    0% { 
                        opacity: 0; 
                        transform: translateY(30px); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                .animate-slide-up { 
                    animation: slide-up 0.8s ease-out; 
                }
            `}</style>
        </section>
    );
};

export default Category;