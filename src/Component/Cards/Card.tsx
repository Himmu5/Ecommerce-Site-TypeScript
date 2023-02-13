import React, { useEffect, useState, FC ,ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { SingleProduct } from "../Api";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import DataNotFound from "../Error-Component/DataNotFound";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Helmet } from "react-helmet";
import { memo } from "react";
import { withCart } from "../../Provider/WithProvider";
import { Product } from '../CommenType/Types'

type CardType = {
  addToCart: (num1: number, num2: number) => void;
};

const Card: FC<CardType> = ({ addToCart }) => {
  const id = useParams().id;
  const [product, setproduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [count, setcount] = useState(1);

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

  function handleOnChangeCartVal(e:ChangeEvent<HTMLInputElement>){
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

      

      <div className="flex flex-col max-w-5xl mx-auto mt-5 mb-10 px-5 sm:px-0 bg-white shadow-md">
        <Link
          to="/"
          className="self-start pl-1 pr-1 pt-1 pb-1 m-1 sm:m-2 hover:bg-blue-500  bg-red-400  rounded-full  "
        >
          <IoMdArrowRoundBack className="text-3xl text-white " />
        </Link>

        <div className="  flex flex-col ">
          <div>
            <div className="sm:flex sm:gap-10 p-3 space-y-3 sm:space-y-0 sm:p-16 sm:pt-5 sm:pb-5">
              <div className=" aspect-square">
                <img
                  src={product.thumbnail}
                  alt=""
                  className="h-full w-full object-cover sm:shadow-md "
                />
              </div>

              <div className="text-gray-700 space-y-5 sm:w-1/2">
                <p className="text-gray-400 text-sm">
                  Home / {product.category} / {product.title}
                </p>
                <h1 className="text-4xl">{product.title}</h1>
                <p className="text-xl font-bold">${product.price}.00</p>
                <p>{product.description}</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="w-12 pl-1 pr-1 pt-1 pb-1 border rounded-md"
                    min={1}
                    value={count}
                    onChange={handleOnChangeCartVal}
                    id=""
                  />
                  <button
                    className="pl-4 pr-4 pt-1 pb-1 rounded-md bg-red-400 text-white hover:bg-red-500"
                    onClick={HandleAddToCart}
                  >
                    Add To Cart
                  </button>
                </div>
                <hr />
                <p>
                  Category:
                  <span className="text-red-400">{product.category}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-between sm:pl-16 sm:pr-16 max-w-6xl mx-auto pl-3 pr-3 pb-5 pt-5">
              <Link to={"/Component/Cards/Card/" + (+product.id - 1)}>
                {+product.id > 1 && (
                  <button className="pl-4 pr-4 pt-2 pb-2 text-white bg-red-400 hover:bg-blue-400 rounded-md">
                    Previous
                  </button>
                )}
              </Link>
              <Link to={"/Component/Cards/Card/" + (+product.id + 1)}>
                <button className="pl-4 pr-4 pt-2 pb-2 text-white bg-red-400 hover:bg-blue-400 rounded-md">
                  Next
                </button>
              </Link>
            </div>
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
