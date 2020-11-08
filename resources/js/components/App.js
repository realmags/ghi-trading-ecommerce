import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";

// components
import Admin from "./admin/Admin";

function App({ assetPath }) {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        {/* Insert component for landing page */}
                        <h1>This is the landing page!</h1>
                    </Route>
                    <Route path="/admin">
                        <Admin assetPath={assetPath} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

if (document.getElementById("app")) {
    const assetPath = document
        .getElementById("app")
        .getAttribute("data-assetPath");
    ReactDOM.render(
        <App assetPath={assetPath} />,
        document.getElementById("app")
    );
}
