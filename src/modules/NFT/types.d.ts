declare type TokenStatus = "pending" | "deployed" | "confirmed";

declare type NFTFormValues = {
  image: string;
  name: string;
  description: string;
  walletAddress: string;
  symbol: string;
  externalUrl?: string;
  attributes: { type: string; name: string }[];
  maxMintingQuantity: number;
  minDonationAmount: number;
};

declare type NFT = {
  id: string;
  ongId: string;
  name: string;
  description: string;
  symbol: string;
  max_minting_quantity: number;
  min_donation_amount: number;
  external_url?: string;
  ipfs_image_hash: string;
  ipfs_metadata_hash: string;
  s3_image_url: string;
  s3_metadata_url: string;
  tx: string;
  status: Exclude<TokenStatus, "confirmed">;
  createdAt: Date;
  updatedAt: Date;
  NFTAttributes: NFTAttribute[];
  contract_address: string;
  mintedCount: number;
};

declare type NFTAttribute = {
  id: string;
  type: string;
  NFTId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

declare type DonationType = "ong" | "project" | "event";
declare type MintedToken = {
  id: string;
  nft_id: string;
  token_id: string | null;
  user_id: string;
  donation_id: string | null;
  event_payment_id: string | null;
  payment_id: string | null;
  donation_type: DonationType;
  tx: string;
  status: Exclude<TokenStatus, "deployed">;
  wallet_address: string;
  createdAt: Date;
  updatedAt: Date;
  NFT: { name: string };
  Donation: { amount: number };
};

declare type EthereumEvent =
  | "close"
  | "accountsChanged"
  | "chainChanged"
  | "networkChanged";
declare type EthereumMethod = "eth_accounts" | "eth_requestAccounts";
type WalletAddress = [string];

declare type Ethereum = {
  request: ({ method }: { method: EthereumMethod }) => Promise<WalletAddress>;
  selectedAddress: string;
  isMetaMask: boolean;
  on: (event: EthereumEvent, cb: (address: WalletAddress) => void) => Ethereum;
  removeListener: (
    event: EthereumEvent,
    cb: (address: WalletAddress) => void
  ) => Ethereum;
  removeAllListeners: () => void;
};

declare type EthereumWindow = Window & { ethereum: Ethereum };
