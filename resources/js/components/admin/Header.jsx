import React, { useState } from "react";
import SearchBar from "./SeachBar";

function Header({ assetPath }) {
    const [username, setUsername] = useState("admin");

    return (
        <nav className="header">
            <div className="header__main">
                <div className="header__container">
                    <div className="header__logo">
                        <img
                            src={`${assetPath}images/Logo.png`}
                            alt="GHI Trading logo"
                        />
                    </div>
                    <div className="header__link">
                        <div>
                            <p>Sign Out</p>
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 192 512"
                                >
                                    <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__secondary flex-center">
                <SearchBar />
            </div>
        </nav>
    );
}

function SearchResult(props) {
    return <div className="result">{props.children}</div>;
}

function ResultItem({ product }) {
    return (
        <div className="result__item">
            <div>
                <span className="result__name">{product.product_name}</span>
                <span className="result__brand">{product.brand_name}</span>
            </div>
            <div>
                <span className="result__category">
                    in {product.category_name}
                </span>
            </div>
        </div>
    );
}

export default Header;
