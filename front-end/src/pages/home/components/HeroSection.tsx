import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { Product } from "../../../models/Product";
import { formattedCurrency } from "../../../utils/handlers";

const HeroSection: FC = () => {

  const productsList = useAppSelector((state) => state.productReducer.allProducts)

  const selectedProduct: Product | null = productsList?.length > 0 ? productsList[1] : null

  return (
    <div className="bg-[#e3edf6] font-lora">
      <div className="container px-4 grid md:grid-cols-2 py-8 mx-auto">
        <div className="flex items-center">
          <div className="max-w-[450px] space-y-4">
            <p className="text-black">
              Starting At <span className="font-bold">{formattedCurrency(selectedProduct?.price)}</span>
            </p>
            <h2 className="text-black font-bold text-4xl md:text-5xl">
              {selectedProduct?.title || '-'}
            </h2>
            <h3 className="text-2xl">
              Exclusive offer <span className="text-red-600">-10%</span> off
              this week
            </h3>
            <Link
              to={`/product/${selectedProduct?._id}`}
              data-test="hero-btn"
              className="inline-block bg-white rounded-md px-6 py-3 hover:bg-blue-500 hover:text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div>
          <img src={selectedProduct?.thumbnail} alt="hero" className="ml-auto" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
