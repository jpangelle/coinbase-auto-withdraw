import { CronJob } from "cron";
import { getETHBalance } from "./getETHBalance";
import { sendETH } from "./sendETH";

const moveFunds = async () => {
  try {
    console.log("Running!");

    const ethBalance = await getETHBalance();

    await sendETH(ethBalance);
  } catch (error: any) {
    console.log(
      "Something went wrong:",
      error?.response?.data?.errors || error
    );
  }
};

new CronJob("0 8 * * *", moveFunds, null, true, "America/Chicago");
