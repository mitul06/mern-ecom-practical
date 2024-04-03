import { FC } from "react";

const PriceSection: FC<{ price: number }> = ({
  price,
}) => {
  return <h2 className="font-medium text-blue-500 text-xl">${price}</h2>;
};

export default PriceSection;
