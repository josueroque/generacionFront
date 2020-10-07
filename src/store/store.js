import { createStore, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore, persistReducer,persistCombineReducers } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const initialState = {};

const middleware = [thunk];


// Middleware: Redux Persist Config
const persistConfig = {
    key: 'primary',
    storage,
    blacklist: [
        'userReducer',
      ],
    stateReconciler: hardSet,  
  };

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer, 
    initialState,
    compose(applyMiddleware(...middleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //remove for production
) );

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export  {store,persistor};