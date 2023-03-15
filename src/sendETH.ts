import axios from "axios";
import dotenv from "dotenv";
import { constructPayload } from "./constructPayload";

dotenv.config();

const ethereumColdWalletAddress = process.env.ETHEREUM_COLD_WALLET_ADDRESS;
const ethereumAccountId = process.env.ETHEREUM_ACCOUNT_ID;

export const sendETH = async (ethBalance: string) => {
  const payload = constructPayload({
    method: "POST",
    path: `/v2/accounts/${ethereumAccountId}/transactions`,
    body: {
      type: "send",
      to: ethereumColdWalletAddress,
      amount: ethBalance,
      currency: "ETH",
    },
  });

  const { data } = await axios(payload);

  return data.data;
};
