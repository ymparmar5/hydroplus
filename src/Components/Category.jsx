import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { fireDB } from "../FireBase/FireBaseConfig";
import { getAuth } from "firebase/auth";
import { ArrowRight, Sparkles, Zap, ChevronRight } from "lucide-react";

const Category = () => {
    const [category, setCategory] = useState([]);
    const [role, setRole] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user?.email) {
            // setRole("admin");
        }
    }, [user]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        
        return () => observer.disconnect();
    }, []);

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

    const getGridClasses = () => {
        const count = category.length;
        if (count <= 2) return "grid-cols-1 sm:grid-cols-2";
        if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
        if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        if (count === 5) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
        if (count === 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
        if (count === 7 || count === 8) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        if (count === 9) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    };

    return (
        <section className="w-full relative bg-gradient-to-br from-black via-gray-900 to-black pt-6 pb-12 md:pt-8 md:pb-16 overflow-hidden">
            <style jsx>{`
                @import url("https://fonts.cdnfonts.com/css/mona-sans");
                
                .glassmorphic-card {
                    position: relative;
                    width: 100%;
                    height: 500px;
                    border-radius: 16px;
                    background: #191919aa;
                    background: linear-gradient(180deg, #292929aa 0%, #191919cc 50%);
                    backdrop-filter: blur(4px);
                    box-shadow: inset 0 2px 2px 0 #e7c4a088, inset 0 -2px 2px 0 #0003;
                    color: #ccc;
                    text-shadow: 1px 1px 3px #333a;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    justify-content: end;
                    font-family: "Mona-Sans", "Mona Sans", sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .glassmorphic-card:hover {
                    transform: scale(1.02);
                }
                
                .glassmorphic-card h2 {
                    margin: 8px 0;
                    font-size: 1.1em;
                    color: #ccc;
                }
                
                .glassmorphic-card p {
                    margin: 8px 0;
                    font-size: 0.9em;
                    font-weight: 800;
                    color: #aaa;
                }
                
                .glassmorphic-button {
                    width: fit-content;
                    border-radius: 100px;
                    padding: 8px 36px;
                    margin-top: 12px;
                    background: #fff2;
                    box-shadow: 0 0 0 1px #fff3, inset 120px 0 100px -100px #000c, 0 0 0 0 #fff1;
                    transition: box-shadow 0.4s ease-in-out;
                    cursor: pointer;
                }
                
                .glassmorphic-button:hover {
                    box-shadow: 0 0 0 1px #fff3, inset 200px 0px 100px -100px #000a, -4px 0 8px 2px #fff2;
                }
                
                .glassmorphic-card img {
                    position: absolute;
                    top: 32px;
                    left: 0;
                    right: 0;
                    width: 80%;
                    margin: auto;
                    object-fit: contain;
                    user-select: none;
                    pointer-events: none;
                }
                
                .accents {
                    user-select: none;
                    pointer-events: none;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                }
                
                .acc-card {
                    width: calc(100% + 10px);
                    height: calc(100% + 10px);
                    background: #eee1;
                    opacity: 0.8;
                    z-index: -1;
                    position: absolute;
                    left: -5px;
                    top: -5px;
                    border-radius: 16px;
                    box-shadow: inset 0 2px 2px 0 #e0c9b266, inset 0 -2px 2px 0 #0004;
                    backdrop-filter: blur(4px);
                    transition: all 0.1s linear;
                    transform-origin: 20% 80%;
                }
                
                .acc-card:nth-child(1) {
                    animation: wobble 18s ease-in-out infinite;
                }
                
                .acc-card:nth-child(2) {
                    animation: wobble 22s ease-in-out -6s infinite reverse;
                }
                
                .acc-card:nth-child(3) {
                    animation: wobble 26s ease-in-out -18s infinite;
                }
                
                .light {
                    --bgref: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 487 487'%3E%3Ccircle cx='243' cy='243.5' r='233' style='fill:none; opacity:.1; stroke:%23aaa; stroke-linecap:round; stroke-miterlimit:10; stroke-width:18px;'/%3E%3Ccircle cx='243.5' cy='243.5' r='243' style='fill:none; stroke:%23111; stroke-linecap:round; stroke-miterlimit:10;'/%3E%3Ccircle cx='243' cy='243.5' r='222' style='fill:none; stroke:%23111; stroke-linecap:round; stroke-miterlimit:10;'/%3E%3Cpath d='m10,243.5C10,114.82,114.32,10.5,243,10.5' style='fill:none; stroke:%23ddd; stroke-linecap:round; stroke-miterlimit:10; stroke-width:18px;'/%3E%3C/svg%3E");
                    position: absolute;
                    left: 0;
                    right: calc(0% + 300px);
                    top: 264px;
                    margin: auto;
                    width: 164px;
                    height: 164px;
                    z-index: -2;
                    background-image: var(--bgref);
                    animation: rotate360 22s linear infinite;
                }
                
                .light::before,
                .light::after {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    background-image: var(--bgref);
                    filter: blur(3px);
                    scale: 1.01;
                }
                
                .light::after {
                    filter: blur(8px);
                }
                
                .light.sm {
                    width: 100px;
                    height: 100px;
                    left: calc(0% + 300px);
                    right: 0;
                    top: 142px;
                    bottom: 0;
                    animation: rotate360 18s linear -10s infinite;
                }
                
                .top-light {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: -42px;
                    margin: auto;
                    width: 284px;
                    height: 6px;
                    border-radius: 10px;
                    background: #fffef9;
                    box-shadow: 0 0px 1px 1px #ffc78e, 0 1px 2px 1px #ff942977, 0 2px 6px 1px #e98b2d77, 0 4px 12px 0px #ff9e3d99, 0 12px 20px 12px #ff800044;
                }
                
                @keyframes rotate360 {
                    to {
                        rotate: 360deg;
                    }
                }
                
                @keyframes wobble {
                    0% {
                        transform: translateX(10px) translateY(20px) rotate(-3deg) scale(1);
                    }
                    20% {
                        transform: translateX(-44px) translateY(-8px) rotate(6deg) scale(1.02);
                    }
                    60% {
                        transform: translateX(32px) translateY(18px) rotate(-8deg) scale(1);
                    }
                    80% {
                        transform: translateX(-42px) translateY(-22px) rotate(12deg) scale(0.94);
                    }
                    100% {
                        transform: translateX(10px) translateY(20px) rotate(-3deg) scale(1);
                    }
                }
                
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
                
                @keyframes fade-in-up {
                    0% { 
                        opacity: 0; 
                        transform: translateY(40px) scale(0.95); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px); 
                    }
                    50% { 
                        transform: translateY(-20px); 
                    }
                }
                
                @keyframes float-delayed {
                    0%, 100% { 
                        transform: translateY(0px); 
                    }
                    50% { 
                        transform: translateY(-30px); 
                    }
                }
                
                @keyframes float-slow {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px); 
                    }
                    33% { 
                        transform: translateY(-15px) translateX(10px); 
                    }
                    66% { 
                        transform: translateY(10px) translateX(-10px); 
                    }
                }
                
                .animate-slide-up { 
                    animation: slide-up 0.8s ease-out; 
                }
                
                .animate-fade-in-up { 
                    animation: fade-in-up 0.8s ease-out forwards; 
                }
                
                .animate-float { 
                    animation: float 8s ease-in-out infinite; 
                }
                
                .animate-float-delayed { 
                    animation: float-delayed 10s ease-in-out infinite 2s; 
                }
                
                .animate-float-slow { 
                    animation: float-slow 12s ease-in-out infinite 4s; 
                }
            `}</style>

            <div className="absolute inset-0">
                <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/4 rounded-full blur-3xl animate-float-slow"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb,249,115,22),0.03)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
                <div className="text-center mb-12">
                    <div className={`inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-6 py-3 border border-primary/30 mb-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                        <h1 className="text-sm sm:text-sm md:text-lg lg:text-3xl xlg:text-3lg font-bold text-white animate-slide-up">
                            Featured <span className="text-primary">Categories</span>
                        </h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    <div className={`grid gap-6 md:gap-12 ${getGridClasses()}`}>
                        {category.map((item, index) => {
                            const isLastOddItem = category.length % 2 === 1 && index === category.length - 1;

                            return (
                                <div
                                    key={item.id}
                                    className={`relative ${isLastOddItem ? "sm:col-span-2 sm:mx-auto lg:col-span-1" : ""} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div
                                        className="glassmorphic-card"
                                        onClick={() => handleCategoryClick(item.name)}
                                    >
                                        <img src={item.image} alt={item.name} />
                                        <h2>{item.name}</h2>
                                        <div className="glassmorphic-button">Get Started</div>

                                        {role === "admin" && (
                                            <div className="absolute top-2 right-2 z-30">
                                                <input
                                                    className="w-20 text-xs p-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded cursor-pointer text-white"
                                                    type="file"
                                                    onChange={(e) => handleImageUpload(e, index)}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="accents">
                                        <div className="acc-card"></div>
                                        <div className="acc-card"></div>
                                        <div className="acc-card"></div>
                                        <div className="light"></div>
                                        <div className="light sm"></div>
                                        <div className="top-light"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`text-center mt-12 transition-all duration-1000 delay-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/25 flex items-center gap-3 mx-auto group">
                        <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <p className="text-sm sm:text-md md:text-md lg:text-2xl xlg:text-md font-bold text-white">View All Categories</p>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Category;