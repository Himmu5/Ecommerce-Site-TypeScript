import React, { useEffect, useState, FC, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SingleProduct } from "../Api";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import DataNotFound from "../Error-Component/DataNotFound";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Helmet } from "react-helmet";
import { memo } from "react";
import { withCart } from "../Provider/WithProvider";
import { Product } from '../CommenType/Types'
import convertImageUrl from "../../util/Converter";

type CardType = {
  addToCart: (num1: number, num2: number) => void;
};

const Card: FC<CardType> = ({ addToCart }) => {
  const id = useParams().id;
  const [product, setproduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [count, setcount] = useState(1);
  const Navigation = useNavigate();

  function HandleAddToCart() {
    if (id) {
      addToCart(+id, count);
      setcount(1);
    }

  }

  useEffect(() => {
    let token = SingleProduct(id);
    token
      .then((response) => {
        setproduct(response.data);
        setLoading(true);
      })
      .catch(function () {
        setproduct(undefined);
        setLoading(false);
      });
  }, [id]);
  console.log(loading);

  function handleOnChangeCartVal(e: ChangeEvent<HTMLInputElement>) {
    setcount(+e.target.value);
  }

  return product ? (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{product.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="YogiJiCart.com -Shop Here" />
        <meta
          property="og:description"
          content="This is our e-commerce site we have a large category of products like clothing, shoes, Electronics"
        />
      </Helmet>



      <div className="bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => Navigation(-1)}
            className="mb-6 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors duration-200"
          >
            <IoMdArrowRoundBack className="text-2xl" />
          </button>

          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-500">
            <span>Home / {product.category} / {product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={convertImageUrl(product?.thumbnail)}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900">
                {product.title}
              </h1>

              {/* Price */}
              <div className="text-2xl font-bold text-gray-900">
                ${product.price}.00
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={() => setcount(Math.max(1, count - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-16 px-3 py-2 text-center border-0 focus:ring-0 focus:outline-none"
                    min={1}
                    value={count}
                    onChange={handleOnChangeCartVal}
                  />
                  <button 
                    onClick={() => setcount(count + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={HandleAddToCart}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Add To Cart
                </button>
              </div>

              {/* Category */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">
                  Category: <span className="text-red-500 font-medium">{product.category}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            <Link to={"/Component/Cards/Card/" + (+product.id - 1)}>
              {+product.id > 1 && (
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-200">
                  Previous
                </button>
              )}
            </Link>
            <Link to={"/Component/Cards/Card/" + (+product.id + 1)}>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-200">
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : loading ? (
    <Loading />
  ) : (
    <DataNotFound />
  );
};

export default withCart(memo(Card));
