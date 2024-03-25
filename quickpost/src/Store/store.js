import { configureStore } from '@reduxjs/toolkit';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';
import rootReducer from './Reducers/CombineReducer';
 // Corrected import path

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';  // Corrected import path
// import rootReducer from './Reducers/CombineReducer';

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
//   devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
// });

// export default store;


// export default configureStore({
//   reducer: {
//     search: searchReducer,
//     friends: friendsReducer,
//   }
// });
