import { createSlice } from "@reduxjs/toolkit";

/**
 * Each transaction is recorded as an object with the following properties.
 * @typedef Transaction
 * @property {"deposit"|"withdrawal"|"transfer/[name]"} type
 * @property {number} amount
 * @property {number} balance - The balance after the transaction is completed.
 */

/** @type {{balance: number, history: Transaction[]}} */
const initialState = {
  balance: 0,
  history: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    deposit: (state, { payload }) => {
      state.balance += payload.amount;
      state.history.push({
        type: "deposit",
        amount: payload.amount,
        balance: state.balance,
      });
    },
    withdrawal: (state, { payload }) => {
      state.balance -= payload.amount;
      state.history.push({
        type: "withdrawal",
        amount: payload.amount,
        balance: state.balance,
      });
    },
    transfer: (state, { payload }) => {
      state.balance -= payload.amount;
      state.history.push({
        type: `transfer/${payload.recipient}`,
        amount: payload.amount,
        balance: state.balance,
      });
    },
  },
});

export const { deposit, withdrawal, transfer } = transactionsSlice.actions;

export const selectBalance = (state) => state.transactions.balance;
export const selectHistory = (state) => state.transactions.history;

export default transactionsSlice.reducer;
