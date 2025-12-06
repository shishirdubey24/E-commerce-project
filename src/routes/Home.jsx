import { useSelector } from "react-redux";
import { HomeDataMap } from "../components/hooks/HomeDataMap";
import HeroSection from "../components/pages/HomePage/HeroSection";
import CategorySection from "../components/pages/HomePage/CategorySection";
import BrandSection from "../components/pages/HomePage/BrandSection";
import FeaturedSection from "../components/pages/HomePage/FeaturedSection";
const Home = () => {
  const items = useSelector((store) => store.items || []);
 

  return (
    <main>
      <HeroSection />
      <BrandSection />
      <CategorySection />

      <HomeDataMap />
            <FeaturedSection items={items} />
     
    </main>
  );
};

export default Home;
