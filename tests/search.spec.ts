import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { testData } from '../config/test-data';


test('search, filter and sort products', async ({ page }) => {
  const homePage = new HomePage(page);
  const resultsPage = new SearchResultsPage(page);


  await homePage.open();
  await homePage.search(testData.searchTerm);
  await resultsPage.filterByColor(testData.color);
  await resultsPage.sortBy(testData.sortOption);
  const products = await resultsPage.getProducts(testData.productsToExtract);
  console.table(products);
  expect(products).toHaveLength(testData.productsToExtract);


  await expect(page).toHaveURL(/sort=/);
});