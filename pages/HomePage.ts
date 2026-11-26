import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  private readonly searchInput: Locator;



  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: /Buscar por producto/i });

  }


  async open(): Promise<void> {
    await this.page.goto('/');
  }


  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}