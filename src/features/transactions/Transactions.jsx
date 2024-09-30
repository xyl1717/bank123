import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdrawal, transfer, selectBalance } from "./transactionsSlice"; // Adjust path

export default function Transactions() {
  const balance = useSelector(selectBalance);
  const dispatch = useDispatch();
  const [amountStr, setAmountStr] = useState("0.00");

  const onTransaction = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;
    const amount = +amountStr;

    if (action === "deposit") {
      dispatch(deposit({ amount }));
    } else if (action === "withdraw") {
      dispatch(withdrawal({ amount }));
    } else if (action === "transfer") {
      const recipient = e.target.recipient.value;
      dispatch(transfer({ amount, recipient }));
    }
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button default name="deposit">
              Deposit
            </button>
            <button name="withdraw">Withdraw</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input type="text" placeholder="Recipient Name" name="recipient" />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}
