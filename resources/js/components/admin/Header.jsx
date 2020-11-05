import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <nav className="header">
            <div className="header__logo"></div>
            <div className="header__search">
                <input
                    type="search"
                    name="query"
                    id="query"
                    placeholder="Search products"
                />
            </div>
            <div className="header__link">
                <Link to="/">
                    <p>Sign Out</p>
                </Link>
            </div>
        </nav>
    );
}

export default Header;
