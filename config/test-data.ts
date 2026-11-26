export const testData = {
  searchTerm: process.env.TEST_SEARCH_TERM ?? 'playstation 5',
  color: process.env.TEST_COLOR ?? 'Blanco',
  sortOption: process.env.TEST_SORT_OPTION ?? 'Menor precio',
  productsToExtract: Number(process.env.TEST_PRODUCTS_TO_EXTRACT ?? 5),
  minMatches: Number(process.env.TEST_MIN_MATCHES ?? 3),
};