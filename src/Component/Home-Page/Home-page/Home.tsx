import { FC } from 'react'
import HomeFeaturedProduct from './HomeFeaturedProduct';
import HomeHeader from './HomeHeader';
import HomeLovedDesign from './HomeLovedDesign';
import HomeTshirtDiscount from './HomeTshirtDiscount';
import { useHomePageProducts } from '../hooks/useHomePageProducts';
import Loading from '../../Cards/Loading';

type P = {}

const Home: FC<P> = () => {
    const { featuredProducts, lovedProducts, loading } = useHomePageProducts();

    if (loading) {
        return <Loading />;
    }

    // Convert Product objects to the format expected by HomeFeaturedProduct
    const featuredProductsFormatted = featuredProducts.map(product => ({
        img: product.thumbnail,
        category: product.category,
        title: product.title,
        price: product.price
    }));

    const lovedProductsFormatted = lovedProducts.map(product => ({
        img: product.thumbnail,
        category: product.category,
        title: product.title,
        price: product.price
    }));

    return <div className='  '>
        <HomeHeader />
        <HomeLovedDesign />

        <HomeFeaturedProduct heading='Our Featured Products' products={featuredProductsFormatted} />
        <HomeTshirtDiscount />

        <HomeFeaturedProduct heading='Most Loved Products' products={lovedProductsFormatted} />


    </div>
}
export default Home;