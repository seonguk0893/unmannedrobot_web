module.exports = { 
  devServer: {
    proxy: { 
      '/api': { 
        host: '0.0.0.0',
        port: 8080,
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': '' 
        } 
      } 
    } 
  },
  outputDir: '../backend/public',
};
