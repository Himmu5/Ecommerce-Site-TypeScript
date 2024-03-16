import React, { FC } from 'react'
type P = {}
const HomeLovedDesign: FC<P> = () => {
    return <div>
        <div className=' my-10 p-8 sm:flex gap-5 md:max-w-6xl mx-auto text-primary'>

            <div className='flex flex-col gap-2 text-center '>
                <img src="https://cdn.dummyjson.com/product-images/2/thumbnail.jpg" alt="" />
                <h1>Most Loved Designs</h1>
                <h1 className='font-bold text-xl'>iPhone X</h1>
            </div>

            <div className='flex flex-col gap-2 text-center my-10 sm:my-0'>
                <h1>Design of the Week</h1>
                <h1 className='font-bold text-xl'>Samsung Universe 9</h1>
                <img src="https://cdn.dummyjson.com/product-images/3/thumbnail.jpg" alt="" />
            </div>

            <div className='flex flex-col gap-2 text-center'>
                <img src="https://cdn.dummyjson.com/product-images/4/thumbnail.jpg" alt="" />
                <h1>New T-shirt Edition</h1>
                <h1 className='font-bold text-xl'>OPPOF19</h1>
            </div>

        </div>
    </div>
}
export default HomeLovedDesign;