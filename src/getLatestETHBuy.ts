import axios from "axios";
import dotenv from "dotenv";
import { constructPayload } from "./constructPayload";

dotenv.config();

const ethereumAccountId = process.env.ETHEREUM_ACCOUNT_ID;

export const getLatestETHBuy = async () => {
  const payload = constructPayload({
    method: "GET",
    path: `/v2/accounts/${ethereumAccountId}/transactions`,
  });

  const {
    data: { data: transactions },
  } = await axios(payload);

  const completedBuyTransactions = transactions.filter(
    (transaction: { type: "buy"; status: "completed" }) =>
      transaction.type === "buy" && transaction.status === "completed"
  );

  return completedBuyTransactions[0];
};
