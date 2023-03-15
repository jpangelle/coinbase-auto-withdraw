import axios from "axios";
import dotenv from "dotenv";
import { constructPayload } from "./constructPayload";

dotenv.config();

const ethereumAccountId = process.env.ETHEREUM_ACCOUNT_ID;

export const getETHBalance = async () => {
  const payload = constructPayload({
    method: "GET",
    path: `/v2/accounts/${ethereumAccountId}`,
  });

  const { data } = await axios(payload);
  return data.data.balance.amount;
};
