import { FC } from 'react'
import HomeFeaturedProduct from './HomeFeaturedProduct';
import HomeHeader from './HomeHeader';
import HomeLovedDesign from './HomeLovedDesign';
import HomeTshirtDiscount from './HomeTshirtDiscount';
import { products, LovedProduct } from '../UI-Data/HomeFeaturedProduct';

type P = {}

const Home: FC<P> = () => {

    return <div className='  '>
        <HomeHeader />
        <HomeLovedDesign />

        <HomeFeaturedProduct heading='Our Featured Products' products={products} />
        <HomeTshirtDiscount />

        <HomeFeaturedProduct heading='Most Loved Products' products={LovedProduct} />


    </div>
}
export default Home;