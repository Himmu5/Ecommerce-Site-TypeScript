import React, { FC } from 'react'
import Button from '../UI-Component/Button';
type P = {}
const HomeTshirtDiscount: FC<P> = () => {
    return <div>
        <div className='bg-fixed bg-mybackground space-y-20 flex justify-between px-4 md:px-20 py-10 md:py-16 '>

            <div className='text-primary flex flex-col space-y-10 bg-transparent font-bold'>
                <div className='space-y-2'>
                    <h1 className='md:text-2xl'>Hurry Up!</h1>
                    <h1 className='md:text-4xl'>Deal of the Day!</h1>
                </div>
                <h1 className='text-xl my-4 '>Buy This T-shirt At 20% Discount, Use Code Off20</h1>
                <Button extraClass='self-start '>SHOP NOW </Button>
            </div>

            <div>

            </div>

        </div>
    </div>
}
export default HomeTshirtDiscount;