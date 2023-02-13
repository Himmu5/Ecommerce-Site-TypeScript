import React, { FC } from 'react'
import Button from '../UI-Component/Button';
type P = {}
const HomeHeader: FC<P> = () => {
    return <div>
        <div className='sm:flex gap-10 py-10 p-4  '>


            <div className=' text-primary flex flex-col gap-3  justify-center sm:w-1/2 sm:px-10 md:space-y-5'>
                <div className='border-b-4 border-red-400 self-start w-20 '></div>
                <h1 className=' font-bold text-md '>Best Quality Products</h1>

                <h1 className='font-bold text-3xl md:text-5xl xl:text-6xl sm:flex flex-col '>We Print What <span> You Want!</span></h1>
                <h1 className='text-md'> Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien</h1>
                <Button extraClass='self-start my-8'>GET STARTED</Button>
            </div>

            <div className='1/2 py-5 sm:py-0'>
                <img src="https://trycasuals.com/wp-content/uploads/2019/06/image26-free-1.png" alt="" />
            </div>
        </div>
    </div>
}
export default HomeHeader;