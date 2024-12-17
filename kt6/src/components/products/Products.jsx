import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productsSlice';
import './products.scss';

const Products = () => {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.products);
    const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории

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

    const filteredProducts = selectedCategory
        ? categories[selectedCategory] || []
        : Object.values(categories).flat(); // Все продукты, если категория не выбрана

    return (
        <main>
        <div className="productsTitle"><h1>All products</h1></div>
            <div className="sort">
                <label>
                    Select Category:
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {allCategories.map((categoryId) => (
                            <option key={categoryId} value={categoryId}>
                                Category {categoryId}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="containerCard">
                {filteredProducts.map((product) => (
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
    );
};

export default Products;