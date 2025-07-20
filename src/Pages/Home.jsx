import HeroSection from '../Components/HeroSection';
import Category from '../Components/Category';
import CustomerReviews from '../Components/CustomerReviews';
import Footer from '../Components/Footer';
import HomeProductCard from '../Components/HomeProductCard';

const Home = () => {
    return (
        <main className="min-h-screen w-full flex flex-col bg-black">
            <HeroSection />
            <Category />
            <CustomerReviews />
        </main>
    );
};

export default Home;

