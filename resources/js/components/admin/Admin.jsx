import React from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
    useParams
} from "react-router-dom";
import Header from "./Header";
import Inventory from "./Inventory";
import CategoryPage from "./CategoryPage";

function Admin({ assetPath }) {
    const { path, url } = useRouteMatch();
    return (
        <>
            <Header assetPath={assetPath} />
            <Switch>
                {/* @desc index for admin dashboard */}
                <Route exact path={path}>
                    <Inventory />
                    <h3>test route</h3>
                    <Link to={`${url}/products/category/3`}>test</Link>
                </Route>

                {/* @desc route to show products according to a category */}
                <Route path={`${path}/products/category/:category_id`}>
                    <CategoryPage />
                </Route>

                {/* <Route path={`${path}/category/:category_id`}>
                    <h3>product listing for each category</h3>
                </Route> */}
                {/* <Route path={`${path}/product/add`}>
                    <h3>add new product record</h3>
                </Route>
                <Route path={`${path}/product/update/:product_id`}>
                    <h3>update product record</h3>
                </Route> */}
            </Switch>
        </>
    );
}

export default Admin;
