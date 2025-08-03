import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../Context/myContext";
import Loader from "../Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../FireBase/FireBaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;

    const navigate = useNavigate();

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', id));
            toast.success('Product Deleted successfully');
            getAllProductFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className="relative">
            {/* Animated Background for Table */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s'}}></div>
                <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '7s', animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{animationDuration: '10s', animationDelay: '3s'}}></div>
            </div>
            {loading && (
                <div className="loader-container">
                    <Loader />
                </div>
            )}
            <div className="w-full overflow-x-auto mb-5 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-secondary-white">
                <table className="w-full min-w-[600px] border border-primary/30 bg-secondary-white text-secondary-black rounded-xl overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-primary text-secondary-white">
                            <th className="py-3 px-4 font-semibold text-left">S.No.</th>
                            <th className="py-3 px-4 font-semibold text-left">Image</th>
                            <th className="py-3 px-4 font-semibold text-left">Title</th>
                            <th className="py-3 px-4 font-semibold text-left" colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllProduct.map((item, index) => {
                            const { id, title, category, imgurl1 } = item;
                            return (
                                <tr key={index} className="border-b border-primary/10 hover:bg-primary/10 transition-colors">
                                    <td className="py-2 px-4 font-medium">{index + 1}</td>
                                    <td className="py-2 px-4">
                                        <div className="flex justify-center">
                                            <img src={imgurl1} alt={title} className="w-16 h-16 object-cover rounded shadow border border-primary/20" />
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">{title}</td>
                                    <td className="py-2 px-2 flex gap-2 items-center">
                                        <button
                                            className="bg-primary hover:bg-primary-700 text-secondary-white px-4 py-1 rounded font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
                                            onClick={() => navigate(`/AddProductPage/${id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-secondary-black hover:bg-primary text-primary hover:text-secondary-white px-4 py-1 rounded font-semibold border border-primary shadow transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
                                            onClick={() => deleteProduct(id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;
