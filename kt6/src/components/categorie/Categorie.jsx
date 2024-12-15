import './categorie.scss'
import { Link } from 'react-router-dom'

const Categorie = ()=> {
    return(
        <main>
            <div className="selectionCategories">
                <div className="categoriesTitle">
                    <h1>Categories</h1>
                </div>

                <div className="categorie">
                    <div className="categorys">
                        <img src="./img/img (1).png" alt="#" />
                        <p>Fertilizer</p>
                    </div>
                    <div className="categorys">
                        <img src="./img/img (2).png" alt="#" />
                        <p>Protective products and septic tanks</p>
                    </div>
                    <div className="categorys">
                        <img src="./img/img (3).png" alt="#" />
                        <p>Planting material</p>
                    </div>
                    <div className="categorys">
                        <img src="./img/img (4).png" alt="#" />
                        <p>Tools and equipment</p>
                    </div>
                    <div className="categorys">
                        <img src="./img/img (5).png" alt="#" />
                        <p>Pots and planters</p>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Categorie