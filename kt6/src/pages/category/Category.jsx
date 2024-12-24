import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './Category.scss';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.products);
    const [minPrice, setMinPrice] = useState(''); // Состояние для минимальной цены
    const [maxPrice, setMaxPrice] = useState(''); // Состояние для максимальной цены
    const [showDiscounted, setShowDiscounted] = useState(false); // Состояние для отображения товаров со скидкой
    const [sortOrder, setSortOrder] = useState('asc'); // Состояние для сортировки
    const { categoryId } = useParams(); // Получаем categoryId из URL

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === 'loading') {
        return <h1>Loading...</h1>;
    }

    if (status === 'failed') {
        return <h1>Error: {error}</h1>;
    }

    const allCategories = Object.keys(categories);

    const categoryTitles = {
        1: 'Annuals',
        2: 'Nursery',
        3: 'Garden Art',
        4: 'Plant Care',
        5: 'Seasonal',
    };

    const categoryTitle = categoryTitles[categoryId] || `Category ${categoryId}`;

    // Фильтрация по категории из URL
    const filteredProducts = categories[categoryId] || [];

    // Фильтрация по цене
    const filteredByPrice = filteredProducts.filter(product => {
        const price = product.discont_price || product.price;
        return (!minPrice || price >= parseFloat(minPrice)) && (!maxPrice || price <= parseFloat(maxPrice));
    });

    // Фильтрация по скидке
    const filteredByDiscount = showDiscounted
        ? filteredByPrice.filter(product => product.discont_price)
        : filteredByPrice;

    // Сортировка
    const sortedProducts = filteredByDiscount.sort((a, b) => {
        const priceA = a.discont_price || a.price;
        const priceB = b.discont_price || b.price;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    // Функция для сброса фильтров
    const resetFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setShowDiscounted(false);
        setSortOrder('asc');
    };

    return (
        <>
            <Header />
            <main>
                <h1>{categoryTitle}</h1>
                <div className="sort">
                    <div className="filterPrice">
                        <p>Price</p>
                        <input
                            placeholder="from"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            maxLength={6}
                        />
                        <input
                            type="number"
                            maxLength={6}
                            placeholder="to"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                    <div className="filterDiscount">
                        <p>Discounted items</p>
                        <input
                            type="checkbox"
                            checked={showDiscounted}
                            onChange={(e) => setShowDiscounted(e.target.checked)}
                        />
                    </div>

                    <div className="sorted">
                        <p>Sorted</p>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Упал вставай</option>
                            <option value="desc">Встал упал</option>
                        </select>
                    </div>

                    <button className="resetFilters" onClick={resetFilters}>
                        Сбросить баласт
                    </button>
                </div>

                <div className="containerCard">
                    {sortedProducts.map((product) => (
                    <Link to={`/${product.id}`}><div className="itemCard" key={product.id}>
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
                    </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CategoryPage;