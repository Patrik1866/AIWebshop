export interface Product {
    id: number |null;
    name: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    subCategoryId: number;
}