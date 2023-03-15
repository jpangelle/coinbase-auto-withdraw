import { getETHTransaction } from "./getETHTransaction";
import { Sentry } from "./sentry";

export const pollETHTransactionStatus = async (transactionId: string) => {
  while (true) {
    const { status } = await getETHTransaction(transactionId);
    if (status !== "pending") {
      Sentry.captureMessage(
        `${status.charAt(0).toUpperCase()}${status.slice(1)}!`
      );
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};
