import './categorie.scss'
import { Link } from 'react-router-dom'
import categories from './main/Main.jsx'

const limitedCategories = categories.slice(0, 5);

const Categorie = ()=> {
    return(
        <main>
            <div className="selectionCategories">
                <div className="categoriesTitle">
                    <h1>Categories</h1>
                </div>
                    <div className="categories">
                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            {limitedCategories.map(category => (
                                <div className="categorys" key={category.id}>
                                    <img src={category.image} alt={category.title} />
                                    <p>{category.title}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Categorie