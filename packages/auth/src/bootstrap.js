import React  from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath],
  });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />,el);

  return {
    onParentNavigate( { pathname: nextPathname}) {
      const { pathname } = history.location;
      
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  };
};

// if we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot)
  {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// If we are running through the container,
// container will call mount to start app
export { mount };