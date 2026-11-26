import { Page, Locator } from '@playwright/test';


export class SearchResultsPage {
  private readonly page: Page;
  private readonly sortButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.sortButton = page.getByTestId('dropdown-sorting-button');
  }


  async filterByColor(color: string): Promise<void> {
    const colorCheckbox = this.page.getByRole('checkbox', { name: new RegExp(`^${color}`, 'i') });
    const response = this.waitForSearchResponse();
    await colorCheckbox.click();
    await response;
  }

  async sortBy(option: string): Promise<void> 
  {
    await this.sortButton.click();
    const response=this.waitForSearchResponse();
    await this.page.getByRole('option',{name:option, exact:true}).click();
    await response;

  }


  private waitForSearchResponse() {
    return this.page.waitForResponse(
      (r) => r.url().includes('/api/plp/search') && r.ok()
    );
  }
}