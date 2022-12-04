import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Setting from "./pages/Dashboard/Setting";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Menu from "./components/TopMenu";
import BottomMenu from "./components/BottomMenu";

function App() {
  const menu = useSelector((item) => item.menu);
  console.log(menu);
  return (
    <div className="App flex flex-col">
      <Router>
        {menu.show && <Menu data={menu} />}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Switch>
              <Route exact path="/dashboard/setting">
                <Setting />
              </Route>
            </Switch>
            <BottomMenu />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
