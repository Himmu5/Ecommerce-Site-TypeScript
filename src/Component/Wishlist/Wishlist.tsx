import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft, BsHeart } from "react-icons/bs";
import { WishlistContext } from "../Context/Context";
import { Product } from "../CommenType/Types";
import { getProductByIds } from "../Api";
import convertImageUrl from "../../util/Converter";
import Loading from "../Cards/Loading";

const Wishlist: FC = () => {
  const { wishlistItems, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wishlistItems && wishlistItems.length > 0) {
      getProductByIds(wishlistItems.map(String))
        .then((response) => {
          setWishlistProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching wishlist products:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [wishlistItems]);

  if (loading) {
    return <Loading />;
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <BsHeart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save items you love for later by clicking the heart icon.</p>
          <Link 
            to="/AllProducts"
            className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 hover:scale-105 transform"
          >
            <BsArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link 
              to="/AllProducts"
              className="flex items-center text-gray-600 hover:text-red-500 transition-colors duration-200 mr-4"
            >
              <BsArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">Items you've saved for later ({wishlistItems.length})</p>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={convertImageUrl(product.thumbnail)} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                
                {/* Remove from wishlist button */}
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => removeFromWishlist && removeFromWishlist(product.id)}
                    className="bg-white text-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200 shadow-md"
                  >
                    <BsHeart size={16} />
                  </button>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors duration-200">
                  {product.title}
                </h3>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-500 text-sm ml-1">(4.8)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(0)}</span>
                  </div>
                  
                  <Link 
                    to={`/Component/Cards/Card/${product.id}`}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:scale-105 transform"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Wishlist */}
        {wishlistItems.length > 0 && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => {
                wishlistItems.forEach(id => removeFromWishlist && removeFromWishlist(id));
              }}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;