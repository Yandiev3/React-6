import './main.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const Main = () => {

    const [user, setUser] = useState(
        {
            name: '',
            email: '',
            number: '',
        })

    return (
        <main>
            <div className="selectionTop">
                <div className="containerST">
                    <div className="stTitle"><h1>Amazing Discounts <br /> on  Garden Products!</h1></div>
                    <div className="stbtn">
                        <button>Check out</button>    
                    </div>
                </div>
            </div> 

            <div className="selectionCategories">
                <div className="categoriesTitle">
                    <h1>Categories</h1>
                    <div className="categorieshr">
                        <div className="chr"><hr /></div>
                        <div className="cp"><Link to={"/Categories"}><p>All categories</p></Link></div>
                    </div>
                </div>

                <div className="categories">
                    <div className="category">
                        <img src="./img/img (1).png" alt="#" />
                        <p>Fertilizer</p>
                    </div>
                    <div className="category">
                        <img src="./img/img (2).png" alt="#" />
                        <p>Protective products and septic tanks</p>
                    </div>
                    <div className="category">
                        <img src="./img/img (3).png" alt="#" />
                        <p>Planting material</p>
                    </div>
                    <div className="category">
                        <img src="./img/img (4).png" alt="#" />
                        <p>Tools and equipment</p>
                    </div>
                </div>

            </div>

            <div className="selectionInput">
                <div className="titleInput">
                    <h>5% off on the first order</h>
                </div>
                <div className="cointainerInput">
                    <div className="imgInput">
                        <img src="./img/sInput.png"/>
                    </div>
                    <div className="feedbackInput">
                        <input
                        type="text"
                        value={user.name}
                        placeholder="Name" Name/>  

                        
                        <input
                        type="tel"
                        value={user.number}
                        placeholder="Phone number"/>

                        <input
                        type="email"
                        value={user.email}
                        placeholder="Email"/>

                        <div className="btnInput">
                            <button> <b>Get a discount</b></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="selectionSale">
                <div className="saleTitle">
                    <h1>Sale</h1>
                    <div className="salehr">
                        <div className="chr2"><hr /></div>
                        <div className="cp"><Link to={"/"}><p>All sales</p></Link></div>
                    </div>

                    <div className="saleProducts">
                        <div className="saleProduct">

                        </div>
                    </div>
                </div>

                <div className="saleItem">
                    <div className="containerSale">
                        <div className="item">
                            <img src=""/>
                                <div className="titleItem">
                                    <p></p>
                                </div>
                                <div className="priceItem">
                                    <h1></h1>
                                    <h2></h2>
                                </div>
                        </div>
                        <div className="item">
                            <img src=""/>
                                <div className="titleItem">
                                    <p></p>
                                </div>
                                <div className="priceItem">
                                    <h1></h1>
                                    <h2></h2>
                                </div>
                        </div>
                        <div className="item">
                            <img src=""/>
                                <div className="titleItem">
                                    <p></p>
                                </div>
                                <div className="priceItem">
                                    <h1></h1>
                                    <h2></h2>
                                </div>
                        </div>
                        <div className="item">
                            <img src=""/>
                                <div className="titleItem">
                                    <p></p>
                                </div>
                                <div className="priceItem">
                                    <h1></h1>
                                    <h2></h2>
                                </div>
                        </div>
                    
                    </div>
                </div>    
            </div>
        </main>
    )
}

export default Main