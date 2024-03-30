const INITIAL_VALUE = {
    FavList: [],
}

export default function FavListReduce (state = INITIAL_VALUE, action) {

    switch(action.type){
        case "CHANGE_FavList": 
            return{
                ...state, 
                FavList:  [...state.FavList]
            }
        default:
            return state
    }
}