import http from "@/api/core/http";
type Res<T> = Promise<{ data: T }>;

function createNFT(ongId: string, body: NFTFormValues): Promise<{ NFT: NFT }> {
  return http.post(`private/nft/${ongId}`, body, { noAuth: false });
}

function getNFTsByOng(ongId: string): Res<NFT[]> {
  return http.get(`private/nft/${ongId}`, { noAuth: false });
}

function getNFTById(ongId: string, NFTId: string): Promise<NFT> {
  return http.get(`private/nft/${ongId}/${NFTId}`, { noAuth: false });
}

function getMintedTokens(ongId: string): Res<MintedToken[]> {
  return http.get(`private/nft/${ongId}/minted-tokens`, { noAuth: false });
}
export default { createNFT, getNFTsByOng, getNFTById, getMintedTokens };
