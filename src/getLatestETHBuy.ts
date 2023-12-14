import axios from "axios";
import dotenv from "dotenv";
import { constructPayload } from "./constructPayload";

dotenv.config();

const ethereumAccountId = process.env.ETHEREUM_ACCOUNT_ID;

export const getLatestETHBuy = async () => {
  const payload = constructPayload({
    method: "GET",
    path: `/v2/accounts/${ethereumAccountId}/transactions?status=completed&type=buy`,
  });

  const {
    data: { data: completedBuyTransactions },
  } = await axios(payload);

  return completedBuyTransactions[0];
};
