import React, { useEffect, useState } from "react";
import { ProductCard } from "./CategorySection";
import { getBestsellers } from "./controller";

function SalesSection() {
    const [sales, setSales] = useState(null);
    const NO_SALES = {
        product_name: "NULL",
        product_description: "This is a test product",
        product_image: "#",
        unit_price: "0",
        product_brand: "Brand",
        is_available: true,
        items_sold: "0"
    };
    const DEFAULT_SALES = {
        product_name: "Loading...",
        product_description: "This is a test product",
        product_image: "#",
        unit_price: "...",
        product_brand: "Brand",
        is_available: true,
        items_sold: "..."
    };

    useEffect(() => {
        const awaitSales = async () => {
            try {
                const bestsellers = await getBestsellers({
                    method: "get",
                    url: `api/products/bestsellers/`
                });
                setSales(bestsellers.data);
            } catch (error) {
                console.error(error);
            }
        };
        awaitSales();
    }, []);

    return (
        <section className="sales-page">
            <div className="section-title">
                <h3>Sales</h3>
            </div>
            <div className="max-view">
                {/* <p>insert bestsellers card</p> */}
                {(function() {
                    if (!sales) return <ProductCard product={DEFAULT_SALES} />;
                    if (sales.length === 0)
                        return <ProductCard product={NO_SALES} />;

                    // console.log("sales", sales);
                    return sales.map((item, index) => (
                        <ProductCard
                            product={item}
                            key={`bestseller-${index}`}
                        />
                    ));
                })()}
                {/* <ProductCard
                    product={{
                        product_name: "Loading",
                        product_description: "This is a test product",
                        product_image: "#",
                        unit_price: 103,
                        product_brand: "Brand",
                        is_available: true,
                        items_sold: 34
                    }}
                /> */}
            </div>
        </section>
    );
}

export default SalesSection;
