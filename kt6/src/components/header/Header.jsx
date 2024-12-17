import './header.scss'
import { Link } from 'react-router-dom'
const Header = () => {
    return(
    <header>
        <div className="containerHeader">
            <div className="mainHeader">
                <div className="logo">
                    <Link to={"/"}><img src="./img/logo.png" alt="#"/></Link>
                </div>
                <div className="navMenu">
                    <nav>
                        <ul>
                            <li>
                                <Link to={"/"}>Main Page</Link>
                            </li>
                            <li>
                                <Link to={"/categories"}>Categories                            </Link>
                            </li>
                            <li>
                                <Link to={"/Allproducts"}>All products</Link>
                            </li>
                            <li>
                                <Link to={"/"}>All sales</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="basket">
                    <Link to={"/basket"}><img src="./img/basket=empty.png" alt="#"/></Link>
                </div>
            </div>
        </div>
    </header>
    )
}

export default Header