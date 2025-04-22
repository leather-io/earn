const defaultConfig = require('@stacks/prettier-config');

module.exports = {
  ...defaultConfig,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^@(assets|components|constants|crypto|hooks|utils)/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
