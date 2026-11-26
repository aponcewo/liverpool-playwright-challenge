import { Product } from '../pages/SearchResultsPage';


export interface ValidationResult {
  matches: number;
  discrepancies: string[];
}


export function compareProducts(uiProducts: Product[], apiProducts: Product[]): ValidationResult {
  let matches = 0;
  const discrepancies: string[] = [];


  for (const uiProduct of uiProducts) {
    const apiProduct = apiProducts.find((p) => p.id === uiProduct.id);


    if (!apiProduct) {
      discrepancies.push(`Product ${uiProduct.id} (${uiProduct.name}) not found in the API response`);
      continue;
    }


    matches++;


    if (apiProduct.name.trim() !== uiProduct.name) {
      discrepancies.push(`Name mismatch for ${uiProduct.id}: UI "${uiProduct.name}" vs API "${apiProduct.name}"`);
    }
    if (apiProduct.price !== uiProduct.price) {
      discrepancies.push(`Price mismatch for ${uiProduct.id}: UI ${uiProduct.price} vs API ${apiProduct.price}`);
    }
  }


  return { matches, discrepancies };
}