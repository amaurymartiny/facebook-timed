import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
// import thunk from 'redux-thunk';
import rootReducer from './reducers';
const createLogger = require('redux-logger');

export function configureStore(history, initialState?: any): Redux.Store {

  let middlewares: any[] = [
    routerMiddleware(history),
    // thunk
  ];

  /** Add Only Dev. Middlewares */
  if (process.env.NODE_ENV !== 'production' && process.env.BROWSER) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const finalCreateStore = compose(
    applyMiddleware(...middlewares),
    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension() : f => f
  )(createStore);

  const store: Redux.Store = finalCreateStore(rootReducer, initialState);

  if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      store.replaceReducer((require('./reducers')));
    });
  }

  return store;
}
