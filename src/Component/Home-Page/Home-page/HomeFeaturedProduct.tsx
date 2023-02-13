import React, { FC, useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'

type P = {
    heading:string;
    products:{
        img: string;
        category: string;
        title: string;
        price: number;
    }[]
}

const HomeFeaturedProduct: FC<P> = ({heading, products}) => {

    return <div className=' text-primary my-10  flex justify-center flex-col items-center ' >

        <h1 className='font-bold text-xl my-5 text-center md:text-3xl'>{heading}</h1>

        <p className='border-b-4 border-red-500  self-center w-16'></p>

        <div className='grid grid-cols-2 gap-4 justify-center sm:justify-start p-4 sm:flex flex-wrap sm:gap-4 sm:px-10 my-5'>
            {
                products.map((product) => {
                    return <div className='space-y-1'>
                        <img src={product.img} className=" sm:max-w-sxs " alt="" />
                        <p className='text-sm text-gray-400 '>{product.category}</p>
                        <p className='font-bold '>{product.title}</p>
                        <div className='flex gap-1 text-red-500 '>
                            {
                                [...Array(5).keys()].map(() => {
                                    return <AiOutlineStar />
                                })
                            }
                        </div>
                        <p className='text-sm font-bold '>${product.price}.00</p>
                    </div>
                })
            }
        </div>

    </div>
}
export default HomeFeaturedProduct;