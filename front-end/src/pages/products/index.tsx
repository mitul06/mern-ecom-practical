import { FC, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../models/Product";
import { allCategories } from "../../redux/features/categorySlice";
import { TListDefaut } from "../../models/BrandSlice";
import { allProducts } from "../../redux/features/productSlice";
import { allBrands } from "../../redux/features/brandSlice";

const AllProducts: FC = () => {
  const sortRef = useRef<HTMLSelectElement>(null);
  const dispatch = useAppDispatch();

  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [price, setPrice] = useState('');


  const allProductsData = useAppSelector(
    (state) => state.productReducer.allProducts
  );
  const allCategoriesData = useAppSelector(
    (state) => state.cetegoryReducer.allCategories
  );
  const allBrandsData = useAppSelector(
    (state) => state.brandReducer.allBrands
  );

  useEffect(() => {
    let payload: TListDefaut = {
      skip: 0,
      limit: 10,
      sort: 'createdAt',
      sortType: 'desc',
    }


    if (allProductsData?.length === 0) dispatch(allProducts(payload))
    if (allCategoriesData?.length === 0) dispatch(allCategories(payload))
    if (allBrandsData?.length === 0) dispatch(allBrands(payload))

  }, [dispatch]);

  useEffect(() => {
    setCurrentProducts(allProductsData);
  }, [allProductsData]);

  useEffect(() => {
    if (category !== "all") {
      const updated = allProductsData.filter((pro) => pro?.category?.title === category);
      setCurrentProducts(updated);
    }
  }, [category, allProductsData]);

  useEffect(() => {
    if (brand !== "all") {
      const updated = allProductsData.filter((pro) => pro?.brand?.title === brand);
      setCurrentProducts(updated);
    }
  }, [brand, allProductsData]);

  const sortProducts = (sortValue: string) => {
    if (sortValue === "asc") {
      setCurrentProducts(
        [...currentProducts].sort((a, b) => {
          return a?.price - b?.price;
        })
      );
    } else if (sortValue === "desc") {
      setCurrentProducts(
        [...currentProducts].sort((a, b) => {
          return b?.price - a?.price;
        })
      );
    } else {
      setCurrentProducts(allProductsData);
    }
  };

  const handleClearFilter = () => {
    setCurrentProducts(allProductsData);
    setCategory('all');
    setBrand('all');
    setPrice('')
  }

  const handlePriceChange = (event: any) => {
    setPrice(event.target.value);

    if (price) {
      const updated = allProductsData.filter((pro) => pro.price.toString() <= price);
      setCurrentProducts(updated);
    }
  };

  return (
    <div className="container mx-auto min-h-[83vh] p-4 font-karla">
      <div className="grid grid-cols-5 gap-1">
        <div className="col-span-1">
          <div className="flex justify-end mr-6 mb-3" > <span className="bg-blue-200 px-2 cursor-pointer" onClick={handleClearFilter} >x Clear all</span></div>

          <div>
            <h1 className="font-bold mb-2">Categories</h1>
            <hr />
            <div className="space-y-1">
              {allCategoriesData.map((_category) => (
                <div
                  key={_category?._id}
                  className={`cursor-pointer hover:text-blue-500 ${_category?.title === category ? "text-blue-500" : ""
                    }`}
                  onClick={() => {
                    setCategory(_category?.title);
                    if (sortRef && sortRef.current)
                      sortRef.current.value = "default";
                    sortProducts("default");
                  }}
                >
                  {_category?.title}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <h1 className="font-bold mb-2">Brands</h1>
            <hr />
            <div className="space-y-1">
              {allBrandsData.map((_brand) => (
                <div
                  key={_brand?._id}
                  className={`cursor-pointer hover:text-blue-500 ${_brand?.title === brand ? "text-blue-500" : ""
                    }`}
                  onClick={() => {
                    setBrand(_brand?.title);
                    if (sortRef && sortRef.current)
                      sortRef.current.value = "default";
                    sortProducts("default");
                  }}
                >
                  {_brand?.title}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <h1 className="font-bold mb-2">Price</h1>
            <hr />
            <div className="space-y-1">
              <input
                type="range"
                className="w-full mt-4"
                max="100"
                value={price}
                onChange={handlePriceChange}
              />
              <div className="flex justify-between">
                <span>0</span>
                <span>{price}</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </div>


        <div className="col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-lg">
              <span>Products</span>
              <span> {">"} </span>
              <span className="font-bold">{category}</span>
            </div>
            <select
              ref={sortRef}
              className="border border-black rounded p-1"
              onChange={(e) => sortProducts(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="asc">Price (low to high)</option>
              <option value="desc">Price (high to low)</option>
            </select>
          </div>
          <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
