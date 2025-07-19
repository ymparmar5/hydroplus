import { useContext, useEffect, useState } from "react";
import myContext from "../Context/myContext";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../FireBase/FireBaseConfig";
import Loader from "../Components/Loader";

const ProductInfo = () => {
  const { loading, setLoading } = useContext(myContext);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

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

  return (
    <section className="w-full min-h-[80vh] bg-gray-50 py-8 px-2 md:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {product ? (
          <>
            {/* Image Gallery */}
            <div className="flex flex-col items-center md:w-1/3 gap-4">
              <div className="flex gap-2 mb-2 flex-wrap justify-center">
                {[product?.imgurl1, product?.imgurl2, product?.imgurl3, product?.imgurl4].filter(Boolean).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx+1}`}
                    onClick={() => setMainImage(img)}
                    className={`w-16 h-16 object-cover rounded-lg border-2 cursor-pointer transition-all duration-200 ${mainImage === img ? 'border-blue-700' : 'border-gray-200'}`}
                  />
                ))}
              </div>
              <div className="w-full flex justify-center">
                <img className="w-full max-w-xs h-64 object-contain rounded-xl border border-gray-200 bg-gray-100" src={mainImage} alt="Main" />
              </div>
            </div>
            {/* Product Details */}
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">{product.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Specification:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {product.specification
                      ? product.specification.split("\n").map((specification, index) => (
                          <li key={index}>{specification}</li>
                        ))
                      : <li>No specifications available</li>}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Features:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {product.features
                      ? product.features.split("\n").map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))
                      : <li>No features available</li>}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-red-500 font-semibold">Product not found</p>
        )}
      </div>
      {/* Description Section */}
      <div className="max-w-5xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-4 md:p-8">
        {product ? (
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-2">Description:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {product.description
                ? product.description.split("\n").map((description, index) => (
                    <li key={index}>{description}</li>
                  ))
                : <li>No description available</li>}
            </ul>
          </div>
        ) : (
          <p className="text-center text-red-500 font-semibold">Description not found</p>
        )}
      </div>
    </section>
  );
};

export default ProductInfo;
