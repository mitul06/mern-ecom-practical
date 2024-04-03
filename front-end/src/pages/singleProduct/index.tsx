import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, setCartState } from "../../redux/features/cartSlice";
import { Product } from "../../models/Product";
import RatingStar from "../../components/RatingStar";
import PriceSection from "../../components/PriceSection";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { addToWishlist, getProductById, removeToWishlist } from "../../redux/features/productSlice";
import useToggle from "../../hooks/useToggel";

const lorem =
  "It is important to take care of the patient, to be followed by the patient, but it will happen at such a time that there is a lot of work and pain. For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come forth; they are in fault who abandon their duties and soften their hearts, that is, their labors.";

const SingleProduct: FC = () => {
  const dispatch = useAppDispatch();

  const { productID }: any = useParams();

  const selectedProduct = useAppSelector(state => state.productReducer.viewProduct);
  const wishlist = useAppSelector(state => state.productReducer.wishlist);

  const [product, setProduct] = useState<Product>();
  const [selectedImg, setSelectedImg] = useState<string>();

  const showToast = useToggle()
  const { requireAuth } = useAuth();

  useEffect(() => {
    dispatch(getProductById(productID))
  }, [productID]);

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct)
      setSelectedImg(selectedProduct?.images?.length ? selectedProduct?.images[0] : '')
    }
  }, [selectedProduct])

  const addCart = () => {
    requireAuth(() => {
      if (product)
        dispatch(
          addToCart(product)
        );


      showToast('success', "item added to cart successfully");
    });
  };

  const buyNow = () => {
    requireAuth(() => {
      if (product)
        dispatch(
          addToCart(
            product
          )
        );
      dispatch(setCartState(true));
    });
  };

  const addWishlist = () => {
    requireAuth(() => {
      if (product) {
        dispatch(addToWishlist(product));
        showToast('success', 'item added to your wishlist')
      }
    });
  };

  const removeWishlist = () => {
    requireAuth(() => {
      if (product) {
        dispatch(removeToWishlist(product));
        showToast('success', 'item removed to your wishlist')
      }
    });
  };

  const isProductInWishlist = wishlist?.some((wish) => wish._id === productID);

  return (
    <div className="container mx-auto pt-8">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 px-4 font-karla">
        <div className="space-y-2">
          <img src={selectedImg} alt="selected" className="h-80" />
          <div className="flex space-x-1 items-center">
            {product?.images &&
              product?.images.map((_img) => (
                <img
                  src={_img}
                  key={_img}
                  alt="thumb"
                  className={`w-12 cursor-pointer hover:border-2 hover:border-black ${_img === selectedImg ? "border-2 border-black" : ""
                    }`}
                  onClick={() => setSelectedImg(_img)}
                />
              ))}
          </div>
        </div>
        <div className="px-2">
          <h2 className="text-2xl">{product?.title}</h2>
          {product?.rating && <RatingStar rating={product?.rating} />}

          <div className="mt-1">
            <PriceSection
              price={product?.price ? product?.price : 0}
            />
          </div>

          <table className="mt-2">
            <tbody>
              <tr>
                <td className="pr-2 font-bold">Brand</td>
                <td>{product?.brand?.title}</td>
              </tr>
              <tr>
                <td className="pr-2 font-bold">Category</td>
                <td>{product?.category?.title}</td>
              </tr>
              <tr>
                <td className="pr-2 font-bold">Stock</td>
                <td>{product?.stock}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <h2 className="font-bold">About the product</h2>
            <p className="leading-5">
              {product?.description} {lorem}
            </p>
          </div>
          <div className="flex flex-wrap items-center mt-4 mb-2 space-x-2">
            <button
              type="button"
              className="flex items-center space-x-1 mb-2 hover:bg-pink-700 text-white p-2 rounded bg-pink-500"
              onClick={addCart}
            >
              <AiOutlineShoppingCart />
              <span>ADD TO CART</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-1 mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              onClick={buyNow}
            >
              <FaHandHoldingDollar />
              <span>BUY NOW</span>
            </button>

            {
              !isProductInWishlist ?
                <button
                  type="button"
                  className="flex items-center space-x-1 mb-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700"
                  onClick={addWishlist}
                >
                  <MdFavoriteBorder />
                  <span>ADD TO WISHLIST</span>
                </button>
                :
                <button
                  type="button"
                  className="flex items-center space-x-1 mb-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700"
                  onClick={removeWishlist}
                >
                  <MdFavorite />
                  <span>REMOVE TO WISHLIST</span>
                </button>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
