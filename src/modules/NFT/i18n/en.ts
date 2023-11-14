export default {
  read: {
    steps: {
      wallet: "Wallet",
      NFTs: "NFTs",
      giftedTokens: "Gifted tokens"
    },

    wallet: {
      text:
        "With this step you will be able to receive donations in cryptocurrencies",
      connectWallet: "Connect wallet",
      walletConnected: "Wallet connected",
      metaMaskUrl: "How to create a wallet in MetaMask?",
      installMetamask: "Please install MetaMask extension",
      installChrome: "Please use Chrome browser",
      installMetamaskText:
        "You need to install <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>MetaMask</a> extension in order to connect your wallet",
      installChromeText:
        "You need to use Chrome browser and install <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>MetaMask</a> extension in order to connect your wallet."
    },

    NFTsTable: {
      createNFT: "Create your NFT",
      name: "Name",
      min_donation_amount: "Minimum donation amount",
      max_minting_quantity: "Max minting quantity",
      minted_count: "Gifted tokens",
      unlimited: "Unlimited"
    },

    giftedTokens: {
      table: {
        name: "Token name",
        token_id: "Token ID",
        tx_hash: "Transaction hash",
        donation_id: "Donation ID",
        donation_amount: "Donation amount"
      }
    }
  },

  createNFT: {
    header: {
      title: "Create your NFT",
      subtitle:
        "Fill out our form so we can process your NFT. For any questions or queries, contact your advisor."
    },

    form: {
      image: {
        header: "Image",
        title: "Drag your image here or click to search for a file",
        subtitle: {
          size: "Maximum size: 100MB",
          file_accepted: "Files accepted JPG, PNG and GIF."
        }
      },
      NFT_name: {
        title: "NFT name"
      },

      symbol: {
        title: "Symbol"
      },

      walletAddress: {
        title: "Wallet address"
      },

      description: {
        title: "Description",
        subtitle:
          "The description will be listed on the NFT details page below the image."
      },

      externalUrl: {
        title: "External url",
        subtitle:
          "The marketplace will include a link to this URL on the NFT details page so buyers can click to get more information from the creator. You can add your web url or a specific project that accompanies the NFT"
      },

      donationAmount: {
        title: "Minimum donation amount"
      },

      maxMintingQuantity: {
        title: "Max Minting Quantity",
        subtitle:
          "The amount of NFT that can be minted. Don't you know what coinage is? Here you can inform yourself"
      },

      attributes: {
        title: "Attributes",
        subtitle:
          "Attributes appear below your NFT, they are clickable and filterable.",
        type: "Type",
        name: "Name"
      },

      buttons: {
        send: "Send",
        save_draft: "Save draft",
        create: "Create",
        close: "Close",
        deleteNFT: "Delete NFT"
      },

      status: {
        success: "NFT created successfully"
      }
    }
  },

  sell: {
    header: {
      title: "advertisement for sale",
      subtitle: "Put your NFT up for sale so other people can have it"
    },

    form: {
      setPrice: "Set the Price",
      setDuration: "Set duration",
      oneMonth: "1 month",
      summary: "Summary",
      adPrice: "Ad Price",
      serviceFee: "Service fee",
      creatorCommission: "Creator commission",
      potentialEarnings: "Potential Earnings"
    }
  }
};
