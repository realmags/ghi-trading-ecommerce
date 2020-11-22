import React from "react";
import { useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

function CategorySection() {
    const { category_id } = useParams();
    const { url } = useRouteMatch();
    return (
        <section className="category-page">
            <BackButton />
            <div className="section-title">
                <h3>{category_id} fetch category name</h3>
            </div>
            <div className="max-view">
                <ProductCard
                    product={{
                        product_name: "Toilet Seat",
                        product_description: "This is a test product",
                        produt_image: "#",
                        product_price: 108,
                        product_brand: "Boysen"
                    }}
                />
            </div>
        </section>
    );
}

export function BackButton() {
    return (
        <div className="back-button">
            <Link to={"/admin"}>
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192 512"
                    >
                        <path d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z" />
                    </svg>
                </span>
                <p>Back</p>
            </Link>
        </div>
    );
}

function ProductCard({ product }) {
    return (
        <div className="card product">
            <div className="product__card">
                <div className="product__image">
                    <img
                        src={product.product_image}
                        alt={product.product_name}
                    />
                </div>
                <div className="product__name">
                    <h4>{product.product_name}</h4>
                    <p>{product.product_description}</p>
                </div>
                <div className="product__price">
                    <strong>P{product.product_price}</strong>
                </div>
            </div>
            <EditButton />
            <DeleteButton />
            {true && <ProductOverlay />}
        </div>
    );

    function ProductOverlay() {
        return (
            <div className="product__overlay flex-center">
                <h4>Unavailable</h4>
            </div>
        );
    }

    function EditButton() {
        return (
            <div className="product__button edit-button flex-center">
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z" />
                    </svg>
                </span>
            </div>
        );
    }

    function DeleteButton() {
        return (
            <div className="product__button delete-button flex-center">
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
                    </svg>
                </span>
            </div>
        );
    }
}

export default CategorySection;
