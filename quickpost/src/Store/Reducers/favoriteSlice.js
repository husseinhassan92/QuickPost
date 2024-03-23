import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    return JSON.parse(favorites);
  } else {
    return [];
  }
}

const storeInLocalStorage = (data) => {
  localStorage.setItem('favorites', JSON.stringify(data));
}

const initialState = {
  favorites: fetchFromLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const isItemInFavorite = state.favorites.find(item => item.id === action.payload.id);

      if (isItemInFavorite) {
        const tempFavorite = state.favorites.map(item => {
          if (item.id === action.payload.id) {
            let tempQty = item.quantity + action.payload.quantity;
            let tempTotalPrice = tempQty * item.price;

            return {
              ...item, quantity: tempQty, totalPrice: tempTotalPrice
            }
          } else {
            return item;
          }
        });

        state.favorites = tempFavorite;
        storeInLocalStorage(state.favorites);
      } else {
        state.favorites.push(action.payload);
        storeInLocalStorage(state.favorites);
      }
    },

    removeFromFavorite: (state, action) => {
      const tempFavorites = state.favorites.filter(item => item.id !== action.payload);
      state.favorites = tempFavorites;
      storeInLocalStorage(state.favorites);
    },

    clearFavorite: (state) => {
      state.favorites = [];
      storeInLocalStorage(state.favorites);
    },

    getFavoriteTotal: (state) => {
      state.totalAmount = state.favorites.reduce((favoriteTotal, favoriteItem) => {
        return favoriteTotal += favoriteItem.totalPrice
      }, 0);

      state.itemsCount = state.favorites.length;
    },
  }
});

export const { addToFavorite, getFavoriteTotal, clearFavorite, removeFromFavorite } = favoriteSlice.actions;
export const getAllFavorites = (state) => state.favorite.favorites;
export const getFavoriteItemsCount = (state) => state.favorite.itemsCount;

export default favoriteSlice.reducer;
