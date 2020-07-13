import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/coming-soon">{/* <ComingSoon /> */}</Route>
          <Route path="/" />
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
