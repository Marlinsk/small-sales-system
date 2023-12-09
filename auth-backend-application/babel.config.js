module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: 'current'
        }
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          '@application': './src/application',
          '@domain': './src/domain',
          '@infra': './src/infra',
          '@shared': './src/shared',
        }
      }
    ]
  ]
}