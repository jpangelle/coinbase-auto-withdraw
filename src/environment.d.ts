declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    API_SECRET: string;
    ETHEREUM_ACCOUNT_ID: string;
    ETHEREUM_COLD_WALLET_ADDRESS: string;
    SENTRY_DSN: string;
  }
}
