import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";

// components
import Header from "./Header";

function App() {
    return (
        <Router>
            <div className="container">
                <Header />
                <Switch>
                    <Route exact path="/" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
