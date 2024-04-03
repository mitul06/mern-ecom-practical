import { FC, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import TrendingProducts from "./components/TrendingProducts";
import { useAppDispatch } from "../../redux/hooks";
import Banner from "./components/Banner";
import { allProducts } from "../../redux/features/productSlice";
import { TListDefaut } from "../../models/ProductSlice";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let payload: TListDefaut = {
      skip: 0,
      limit: 10,
      sort: 'createdAt',
      sortType: 'desc',
    }
    dispatch(allProducts(payload));
  }, [dispatch])


  return (
    <>
      <HeroSection />
      <Features />
      <TrendingProducts />
      <Banner />
      <br />
    </>
  );
};

export default Home;
