import axios from "axios";
import dotenv from "dotenv";
import { constructPayload } from "./constructPayload";

dotenv.config();

const ethereumAccountId = process.env.ETHEREUM_ACCOUNT_ID;

export const getETHTransaction = async (transactionId: string) => {
  const payload = constructPayload({
    method: "GET",
    path: `/v2/accounts/${ethereumAccountId}/transactions/${transactionId}`,
  });

  const { data } = await axios(payload);
  return data.data;
};
