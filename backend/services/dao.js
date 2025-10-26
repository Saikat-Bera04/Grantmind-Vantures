import { ethers } from 'ethers';

let provider;

export function getProvider() {
  if (provider) return provider;
  const rpcUrl = process.env.RPC_URL;
  if (!rpcUrl) return null; // optional
  provider = new ethers.JsonRpcProvider(rpcUrl);
  return provider;
}

export function getDaoContract() {
  const address = process.env.DAO_CONTRACT_ADDRESS;
  const abiJson = process.env.DAO_CONTRACT_ABI_JSON;
  const prov = getProvider();
  if (!address || !abiJson || !prov) return null;
  const abi = JSON.parse(abiJson);
  return new ethers.Contract(address, abi, prov);
}
