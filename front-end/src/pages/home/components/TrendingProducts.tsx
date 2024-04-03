import { useAppSelector } from "../../../redux/hooks";
import ProductList from "../../../components/ProductList";

const TrendingProducts = () => {
  const featuredProducts = useAppSelector(
    (state) => state.productReducer.allProducts
  );

  return <ProductList title="Trending Products" products={featuredProducts} />;
};

export default TrendingProducts;
