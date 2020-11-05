import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";

// components

function App({ assetPath }) {
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route exact path="/admin" />
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
