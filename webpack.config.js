const path = require('path');

module.exports = {
    entry: {
        app: ['./src/js/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/markdown-notes/",
    },
    module: {
      rules : [
      {
          test: /\.md$/,
          use: [
              {
                  loader: "html-loader"
              },
              {
                  loader: "markdown-loader",
              }
          ]
      }
      ]
  },
  "mode": "development"
}