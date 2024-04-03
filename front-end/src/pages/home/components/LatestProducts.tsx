import { useAppSelector } from "../../../redux/hooks";
import ProductList from "../../../components/ProductList";

const LatestProducts = () => {
  const newProducts = useAppSelector(
    (state) => state.productReducer.newProducts
  );

  return <ProductList title="New Arrivals" products={newProducts} />;
};

export default LatestProducts;
