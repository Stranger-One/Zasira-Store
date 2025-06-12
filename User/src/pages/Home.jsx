import { useEffect } from "react";
import {
  FeaturedCategories,
  FeaturedProducts,
  HomeSlider,
  NewArrivals,
  PopularProducts,
} from "../components";


const Home = () => {


  return (
    <div>
      <HomeSlider />
      <FeaturedCategories />
      <PopularProducts />
      <NewArrivals />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
