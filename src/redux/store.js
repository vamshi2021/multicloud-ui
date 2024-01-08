import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/reducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
