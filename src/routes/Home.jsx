
import HeroSection from "../components/pages/HomePage/HeroSection";
import CategorySection from "../components/pages/HomePage/CategorySection";
import BrandSection from "../components/pages/HomePage/BrandSection";
import FeaturedSection from "../components/pages/HomePage/FeaturedSection";
import { Fetchdata } from "../components/hooks/Fetchdata";
import ShimmerUI from "../components/UI/ShimmerUI";
const Home = () => {
 const { data, isLoading, isError } = Fetchdata({ categoryOverride: "featured" });
 const items=data?.items||[]
  return (
    <>
      <HeroSection />
      <BrandSection />
      <CategorySection />

     {isLoading ? (
        <ShimmerUI />
      ) : isError ? (
        <p className="text-center text-red-500 font-medium my-10 py-10">
          Error: Failed to load featured products.
        </p>
      ) : (
        <FeaturedSection items={items} />
      )}
     
    </>
  );
};

export default Home;
