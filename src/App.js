import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import BottomMenu from "./components/BottomMenu";
import Menu from "./components/TopMenu";
import { getLocalStorageByName, STORAGE_KEYS } from "./localStorage";
import Home from "./pages/Dashboard/Home";
import Message from "./pages/Dashboard/Message";
import Monitor from "./pages/Dashboard/Home/Monitor";
import Setting from "./pages/Dashboard/Setting";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import { login, logout } from "./store/auth";

function App() {
  const menu = useSelector((item) => item.menu);
  const auth = useSelector((item) => item.auth);
  const dispatcher = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.user) {
      history.push("/dashboard/home");
    } else {
      history.push("/signin");
    }
  }, [auth.user, history]);

  useEffect(() => {
    const token = getLocalStorageByName(STORAGE_KEYS.jwt_token);
    if (token) {
      dispatcher(
        login({
          access_token: token,
        })
      );
    } else {
      dispatcher(logout());
    }
  }, [dispatcher]);

  return (
    <div className="App flex flex-col">
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
        <Route path="/">
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
            <Route exact path="/dashboard/monitor/:id">
              <Monitor />
            </Route>
          </Switch>
          <BottomMenu />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
