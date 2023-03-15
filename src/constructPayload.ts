import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

type Request = {
  path: string;
  method: "GET" | "POST";
  body?: { [key: string]: string };
};

export const constructPayload = ({ path, method, body }: Request) => {
  const timestamp = Math.floor(Date.now() / 1000);

  const message = `${timestamp}${method}${path}${
    method === "POST" ? JSON.stringify(body) : ""
  }`;

  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(message)
    .digest("hex");

  const options = {
    url: `https://api.coinbase.com${path}`,
    method,
    headers: {
      "CB-ACCESS-SIGN": signature,
      "CB-ACCESS-TIMESTAMP": timestamp,
      "CB-ACCESS-KEY": apiKey,
      "CB-VERSION": "2015-07-22",
    },
    ...(method === "POST" && { data: body }),
  };

  return options;
};
