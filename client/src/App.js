import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Newpost from "./components/Newpost";
import "materialize-css";
import "./app.css";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route exact path='/'>
          <Home />
          <Footer />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/createpost'>
          <Newpost />
        </Route>
      </Router>
    </div>
  );
}
export default App;
