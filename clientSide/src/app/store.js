
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

import userReducer from "../features/User/userSlice.js";
import formReducer from "../features/Form/formSlice.js";
import cartReducer from "../features/Cart/cartSlice.js";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

// Combine all reducers
const rootReducer = combineReducers({
  form : formReducer,
  cart: cartReducer,
  user: userReducer,
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["form" , "cart", "user"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Here first we create a store using configureStore() funx.
// In this store we have to pass reducers in object form...
const store = configureStore({
  reducer: persistedReducer,
  
  // middleware to handle error to pass files(like: image , audio, video, pdf etc.);
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist needs these ignored
        ignoredActions: ['form/updateImageFile',FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['form.imgFile'],
      },
    }),
})

const persistor = persistStore(store);

export { store , persistor };
