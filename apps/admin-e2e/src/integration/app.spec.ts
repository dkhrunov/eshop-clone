import {
  generateCategory,
  generateProduct,
  generateUser,
} from '@esc/shared/util-helpers';

import {
  createCategory,
  deleteCategory,
  getCategoriesList,
  mapCategoriesToNames,
  updateCategory,
} from '../support/categories.po';
import { getOrders } from '../support/orders.po';
import {
  createProduct,
  deleteProduct,
  getProductsList,
  updateProduct,
} from '../support/products.po';
import {
  createUser,
  listUsers,
  loginUser,
  registerUser,
} from '../support/users.po';

describe('Admin App', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.viewport(600, 500);
    cy.viewport(1000, 800);
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  context('Users', () => {
    it('Register / Login User', () => {
      cy.visit('register');

      const newUser = generateUser();

      registerUser(newUser);

      cy.url().should('contain', 'login');

      loginUser({ email: newUser.email, password: newUser.password });

      cy.url().should('contain', 'dashboard');
    });

    it('List users', () => {
      cy.visit('users');
    });

    it('Create User', () => {
      const newUser = generateUser();

      console.log(newUser);

      createUser(newUser);

      cy.visit('users');

      // listUsers().should('contain', newUser.name);
    });

    it('Update User', () => {
      const newUser = generateUser();

      createUser(newUser);

      cy.visit('users');

      // listUsers()
      //   .contains(newUser.name)
      //   .parent('tr')
      //   .within(() => {
      //     cy.get('[data-cy=editUser]').click();
      //   });

      // cy.get('[data-cy=registerUserName]')
      //   .should('contain.value', newUser.name)
      //   .clear()
      //   .type('Updated Name');

      // cy.get('[data-cy=saveUserButton]').click();

      // listUsers()
      //   .contains('Updated Name')
      //   .parent('tr')
      //   .within(() => {
      //     cy.get('[data-cy=editUser]').click();
      //   });

      // cy.get('[data-cy=registerUserName]')
      //   .should('contain.value', 'Updated Name')
      //   .clear()
      //   .type(newUser.name);

      // cy.get('[data-cy=saveUserButton]').click();

      // listUsers().contains(newUser.name);
    });

    it('Delete User', () => {
      cy.visit('users');

      listUsers()
        .then(({ length }) => length)
        .then((length) => {
          listUsers()
            .first()
            .within(() => {
              cy.get('[data-cy=deleteUser]').click();
            });

          cy.get('.deleteConfirm').within(() => {
            cy.get('button').contains('Yes').click();
          });

          // listUsers().should('have.length', length - 1);
        });
    });
  });

  context('Categories', () => {
    it('Delete Category', () => {
      const category = generateCategory();
      const { name } = category;

      createCategory(category);

      deleteCategory(name);

      cy.get('button').contains('No').click().should('not.exist');

      deleteCategory(name);

      cy.get('button').contains('Yes').click().should('not.exist');
    });

    it('Create category', () => {
      const category = generateCategory();
      const { name } = category;

      createCategory(category);

      cy.get('[data-cy=category]').should('contain', name);
    });

    it('Edit category', () => {
      const category = generateCategory();
      const { name } = category;

      createCategory(category);

      updateCategory(name, 'Updated Category');

      updateCategory('Updated Category', name);

      cy.contains(name);
    });

    it('List categories', () => {
      cy.visit('categories');
      getCategoriesList().each((category) => {
        cy.wrap(category).should('be.visible');
      });
    });

    it('Sort categories', () => {
      cy.visit('categories');

      cy.get('[data-cy=sortTableByName]').click();

      getCategoriesList()
        .then(mapCategoriesToNames)
        .then((unsortedCategories) => {
          const sortedCategories = unsortedCategories.slice().sort();
          expect(unsortedCategories).to.be.deep.eq(sortedCategories);
        });

      cy.get('[data-cy=sortTableByName]').click();

      getCategoriesList()
        .then(mapCategoriesToNames)
        .then((unsortedCategories) => {
          const sortedCategories = unsortedCategories
            .slice()
            .sort((a: string, b: string) => b.localeCompare(a));
          expect(unsortedCategories).to.be.deep.eq(sortedCategories);
        });
    });
  });

  context('Products', () => {
    it('List products', () => {
      cy.visit('products');
    });
    it('Create product', () => {
      const product = generateProduct();

      createProduct(product);

      getProductsList().should('contain', product.name);
    });
    it('Delete product', () => {
      const product = generateProduct();
      const { name } = product;

      createProduct(product);

      deleteProduct(name);

      cy.get('button').contains('Yes').click().should('not.exist');
    });

    it('Edit product', () => {
      const product = generateProduct();
      const { name } = product;

      createProduct(product);

      updateProduct(name, 'Updated Product');

      updateProduct('Updated Product', name);

      cy.contains(name);
    });
  });

  context('Orders', () => {
    it('List Orders', () => {
      cy.visit('orders');
    });

    it('Update order status', () => {
      cy.visit('orders');

      getOrders()
        .first()
        .within(() => {
          cy.get('[data-cy=editOrder]').click();
        });

      cy.get('[data-cy=selectOrderStatus]').click();
      cy.get('nz-option-item')
        .not('.ant-select-item-option-selected')
        .first()
        .click();

      cy.get('.ant-drawer-close').click();
    });
  });

  context('Dashboard', () => {
    it('Show main dashboard', () => {
      cy.visit('dashboard');
    });
  });
});
