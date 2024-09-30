import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionsSlice"; // Adjust path as needed

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
