import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/NtpDBRQdao8qpOZrcd_3CFRVIEbhsyQv",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gas: 2100000,
      gasPrice: 8000000000
    },
  },
};

export default config;
