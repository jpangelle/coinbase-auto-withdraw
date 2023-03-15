import { CronJob } from "cron";
import { getETHBalance } from "./getETHBalance";
import { sendETH } from "./sendETH";

new CronJob(
  "0 8 * * *",
  async () => {
    try {
      console.log("Running!");

      const ethBalance = await getETHBalance();

      await sendETH(ethBalance);
    } catch (error: any) {
      console.log("Something went wrong:", error);
    }
  },
  null,
  true,
  "America/Chicago"
);
