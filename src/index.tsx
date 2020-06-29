import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { UserList } from "./UserList";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <App userType="admin" username="rezar" {...props} />
          )}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path="/userlist"
          render={(props) => <UserList {...props} />}
        />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
