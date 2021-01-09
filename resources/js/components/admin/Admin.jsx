import React from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useParams
} from "react-router-dom";
import Header from "./Header";
import InventorySection from "./InventorySection";
import CategorySection from "./CategorySection";
import AddMenu from "./AddMenu";
import DetailsSection from "./DetailsSection";
import SalesSection from "./SalesSection";
import Footer from "./Footer";

function Admin({ assetPath }) {
    const { path, url } = useRouteMatch();
    return (
        <>
            <Header assetPath={assetPath} />
            <Switch>
                {/* @desc index for admin dashboard */}
                <Route exact path={path}>
                    <InventorySection />
                    <SalesSection />
                    {/* <h3>test route</h3> */}
                    {/* <Link to={`${url}/products/item/add`}>test</Link> */}
                    {/* fix absolute path for AddMenu */}
                    <AddMenu />
                </Route>

                {/* @desc show products according to a category */}
                <Route path={`${path}/products/category/:category_id`}>
                    <CategorySection />
                    <AddMenu />
                    {/* add AddMenu component */}
                </Route>

                {/* @desc page to add a new product record */}
                <Route path={`${path}/products/item/add`}>
                    <DetailsSection />
                </Route>

                {/* @desc page to update a product record */}
                <Route path={`${path}/products/item/update/:product_id`}>
                    {/* <h3>This is update page</h3> */}
                    <DetailsSection />
                </Route>

                {/* <Route path={`${path}/product/add`}>
                    <h3>add new product record</h3>
                </Route>
                <Route path={`${path}/product/update/:product_id`}>
                    <h3>update product record</h3>
                </Route> */}
            </Switch>
            <Footer assetPath={assetPath} />
        </>
    );
}

export default Admin;
