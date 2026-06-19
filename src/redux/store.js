import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './slice';

export default configureStore({
  reducer: {
    Todoo: dataReducer,
  },
});