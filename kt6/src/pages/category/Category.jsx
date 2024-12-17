import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './Category.scss';
const CategoryPage = () => {
    const { categoryId } = useParams(); // Получаем categoryId из URL
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


    const categoryTitles = {
        1: 'Annuals',
        2: 'Nursery',
        3: 'Garden Art',
        4: 'Plant Care',
    };

    const categoryTitle = categoryTitles[categoryId] || `Category ${categoryId}`;

    const products = categories[categoryId] || [];

    return (
        <>
        <Header/>
        <main>
        <h1>{categoryTitle}</h1>
        <div className="containerCard">
                {products.map((product) => (
                    <div className="itemCard" key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <div className="titleItemCard">
                            <p>{product.title}</p>
                        </div>
                        <div className="priceItem">
                            {product.discont_price ? (
                                <>
                                    <h1>${product.discont_price}</h1>
                                    <h2><s>${product.price}</s></h2>
                                </>
                            ) : (
                                <h1>${product.price}</h1>
                            )}
                        </div>
                        {product.discont_price && (
                            <div className="discountBlock">
                                <span>
                                    -{Math.round(((product.price - product.discont_price) / product.price) * 100)}% 
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </main>
        <Footer/>
        </>
    );
};

export default CategoryPage;