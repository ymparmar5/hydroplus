import HeroSection from '../Components/HeroSection';
import Category from '../Components/Category';
import HomeProductCard from '../Components/HomeProductCard';




const Home = () => {
    


    return (
        <main className="min-h-screen w-full flex flex-col gap-8 bg-white">
            <HeroSection />
            <Category />
        </main>
    );

};


export default Home;

