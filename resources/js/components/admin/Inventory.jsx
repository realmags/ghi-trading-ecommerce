import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Inventory() {
    const [categories, setCategories] = useState([]);
    const CATEGORIES_ENDPOINT = "/api/categories/";

    useEffect(() => {
        axios.get(CATEGORIES_ENDPOINT).then(
            response => {
                setCategories(response.data);
            },
            error => alert(error)
        );
    }, []);

    return (
        <section className="inventory">
            <div className="inventory__title">
                <h3>Inventory</h3>
            </div>
            <div className="inventory__cardholder">
                {(function() {
                    if (categories.length === 0) {
                        return (
                            <CategoryCard
                                category={{ name: "Category" }}
                                count={1}
                            />
                        );
                    }
                    return categories.map((category, index) => (
                        <CategoryCard
                            category={category}
                            count={++index}
                            key={`category-${index}`}
                        />
                    ));
                })()}
            </div>
        </section>
    );
}

function CategoryCard({ category, count }) {
    return (
        // todo: add link tag
        <div className="category">
            <div className="category__card">
                <span className="category__count">{count}</span>
                <h3 className="category__name">{category.category_name}</h3>
                <span className="category__action">
                    <p>View Products</p>
                </span>
            </div>
        </div>
    );
}

export default Inventory;
