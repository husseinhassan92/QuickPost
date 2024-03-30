import { combineReducers } from 'redux';
import AuthRecducer from './AuthRecducer';
import searchReducer from './searchSlice'; 
import friendsReducer from './friendSlice';
import FavListReduce from './FavListReduce';


export default combineReducers({
    AuthRecducer:AuthRecducer,
    search: searchReducer,
    friends: friendsReducer,
    FavListReduce: FavListReduce,
});

