import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header({ assetPath }) {
    const [username, setUsername] = useState("admin");
    const [searchResults, setSearchResults] = useState(null);
    const [searchIsActive, setSearchIsActive] = useState(false);
    const searchInputRef = useRef(null);

    const SEARCH_ENDPOINT = "/api/products/?search=";
    const DEFAULT_RESULT_ITEM = {
        product_name: "Search product",
        category_name: "Any Category",
        brand_name: "Brand"
    };
    const ITEM_NOT_FOUND = {
        product_name: "Not found",
        category_name: "Any Category",
        brand_name: "Brand"
    };

    const activateSearch = e => {
        // TODO: USE A LIBRARY TO DISPOSE A DIV WHEN FOCUS IS OUTSIDE
        const target = e.target;
        if (!target.matches("input")) {
            setSearchIsActive(false);
            return;
        }
        setSearchIsActive(true);
    };

    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const later = () => {
                debounceTimer = null;
                func();
            };
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(later, delay);
        };
    };

    const fetchSearchItems = () => {
        const search = searchInputRef.current.value;
        if (search.length < 3) {
            // console.log("query is too short");
            return;
        }

        axios.get(`${SEARCH_ENDPOINT}${search}`).then(
            response => {
                setSearchResults(response.data);
            },
            error => alert(`Oops! An error ${error} occured.`)
        );
    };

    return (
        <nav>
            <div className="header pd-10 container">
                <div className="header__logo">
                    <img
                        src={`${assetPath}images/Logo.png`}
                        alt="GHI Trading logo"
                    />
                </div>
                <div
                    className="header__search"
                    onClick={e => activateSearch(e)}
                >
                    <input
                        type="search"
                        name="query"
                        id="query"
                        placeholder="Search products"
                        ref={searchInputRef}
                        onInput={debounce(fetchSearchItems, 250)}
                    />
                    {searchIsActive && (
                        <SearchResult>
                            {!searchResults ? (
                                <Link to={`/`}>
                                    <ResultItem product={DEFAULT_RESULT_ITEM} />
                                </Link>
                            ) : searchResults.length === 0 ? (
                                <Link to={`/`}>
                                    <ResultItem product={ITEM_NOT_FOUND} />
                                </Link>
                            ) : (
                                searchResults.map((product, index) => {
                                    return (
                                        <Link to={`/`} key={`product#${index}`}>
                                            <ResultItem product={product} />
                                        </Link>
                                    );
                                })
                            )}
                            {/* {searchResults.length === 0 ? (
                                <Link to={`/`}>
                                    <ResultItem product={DEFAULT_RESULT_ITEM} />
                                </Link>
                            ) : (
                                searchResults.map((product, index) => {
                                    return (
                                        <Link>
                                            <ResultItem
                                                product={product}
                                                key={`product#${index}`}
                                            />
                                        </Link>
                                    );
                                })
                            )} */}
                        </SearchResult>
                    )}
                    <button type="button">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="header__user">
                    <div>
                        <p>{username.toUpperCase().charAt(0)}</p>
                    </div>
                </div>
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
