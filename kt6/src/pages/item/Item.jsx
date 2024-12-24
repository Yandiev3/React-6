import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./item.scss";
const Item = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получаем все продукты из Redux
  const products = useSelector((state) => state.products.categories);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Загружаем данные продукта по ID
        const response = await fetch(`http://localhost:3333/products/${productId}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data); // Сохраняем продукт в локальное состояние
      } catch (err) {
        setError(err.message); // Обрабатываем ошибку
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    // Проверяем, есть ли продукт в Redux
    const productFromRedux = Object.values(products).flat().find((item) => item.id === parseInt(productId));
    if (productFromRedux) {
      setProduct(productFromRedux); // Если продукт есть в Redux, используем его
      setLoading(false);
    } else {
      fetchProduct(); // Иначе загружаем продукт с сервера
    }
  }, [productId, products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
        <Header />
        <main>
        <div className="containerTovar">
            <div className="imageTovar">
            <img src={product.image} alt={product.title} />
            </div>
            <div className="overviewTovar">
            <h3>{product.title}</h3>
            <div className="priceTovar">
                {product.discont_price ? (
                <>
                    <span className="newPrice">${product.discont_price}</span>
                    <span className="oldPrice">${product.price}</span>
                </>
                ) : (
                <span className="newPrice">${product.price}</span>
                )}
            </div>
            
            <div className="descriptionTovar">
                <h4>Description</h4>
            <p>{product.description}</p>
            </div>
            </div>
        </div>
        </main>
    <Footer />
    </div>
  );
};

export default Item;