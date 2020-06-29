import React, { useEffect, useState, ChangeEvent } from "react";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  saveUsername as saveUsernameAction,
  saveUserMessage as saveUserMessageAction,
} from "./store/user/UserActions";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { IUser } from "./store/user/UserTypes";
import { IAppState } from "./store/RootReducer";

interface IAppOwnProps {
  username: string | undefined;
  userType: "admin" | "moderator" | "user" | "guest";
}

interface IAppDispatchToProps {
  saveUsername: (user: IUser) => void;
  saveUserMessage: (user: IUser) => void;
}

const AppUnconnected: React.FC<IAppDispatchToProps & IAppOwnProps> = ({
  userType,
  username,
  saveUsername,
  saveUserMessage,
}): JSX.Element => {
  const [time, setTime] = useState<Date>(() => new Date(Date.now()));
  const [message, setMessage] = useState<string>("");

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date(Date.now()));
    }, 1000);

    if (username) {
      saveUsername({ username, userMessage: undefined });
    }

    return () => {
      clearInterval(timer);
    };
  }, [username, saveUsername]);

  useEffect(() => {
    saveUserMessage({ username: undefined, userMessage: message });
  }, [message, saveUserMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>First Learn a TypeScript with React.</h2>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>
        Hi, {username ? username : "Mysterious Entity"}, your user type is{" "}
        {username ? userType : "irrelevant because I do not know you"}.
      </p>
      <p>{time.toUTCString()}</p>
      <input
        type="text"
        placeholder="Enter your message here"
        value={message}
        onChange={handleTextChange}
      />
      <p>Your message: {message || ""}</p>
      <Link to="/userlist">User List</Link>
    </div>
  );
};

const mapDispatchToProps: MapDispatchToProps<
  IAppDispatchToProps,
  IAppOwnProps
> = (dispatch: Dispatch, ownProps: IAppOwnProps): IAppDispatchToProps => ({
  saveUsername: (user: IUser) => {
    dispatch(saveUsernameAction(user));
  },

  saveUserMessage: (user: IUser) => {
    dispatch(saveUserMessageAction(user));
  },
});

export const App = connect<{}, IAppDispatchToProps, IAppOwnProps, IAppState>(
  null,
  mapDispatchToProps
)(AppUnconnected);
