import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Dashboard/Home";
import Message from "./pages/Dashboard/Message";
import Setting from "./pages/Dashboard/Setting";
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
            <Welcome />
          </Route>
          <Route exact path="/signin">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Switch>
              <Route exact path="/dashboard/home">
                <Home />
              </Route>
              <Route exact path="/dashboard/message">
                <Message />
              </Route>
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
