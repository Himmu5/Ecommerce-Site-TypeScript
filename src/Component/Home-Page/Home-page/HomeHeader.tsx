import React, { FC } from 'react'
import { Link } from 'react-router-dom';
type P = {}
const HomeHeader: FC<P> = () => {
    return <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center">
        <div className='sm:flex gap-20 py-20 p-6 max-w-7xl mx-auto w-full'>
            <div className='text-primary flex flex-col gap-8 justify-center sm:w-2/5 sm:px-8 md:px-12 lg:px-16'>
                <div className='flex items-center gap-3'>
                    <div className='border-b-4 border-red-500 self-start w-16 h-1 rounded-full'></div>
                    <span className='text-red-500 font-semibold text-sm uppercase tracking-wider'>Premium Quality</span>
                </div>
                
                <h2 className='font-bold text-lg text-gray-700'>Best Quality Products</h2>

                <h1 className='font-bold text-3xl md:text-4xl xl:text-5xl leading-tight text-gray-900 '>
                    We Print What <span className='text-red-500'>You Want!</span>
                </h1>
                
                <p className='text-base text-gray-600 leading-relaxed max-w-lg'>
                    Transform your ideas into reality with our premium printing services. 
                    High-quality materials, fast delivery, and exceptional customer service.
                </p>
                
                <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                    <Link 
                        to="/AllProducts" 
                        className='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group relative overflow-hidden'
                    >
                        <div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
                        <span className='relative z-10 whitespace-nowrap'>GET STARTED</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    
                    <button className='bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group relative'>
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className='whitespace-nowrap'>Learn More</span>
                    </button>
                </div>
                
                <div className='flex items-center gap-6 mt-6'>
                    <div className='text-center'>
                        <div className='text-lg font-bold text-gray-900'>10K+</div>
                        <div className='text-xs text-gray-600'>Happy Customers</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-lg font-bold text-gray-900'>99%</div>
                        <div className='text-xs text-gray-600'>Satisfaction Rate</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-lg font-bold text-gray-900'>24/7</div>
                        <div className='text-xs text-gray-600'>Support</div>
                    </div>
                </div>
            </div>

            <div className='sm:w-4/5 py-5 sm:py-0 relative'>
                <div className='relative group'>
                    <img 
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1540&q=80" 
                        alt="Modern workspace with laptop and coffee" 
                        className="rounded-2xl shadow-2xl w-full h-auto group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl'></div>
                </div>
                
                {/* Floating elements for visual interest */}
                <div className='absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce'>
                    <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                </div>
                
                <div className='absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg animate-pulse'>
                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
}
export default HomeHeader;