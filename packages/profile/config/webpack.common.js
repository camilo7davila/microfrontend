const rulesForJavascript = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-react',
        '@babel/preset-env',
        '@babel/preset-typescript'
      ],
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
}

const rules = [rulesForJavascript]

module.exports = {
  module: { rules },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
  }
}