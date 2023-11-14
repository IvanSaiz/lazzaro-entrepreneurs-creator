export default {
  read: {
    steps: {
      wallet: "Tu wallet",
      NFTs: "NFTs",
      giftedTokens: "Tokens regalados"
    },

    wallet: {
      text: "Con este paso ya podrás percibir donaciones en criptomonedas",
      connectWallet: "Conectar wallet",
      walletConnected: "Wallet conectada",
      metaMaskUrl: "Como crear una wallet en MetaMask ?",
      installMetamask: "Instale la extensión MetaMask",
      installChrome: "Utilice el navegador Chrome",
      installMetamaskText:
        "Necesita instalar la extensión <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>MetaMask</a> para conectar su billetera",
      installChromeText:
        "Debe usar el navegador Chrome e instalar la extensión <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>MetaMask</a> para conectar su billetera"
    },

    NFTsTable: {
      createNFT: "Crea tu NFT",
      name: "Nombre",
      min_donation_amount: "Cantidad mínima de donación",
      max_minting_quantity: "Suministro",
      minted_count: "Tokens regalados",
      unlimited: "Sin límite"
    },

    giftedTokens: {
      table: {
        name: "Nombre",
        token_id: "Token ID",
        tx_hash: "hash de transacción",
        donation_id: "ID de Donación",
        donation_amount: "Cantidad donada"
      }
    }
  },
  createNFT: {
    header: {
      title: "Crea tu NFT",
      subtitle:
        "Rellena nuestro formulario para que podamos procesar tu NFT. Para cualquier duda o consulta contacta con tu asesor."
    },

    form: {
      image: {
        header: "Imagen",
        title: "Arrastra aquí tu imágen o pincha para buscar un archivo",
        subtitle: {
          size: "Tamaño máximo: 100MB",
          file_accepted: "Archivos aceptados JPG, PNG y GIF."
        }
      },
      NFT_name: {
        title: "Nombre del NFT"
      },

      symbol: {
        title: "Símbolo"
      },

      walletAddress: {
        title: "Dirección de la billetera"
      },

      description: {
        title: "Descripción",
        subtitle:
          "La decripción se incluirá en la página de detalles del NFT debajo de la imagen."
      },

      externalUrl: {
        title: "Enlace externo",
        subtitle:
          "El marketplace incluirá un enlace a esta URL en la página de detalles del NFT para que los compradores puedan hacer clic para obtener mñas información del creador. Puedes añadir tu url de web o de algun proyecto en concreto que acompañe al NFT"
      },

      donationAmount: {
        title: "Cantidad mínima de donación"
      },

      maxMintingQuantity: {
        title: "Suministro",
        subtitle:
          "La cantidad de NFT que se puede acuñar. ¿No sabes que es la acuñación? Aquí puedes informarte"
      },

      attributes: {
        title: "atributos",
        subtitle:
          "Las atributos aparecen debajo de tu NFT, se puede hacer clic en ellos y filtarse.",
        type: "Tipo",
        name: "Nombre"
      },

      buttons: {
        send: "Enviar",
        save_draft: "Guardar borrador",
        create: "Crear",
        close: "Cerrar",
        deleteNFT: "Eliminar NFT"
      },

      status: {
        success: "NFT creada con éxito"
      }
    }
  },

  sell: {
    header: {
      title: "Anuncio para venta",
      subtitle: "Pon tu NFT a la venta para que otras personas puden tenerlo"
    },

    form: {
      setPrice: "Establece el precio",
      setDuration: "Establece la duración",
      oneMonth: "1mes",
      summary: "Resumen",
      adPrice: "Precio del anuncio",
      serviceFee: "Tasa de servicio",
      creatorCommission: "Comisión del creador",
      potentialEarnings: "Ganacias potenciales"
    }
  }
};
