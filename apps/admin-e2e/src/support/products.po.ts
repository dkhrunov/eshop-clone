import { CreateProductDto } from '@esc/product/models';

export const createProduct = (product: CreateProductDto) => {
  const { name, brand, price, countInStock, description, richDescription } =
    product;

  cy.visit('products');
  cy.get('[data-cy=createProductButton]').click();
  cy.get('[data-cy=createProductName]').type(name ?? '');
  cy.get('[data-cy=createProductBrand]').type(brand ?? '');
  cy.get('[data-cy=createProductPrice]').type(String(price));
  cy.get('[data-cy=createProductCountInStock]').type(String(countInStock));
  cy.get('[data-cy=createProductCategory]').click();
  cy.get('nz-option-item').first().click();
  cy.get('[data-cy=createProductIsFeatured]').click();
  cy.get('[data-cy=createProductDescription]').type(description ?? '');
  cy.get('[data-cy=createProductRichDescription]')
    .find('.ql-editor')
    .type(richDescription ?? '');
  cy.get('[data-cy=createProductImage]')
    .attachFile('image.jpeg')
    .trigger('change');
  cy.get('[data-cy=createProductButton]').click();

  cy.get('[data-cy=productResult]').contains('Great, product is saved!');

  cy.get('[data-cy="productFormGoBack"]').click();
};

export const getProductsList = () => {
  return cy.get('[data-cy=product]');
};

export const deleteProduct = (name: string): void => {
  cy.get('[data-cy=product]')
    .contains(name)
    .parent()
    .find('[data-cy=deleteProductConfirmation]')
    .click();
};

export const updateProduct = (name: string, newName: string) => {
  cy.contains(name)
    .parent('tr')
    .within(() => {
      cy.get('[data-cy=editProduct]').click();
    });

  cy.get('[data-cy=createProductName]')
    .should('contain.value', name)
    .clear()
    .type(newName);

  cy.get('[data-cy=updateProductButton]').click();
  cy.get('[data-cy=productFormGoBack]').should('be.visible').click();
};
