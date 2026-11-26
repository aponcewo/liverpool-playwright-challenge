import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { testData } from '../config/test-data';
import { compareProducts } from '../utils/productValidator';


test('search, filter and sort products', async ({ page }) => {
  const homePage = new HomePage(page);
  const resultsPage = new SearchResultsPage(page);


  await homePage.open();
  await homePage.search(testData.searchTerm);
  await resultsPage.filterByColor(testData.color);
  const apiProducts = await resultsPage.sortBy(testData.sortOption);
  const products = await resultsPage.getProducts(testData.productsToExtract);


  console.table(products);


  const result = compareProducts(products, apiProducts);
  console.log(`UI products found in the API response: ${result.matches} of ${products.length}`);
  result.discrepancies.forEach((d) => console.log(`Discrepancy: ${d}`));


  expect(products).toHaveLength(testData.productsToExtract);
  expect(result.matches).toBeGreaterThanOrEqual(testData.minMatches);
  await expect(page).toHaveURL(/sort=/);
});