import {Web3} from 'web3';

// Binance Smart Chain 主网的 RPC URL
const BSC_MAINNET_RPC = "https://bsc-dataseed.binance.org/";

// 创建并导出 Web3 实例
const web3 = new Web3(BSC_MAINNET_RPC);
export default web3;
