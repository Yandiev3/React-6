import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Sale from '../../components/sale/Sale'; // Импортируем компонент

const AllSales = () => {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === 'loading') {
        return <h1>Loading...</h1>;
    }

    if (status === 'failed') {
        return <h1>Error: {error}</h1>;
    }

    // Получаем все товары
    const allProducts = Object.values(categories).flat();

    // Получаем все категории
    const allCategories = [...new Set(allProducts.map(product => product.category))];

    return (
        <>
            <Header />
            <main>
                <Sale products={allProducts} categories={allCategories} />
            </main>
            <Footer />
        </>
    );
};

export default AllSales;