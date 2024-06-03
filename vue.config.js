module.exports = {
  devServer: {
    host: "localhost",
    port: 3000,
    hot: true
  },
  publicPath: "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/vars/index.scss";'
      }
    }
  }
};
