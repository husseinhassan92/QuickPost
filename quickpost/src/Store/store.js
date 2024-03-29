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
    //applyMiddleware(...middleware),
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
