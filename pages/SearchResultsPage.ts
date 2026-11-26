import { Page, Locator } from '@playwright/test';
import { parsePrice } from '../utils/price';

export interface Product{
    id: string;
    name: string;
    price: number;
}

export class SearchResultsPage {
  private readonly page: Page;
  private readonly sortButton: Locator;
  private readonly productNames: Locator;
  private readonly productPrices: Locator;


  constructor(page: Page) {
    this.page = page;
    this.sortButton = page.getByTestId('dropdown-sorting-button');
    this.productNames = page.locator('#plp-page-card-product-list h3');
    this.productPrices = page.locator('#plp-page-card-product-list [data-testid$="-price"]')
  }


  async filterByColor(color: string): Promise<void> {
    const colorCheckbox = this.page.getByRole('checkbox', { name: new RegExp(`^${color}`, 'i') });
    const response = this.waitForSearchResponse();
    await colorCheckbox.click();
    await response;
  }

  async sortBy(option: string): Promise<Product[]> {
  await this.sortButton.click();
  const response = this.waitForSearchResponse();
  await this.page.getByRole('option', { name: option, exact: true }).click();
  const apiResponse = await response;
  const body = await apiResponse.json();
  return body.data.records.map((record: any) => ({
    id: record.productId,
    name: record.title,
    price: record.priceInfo?.promoPrice?.price,
  }));
}

  async getProducts(count: number): Promise<Product[]> {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    const name = await this.productNames.nth(i).innerText();
    const priceBox = this.productPrices.nth(i);
    const id = (await priceBox.getAttribute('data-testid') ?? '').replace('-price', '');
    const priceText = await priceBox.locator('.text-price-primary').textContent();
    products.push({ id, name: name.trim(), price: parsePrice(priceText ?? '') });
  }
  return products;
}


  private waitForSearchResponse() {
    return this.page.waitForResponse(
      (r) => r.url().includes('/api/plp/search') && r.ok()
    );
  }
}