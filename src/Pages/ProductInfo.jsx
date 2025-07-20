import { useContext, useEffect, useState, useRef } from "react";
import myContext from "../Context/myContext";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../FireBase/FireBaseConfig";
import Loader from "../Components/Loader";

const LENS_SIZE = 140; // px
const LENS_ZOOM = 2.2;
const IMG_ZOOM = 1.18; // Main image zoom on hover

const ProductInfo = () => {
  const { loading, setLoading } = useContext(myContext);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showLens, setShowLens] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, imgW: 1, imgH: 1 });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const imgRef = useRef(null);

  const { id } = useParams();

  // getProductData
  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      if (productTemp.exists()) {
        setProduct({ ...productTemp.data(), id: productTemp.id });
        setMainImage(productTemp.data().imgurl1); // Set main image initially
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  // Collect up to 5 images
  const images = [
    product?.imgurl1,
    product?.imgurl2,
    product?.imgurl3,
    product?.imgurl4,
    product?.imgurl5,
  ].filter(Boolean);

  // Lens + Parallax handlers
  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    // Clamp lens inside image
    x = Math.max(LENS_SIZE / 2, Math.min(x, rect.width - LENS_SIZE / 2));
    y = Math.max(LENS_SIZE / 2, Math.min(y, rect.height - LENS_SIZE / 2));
    setLensPos({ x, y, imgW: rect.width, imgH: rect.height });
  };

  const isMobile = () => window.innerWidth < 768;

  // Calculate main image transform for parallax zoom
  const getImgTransform = () => {
    if (!showLens) return 'scale(1)';
    const dx = lensPos.x - (lensPos.imgW / 2);
    const dy = lensPos.y - (lensPos.imgH / 2);
    const moveX = -(dx / lensPos.imgW) * 30; // px
    const moveY = -(dy / lensPos.imgH) * 30; // px
    return `scale(${IMG_ZOOM}) translate(${moveX}px, ${moveY}px)`;
  };

  // Handle star click to open review modal
  const handleStarClick = (idx) => {
    setReviewRating(idx + 1);
    setShowReviewModal(true);
  };

  // Handle review submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // For now, just log the review
    console.log('Review submitted:', { rating: reviewRating, text: reviewText });
    setShowReviewModal(false);
    setReviewText("");
    setReviewRating(0);
    // Optionally, show a toast or success message
  };

  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-br from-black via-gray-900 to-black text-white py-8 px-2 md:px-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start justify-center">
          {/* Left: Thumbnails + Main Image */}
          <div className="w-full max-w-lg lg:max-w-none lg:w-1/2 flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-center mx-auto">
            {/* Thumbnails: horizontal above image on mobile/tablet, vertical on desktop */}
            <div className="w-full lg:w-auto">
              <div className="flex flex-row lg:flex-col gap-4 mb-4 lg:mb-0 justify-center">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx+1}`}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 md:w-24 md:h-24 object-contain rounded-xl border-2 cursor-pointer transition-all duration-200 bg-black p-1 ${mainImage === img ? 'border-primary shadow-lg' : 'border-gray-700'}`}
                  />
                ))}
              </div>
            </div>
            {/* Main Image with magnifier + parallax zoom */}
            <div
              className="relative flex-1 flex items-center justify-center bg-black rounded-2xl border border-gray-800 shadow-xl min-h-[220px] max-h-[420px] w-full max-w-[420px] mx-auto"
              style={{ minWidth: '0' }}
              onMouseEnter={() => { if (!isMobile()) setShowLens(true); }}
              onMouseLeave={() => setShowLens(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                ref={imgRef}
                className="w-full h-auto max-h-[420px] object-contain transition-all duration-300"
                src={mainImage}
                alt="Main"
                draggable={false}
                style={{
                  userSelect: 'none',
                  zIndex: 2,
                  transition: 'transform 0.3s',
                  transform: getImgTransform(),
                }}
              />
              {/* Lens Magnifier */}
              {showLens && (
                <div
                  className="hidden lg:block pointer-events-none absolute z-30 rounded-full border-2 border-primary shadow-2xl"
                  style={{
                    width: LENS_SIZE,
                    height: LENS_SIZE,
                    left: lensPos.x - LENS_SIZE / 2,
                    top: lensPos.y - LENS_SIZE / 2,
                    background: `url(${mainImage}) no-repeat`,
                    backgroundSize: `${(lensPos.imgW || 1) * LENS_ZOOM}px ${(lensPos.imgH || 1) * LENS_ZOOM}px`,
                    backgroundPosition: `-${(lensPos.x * LENS_ZOOM - LENS_SIZE / 2)}px -${(lensPos.y * LENS_ZOOM - LENS_SIZE / 2)}px`,
                    boxShadow: '0 4px 32px 0 rgba(0,0,0,0.4)',
                  }}
                />
              )}
            </div>
          </div>
          {/* Right: Info */}
          <div className="w-full max-w-lg lg:max-w-none flex flex-col gap-4 lg:pl-8 items-center lg:items-start mt-8 lg:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">{product?.title || 'Product Title'}</h1>
            {/* Star rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-gray-600 text-xl">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Rate ${i + 1} star`}
                    onClick={() => handleStarClick(i)}
                    className="focus:outline-none bg-transparent p-0 m-0"
                  >
                    <svg className="w-6 h-6 hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
                    </svg>
                  </button>
                ))}
              </div>
              <span className="text-gray-400 text-base">(0)</span>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Specification */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-primary mb-2">Specification:</h2>
                <ul className="list-disc list-inside text-gray-200 text-base space-y-1">
                  {product?.specification
                    ? product.specification.split("\n").map((specification, index) => (
                        <li key={index}>{specification}</li>
                      ))
                    : <li>No specifications available</li>}
                </ul>
              </div>
              {/* Features */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-primary mb-2">Features:</h2>
                <ul className="list-disc list-inside text-gray-200 text-base space-y-1">
                  {product?.features
                    ? product.features.split("\n").map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))
                    : <li>No features available</li>}
                </ul>
              </div>
            </div>
            <button className="mt-8 bg-primary hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg w-full max-w-xs">Get Quote</button>
          </div>
        </div>
      </div>
      {/* Description Section */}
      <div className="w-full mt-12">
        <div className="bg-white/5 rounded-2xl shadow-2xl p-8 md:p-12 border border-white/10 w-full">
          {product && product.description ? (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Description</h2>
              {product.description.includes('\n') ? (
                <ul className="list-disc list-inside text-gray-200 text-lg space-y-2">
                  {product.description.split("\n").map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-200 text-lg">{product.description}</p>
              )}
            </div>
          ) : (
            <p className="text-center text-red-500 font-semibold">Description not found</p>
          )}
        </div>
      </div>
      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none"
              onClick={() => setShowReviewModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-primary mb-4">Add Your Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Rate ${i + 1} star`}
                    onClick={() => setReviewRating(i + 1)}
                    className="focus:outline-none bg-transparent p-0 m-0"
                  >
                    <svg className={`w-7 h-7 ${reviewRating > i ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
                    </svg>
                  </button>
                ))}
              </div>
              <textarea
                className="w-full rounded-lg border border-gray-300 p-3 mb-4 text-gray-900 focus:outline-primary min-h-[80px]"
                placeholder="Write your review..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                required
              />
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                  onClick={() => setShowReviewModal(false)}
                >Cancel</button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-orange-700"
                >Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductInfo;
 