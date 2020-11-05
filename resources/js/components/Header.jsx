import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <nav className="header">
            <div className="header__logo"></div>
            <div className="header__search">
                <input type="search" name="query" id="query" />
            </div>
            <div className="header__links">
                <ul>
                    <Link>
                        <li>Return to Store</li>
                    </Link>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
