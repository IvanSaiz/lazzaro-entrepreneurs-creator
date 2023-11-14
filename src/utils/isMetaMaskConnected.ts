const isMetaMaskConnected = (window: Window): window is EthereumWindow =>
  Object.prototype.hasOwnProperty.call(window, "ethereum");

export default isMetaMaskConnected;
