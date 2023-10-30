import {
  PFP_WL_CONTRACTS_MAINNET,
  PFP_WL_CONTRACTS_TESTNET,
} from "./constants";
import { hexToDecimal } from "./feltService";

// Retrieve assets from Starkscan API
export const retrieveAssets = async (
  url: string,
  addr: string,
  accumulatedAssets: StarkscanNftProps[] = [],
  cursorValue: string | null = null
): Promise<StarkscanApiResult> => {
  const apiUrl =
    `${url}?addr=${addr}` + (cursorValue ? `&cursor=${cursorValue}` : "");
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      const assets = [...accumulatedAssets, ...data.data];
      if (data.next_url) {
        const params = new URLSearchParams(new URL(data.next_url).search);
        const cursorValue = params.get("cursor");
        return retrieveAssets(url, addr, assets, cursorValue);
      } else {
        return {
          data: assets,
        };
      }
    });
};

// Filter assets based on a whitelisted array of contract addresses
export const filterAssets = (
  assets: StarkscanNftProps[],
  whitelist: string[]
): StarkscanNftProps[] => {
  const filteredAssets: StarkscanNftProps[] = [];
  assets.forEach((asset: StarkscanNftProps) => {
    if (whitelist.includes(hexToDecimal(asset.contract_address))) {
      filteredAssets.push(asset);
    }
  });
  return filteredAssets;
};

export const getWhitelistedPfpContracts = (): string[] => {
  return process.env.NEXT_PUBLIC_IS_TESTNET === "true"
    ? PFP_WL_CONTRACTS_TESTNET.map((hex) => hexToDecimal(hex))
    : PFP_WL_CONTRACTS_MAINNET.map((hex) => hexToDecimal(hex));
};