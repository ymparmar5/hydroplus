import { useContext, useEffect, useState, useRef } from "react";
import myContext from "../Context/myContext";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../FireBase/FireBaseConfig";
import Loader from "../Components/Loader";

const LENS_SIZE = 200; // px - Square magnifier size
const LENS_ZOOM = 2.2; // Higher zoom for better detail

const ProductInfo = () => {
  const { loading, setLoading } = useContext(myContext);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, width: 1, height: 1 });
  const [isHovering, setIsHovering] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const imgRef = useRef(null);
  const { id } = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      if (productTemp.exists()) {
        setProduct({ ...productTemp.data(), id: productTemp.id });
        setMainImage(productTemp.data().imgurl1);
      } else {
        console.log("No such Product!");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [id]);

  // Handle window resize for responsive zoom preview
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  const images = [
    product?.imgurl1,
    product?.imgurl2,
    product?.imgurl3,
    product?.imgurl4,
    product?.imgurl5,
  ].filter(Boolean);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Clamp cursor position within image boundaries for smoother zoom
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const clampedY = Math.max(0, Math.min(y, rect.height));

    setCursorPos({
      x: clampedX,
      y: clampedY,
      width: rect.width,
      height: rect.height
    });
  };

  const handleImageClick = () => {
    if (mainImage) {
      window.open(mainImage, '_blank');
    }
  };

  const isMobile = () => window.innerWidth < 768;



  const handleStarClick = (idx) => {
    setReviewRating(idx + 1);
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', { rating: reviewRating, text: reviewText });
    setShowReviewModal(false);
    setReviewText("");
    setReviewRating(0);
  };

  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-br from-black  via-gray-900 to-black text-white py-16 px-16 ">
      <div className="">
        {/* Main Product Layout - 50/50 split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Images Section (50%) */}
          <div className="w-full">
            {/* Mobile thumbnails */}
            <div className="lg:hidden mb-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="group cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border-2 transition-all duration-300 bg-black p-1 shadow-lg ${mainImage === img
                          ? 'border-primary shadow-primary/30 scale-110'
                          : 'border-gray-700 hover:border-gray-500'
                        }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:flex gap-6 items-start">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="group cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={() => setMainImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className={`w-20 h-20 object-cover rounded-xl border-2 transition-all duration-300 bg-black p-1 shadow-lg ${mainImage === img
                          ? 'border-primary shadow-primary/30 scale-110'
                          : 'border-gray-700 hover:border-gray-500'
                        }`}
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div
                className="flex-1 relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden group cursor-zoom-in"
                onMouseEnter={() => { if (!isMobile()) setIsHovering(true); }}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
                style={{ position: 'relative' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6 min-h-[500px] flex items-center justify-center">
                  <img
                    ref={imgRef}
                    className="w-full h-auto max-h-[550px] object-contain transition-all duration-500  cursor-pointer"
                    src={mainImage}
                    alt="Main Product"
                    draggable={false}
                    onClick={handleImageClick}
                    style={{
                      userSelect: 'none',
                      zIndex: 2,
                    }}
                  />

                </div>
              </div>

              {/* Large Zoom Preview - Top Right Section */}
              {isHovering && (
                <div
                  className="absolute top-25 right-24 border-2 border-white/30 rounded-xl overflow-hidden shadow-2xl hidden lg:block bg-white"
                  style={{
                    width: windowWidth > 1400 ? '600px' : '400px',
                    height: windowWidth > 1400 ? '600px' : '400px  ',
                    backgroundImage: `url(${mainImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `${cursorPos.width * LENS_ZOOM}px ${cursorPos.height * LENS_ZOOM}px`,
                    backgroundPosition: `-${cursorPos.x * LENS_ZOOM - (windowWidth > 1400 ? 175 : 140)}px -${cursorPos.y * LENS_ZOOM - (windowWidth > 1400 ? 175 : 140)}px`,
                    transition: 'background-position 0.1s ease-out',
                    zIndex: 50,
                  }}
                >
                  {/* Zoom indicator overlay */}
                  <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    Zoom
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Main Image */}
            <div className="lg:hidden">
              <div
                className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden group cursor-zoom-in"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6 min-h-[400px] md:min-h-[500px] flex items-center justify-center">
                  <img
                    className="w-full h-auto max-h-[450px] md:max-h-[550px] object-contain transition-all duration-500 group-hover:scale-105 cursor-pointer"
                    src={mainImage}
                    alt="Main Product"
                    draggable={false}
                    onClick={handleImageClick}
                    style={{
                      userSelect: 'none',
                      zIndex: 2,
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to zoom
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info Section (50%) */}
          <div className="w-full space-y-8 flex flex-col items-start justify-center ">
            {/* Product Title & Rating */}
            <div className="space-y-4">
              <h1 className="text-lg md:text-lg font-bold text-primary leading-tight">
                {product?.title || 'Product Title'}
              </h1>

              {/* Star Rating */}
              <div className="flex items-center gap-3">
                <div className="flex text-gray-600 text-xl">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Rate ${i + 1} star`}
                      onClick={() => handleStarClick(i)}
                      className="focus:outline-none bg-transparent p-0 m-0 hover:scale-110 transition-transform duration-200"
                    >
                      <svg className="w-7 h-7 hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <span className="text-gray-400 text-lg font-medium">(0 reviews)</span>
              </div>
            </div>

            {/* Specifications & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Specification */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 shadow-lg">
                <h2 className="text-xl  text-primary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Specifications
                </h2>
                <ul className="space-y-2">
                  {product?.specification
                    ? product.specification.split("\n").map((specification, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-200">
                        <span className="text-primary ">•</span>
                        <span>{specification}</span>
                      </li>
                    ))
                    : <li className="text-gray-400 italic">No specifications available</li>}
                </ul>
              </div>

              {/* Features */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 shadow-lg">
                <h2 className="text-lg  text-primary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Features
                </h2>
                <ul className="space-y-2">
                  {product?.features
                    ? product.features.split("\n").map((feature, index) => (
                      <li key={index} className="flex items-start gap-2  text-sm text-gray-200">
                        <span className="text-primary ">•</span>
                        <span>{feature}</span>
                      </li>
                    ))
                    : <li className="text-gray-400 italic">No features available</li>}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="w-full self-center bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white py-2 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Quote
              </button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="m-16">
          <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl shadow-2xl p-8 md:p-12 border border-white/10 backdrop-blur-sm">
            {product && product.description ? (
              <div>
                <h2 className="text-lg  text-primary mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  Product Description
                </h2>
                {product.description.includes('\n') ? (
                  <ul className="space-y-3">
                    {product.description.split("\n").map((desc, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-200 text-sm">
                        <span className="text-primary ">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-200 text-lg leading-relaxed">{product.description}</p>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-500 font-semibold text-lg">Description not found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative transform transition-all duration-300 scale-100">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none transition-colors"
              onClick={() => setShowReviewModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg  text-primary mb-6">Add Your Review</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Rate ${i + 1} star`}
                    onClick={() => setReviewRating(i + 1)}
                    className="focus:outline-none bg-transparent p-0 m-0 hover:scale-110 transition-transform"
                  >
                    <svg className={`w-8 h-8 ${reviewRating > i ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  </button>
                ))}
              </div>
              <textarea
                className="w-full rounded-xl border border-gray-300 p-4 text-gray-900 focus:outline-primary focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
                placeholder="Write your review..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                required
              />
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-orange-700 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductInfo;
