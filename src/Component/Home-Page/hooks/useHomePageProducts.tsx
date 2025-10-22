import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../Api';
import { Product } from '../../CommenType/Types';

export const useHomePageProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [lovedProducts, setLovedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Load beauty products for featured section
        const beautyResponse = await getAllProducts(4, 0, '', 'beauty');
        setFeaturedProducts(beautyResponse.data.products);

        // Load grocery products for loved section
        const groceryResponse = await getAllProducts(4, 0, '', 'groceries');
        setLovedProducts(groceryResponse.data.products);

        setLoading(false);
      } catch (error) {
        console.error('Failed to load home page products:', error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { featuredProducts, lovedProducts, loading };
};
