import { FC } from "react";
import { Product } from "../models/Product";
import RatingStar from "./RatingStar";
import { addToCart } from "../redux/features/cartSlice";
import { useAppDispatch } from "../redux/hooks";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import PriceSection from "./PriceSection";
import useAuth from "../hooks/useAuth";
import useToggle from "../hooks/useToggel";

const ProductCard: FC<Product> = ({
  _id,
  price,
  thumbnail,
  title,
  category,
  rating,
  brand,
  description,
  images,
  stock
}) => {
  const dispatch = useAppDispatch();

  const showToast = useToggle()
  const { requireAuth } = useAuth();

  const addCart = () => {
    requireAuth(() => {
      dispatch(
        addToCart({
          _id,
          price,
          title,
          category,
          rating,
          thumbnail,
          brand,
          description,
          images,
          stock
        })
      );
      showToast('success', "item added to cart successfully");
    });
  };

  return (
    <div className="border border-gray-200 font-lato" data-test="product-card">
      <div className="text-center border-b border-gray-200">
        <Link to={{ pathname: `/product/${_id}` }}>
          <img src={thumbnail} alt={title} className="inline-block h-60" />
        </Link>
      </div>
      <div className="px-8 pt-4">
        <p className="text-gray-500 text-[14px] font-medium">{category?.title}</p>
        <Link
          className="font-semibold hover:underline"
          to={{ pathname: `/product/${_id}` }}
        >
          {title}
        </Link>
      </div>
      <div className="px-8">
        <RatingStar rating={rating} />
      </div>
      <div className="flex items-center justify-between px-8 pb-4">
        <PriceSection price={price} />
        <button
          type="button"
          className="flex items-center space-x-2 hover:bg-blue-500 text-white py-2 px-4 rounded bg-pink-500"
          onClick={addCart}
          data-test="add-cart-btn"
        >
          <AiOutlineShoppingCart />
          <span>ADD TO CART</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
