interface WebpackConfig {
  module: {
    rules: Array<{
      test: RegExp;
      use: Array<{
        loader: string;
        options: {
          name: string;
        };
      }>;
    }>;
  };
}

module.exports = {
  webpack(config: WebpackConfig): WebpackConfig {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
};
