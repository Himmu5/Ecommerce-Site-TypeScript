import React, { FC } from 'react'
type P = {}
const HomeLovedDesign: FC<P> = () => {
    return <div>
        <div className=' my-10 p-8 sm:flex gap-5 md:max-w-6xl mx-auto text-primary'>

            <div className='flex flex-col gap-2 text-center '>
                <img src="https://trycasuals.com/wp-content/uploads/2020/01/image-01-1.jpg" alt="" />
                <h1>Most Loved Designs</h1>
                <h1 className='font-bold text-xl'>Customize Your T-Shirts</h1>
            </div>

            <div className='flex flex-col gap-2 text-center my-10 sm:my-0'>
                <h1>Design of the Week</h1>
                <h1 className='font-bold text-xl'>Rubber Print Your T-Shirt</h1>
                <img src="https://trycasuals.com/wp-content/uploads/2020/01/image-03-1.jpg" alt="" />
            </div>

            <div className='flex flex-col gap-2 text-center'>
                <img src="https://trycasuals.com/wp-content/uploads/2020/01/image-02-1.jpg" alt="" />
                <h1>New T-shirt Edition</h1>
                <h1 className='font-bold text-xl'>Customize Plain Colors</h1>
            </div>

        </div>
    </div>
}
export default HomeLovedDesign;