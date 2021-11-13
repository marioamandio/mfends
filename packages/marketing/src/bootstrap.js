import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";
// mount function to start up the app

const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory ?? createMemoryHistory();
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (nextPathname !== pathname) {
        history.push(nextPathname);
      }
    },
  };
};

// if dev and isolation call mount immmediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container and we should export the mount function
export { mount };
