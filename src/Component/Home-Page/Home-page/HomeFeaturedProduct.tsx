import React, { FC, useState } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { BsHeart, BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import convertImageUrl from '../../../util/Converter'

type P = {
    heading: string;
    products: {
        img: string;
        category: string;
        title: string;
        price: number;
    }[]
}

const HomeFeaturedProduct: FC<P> = ({ heading, products }) => {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

    return (
        <div className='bg-gray-50 py-16'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-12'>
                    <h1 className='font-bold text-3xl md:text-4xl text-gray-900 mb-4'>{heading}</h1>
                    <div className='w-20 h-1 bg-red-500 mx-auto rounded-full'></div>
                    <p className='text-gray-600 mt-4 max-w-2xl mx-auto'>
                        Discover our carefully curated collection of premium products designed to meet your needs
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {products.map((product, index) => (
                        <div 
                            key={index} 
                            className='group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden'
                            onMouseEnter={() => setHoveredProduct(index)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <div className='relative overflow-hidden'>
                                <img 
                                    src={convertImageUrl(product.img)} 
                                    alt={product.title}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                                
                                {/* Overlay with actions */}
                                <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center`}>
                                    <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2`}>
                                        <button className="bg-white text-gray-700 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200">
                                            <BsHeart size={16} />
                                        </button>
                                        <button className="bg-white text-gray-700 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200">
                                            <BsEye size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Category badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        {product.category}
                                    </span>
                                </div>

                                {/* Sale badge */}
                                {index % 3 === 0 && (
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            Sale
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className='p-4'>
                                <h3 className='font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-red-500 transition-colors duration-200'>
                                    {product.title}
                                </h3>
                                
                                <div className='flex items-center gap-1 mb-3'>
                                    {[...Array(5)].map((_, i) => (
                                        <AiFillStar key={i} className="text-yellow-400 text-sm" />
                                    ))}
                                    <span className="text-gray-500 text-sm ml-1">(4.8)</span>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center space-x-2'>
                                        <span className='text-2xl font-bold text-gray-900'>${product.price}</span>
                                        <span className='text-sm text-gray-500 line-through'>${(product.price * 1.2).toFixed(0)}</span>
                                    </div>
                                    
                                    <Link 
                                        to={`/Component/Cards/Card/${index + 1}`}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:scale-105 transform"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='text-center mt-12'>
                    <Link 
                        to="/AllProducts"
                        className="inline-flex items-center px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200 hover:scale-105 transform"
                    >
                        View All Products
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default HomeFeaturedProduct;