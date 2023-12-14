import { Cron } from "croner";
import BigNumber from "bignumber.js";
import { getETHBalance } from "./getETHBalance";
import { sendETH } from "./sendETH";
import { getLatestETHBuy } from "./getLatestETHBuy";
import { pollETHTransactionStatus } from "./pollETHTransactionStatus";
import { Sentry } from "./sentry";

const moveFunds = async () => {
  try {
    Sentry.captureMessage("Running!");

    const latestETHBuy = await getLatestETHBuy();
    const ethBalance = await getETHBalance();

    if (
      latestETHBuy &&
      ethBalance.gte(new BigNumber(latestETHBuy.amount.amount))
    ) {
      Sentry.captureMessage("Sending!");

      const estimatedNetworkFee = new BigNumber("0.001");

      const ethBalanceMinusEstimatedNetworkFee = ethBalance
        .minus(estimatedNetworkFee)
        .toString();
      const { id, status } = await sendETH(ethBalanceMinusEstimatedNetworkFee);
      if (status === "pending") {
        Sentry.captureMessage("Pending!");

        await pollETHTransactionStatus(id);
      }
    } else {
      Sentry.captureMessage("Nothing to send!");
    }
  } catch (error) {
    Sentry.captureException(error);
  }
};

Cron(
  "*/30 * * * *",
  {
    timezone: "America/Chicago",
  },
  moveFunds
);
