import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";
import { getCategories } from "./controller";

function InventorySection() {
    const [categories, setCategories] = useState(null);
    const CATEGORIES_ENDPOINT = "/api/categories/";
    const NO_CATEGORY = {
        category_id: "#",
        category_name: "NULL"
    };
    const DEFAULT_CATEGORY = {
        category_id: "#",
        category_name: "Loading..."
    };

    useEffect(() => {
        const awaitCategories = async () => {
            try {
                const categories = await getCategories({
                    method: "get",
                    url: "api/categories"
                });
                setCategories(categories.data);
            } catch (error) {
                console.error(error);
            }
        };
        awaitCategories();
    }, []);

    return (
        <section className="inventory">
            <div className="section-title">
                <h3>Inventory</h3>
            </div>
            <div className="max-view">
                {(function() {
                    if (!categories)
                        return <CategoryCard category={DEFAULT_CATEGORY} />;
                    if (categories.length === 0) {
                        return <CategoryCard category={NO_CATEGORY} />;
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
    const { url } = useRouteMatch();
    return (
        // todo: add link tag
        <div className="card category">
            <Link to={`${url}/products/category/${category.category_id}`}>
                <div className="category__card">
                    <span className="category__count">{count}</span>
                    <h3 className="category__name">{category.category_name}</h3>
                    <span className="category__action">
                        <p>View Products</p>
                    </span>
                </div>
            </Link>
        </div>
    );
}

export default InventorySection;
