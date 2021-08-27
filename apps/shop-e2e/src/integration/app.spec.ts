import { environment } from '../../../../environments/environment';
import {
  generateProduct,
  generateCategory,
  generateNonExistentCategoryId,
  generateNonExistentProductId,
  generateUser,
} from '@esc/shared/util-helpers';
import {
  CategoryEntity,
  ProductEntity,
  ProductEntityWithCategory,
} from '@esc/product/entities';
import { Chance as generateRandom } from 'chance';
import { RegisterUserResponse, UserEntity } from '@esc/user/entities';

describe('Eshop Clone', () => {
  const baseUrlProducts = `${environment.baseUrlApi}/products`;
  const baseUrlUsers = `${environment.baseUrlApi}/users`;
  const baseUrlCategories = `${environment.baseUrlApi}/categories`;

  const userOne = generateUser();
  let userOneId: string;

  before(() => cy.visit('/'));

  context('Products', () => {
    context('API', () => {
      const product = generateProduct();
      const category = generateCategory();
      let createdCategoryId: string;
      let createdProductId: string;

      it('List Categories', () => {
        cy.request({
          url: baseUrlCategories,
          method: 'GET',
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(200);
        });
      });
      it('Create Category', () => {
        cy.request({
          url: baseUrlCategories,
          method: 'POST',
          body: {
            ...category,
            name: 'New Category',
          },
          failOnStatusCode: false,
        }).then((response) => {
          createdCategoryId = response.body.id;
          expect(response.body.name).to.be.eq('New Category');
          expect(response.status).to.be.eq(201);
        });
      });

      it('Get Category By Id', () => {
        cy.request({
          url: `${baseUrlCategories}/${createdCategoryId}`,
          method: 'GET',
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.body.id).to.be.eq(createdCategoryId);
        });
      });

      it('Update Category', () => {
        cy.request({
          url: `${baseUrlCategories}/${createdCategoryId}`,
          method: 'PUT',
          body: {
            ...category,
          },
          failOnStatusCode: false,
        }).then((response) => {
          createdCategoryId = response.body.id;
          expect(response.status).to.be.eq(200);
          expect(response.body.name).to.be.eq(category.name);
        });
      });

      it('Create Product', () => {
        cy.request({
          url: baseUrlProducts,
          method: 'POST',
          body: {
            ...product,
            category: createdCategoryId,
          },
          failOnStatusCode: false,
        }).then((response) => {
          createdProductId = response.body.id;
          expect(response.status).to.be.eq(201);
        });
      });

      it('Get Product By Id', () => {
        cy.request({
          url: `${baseUrlProducts}/${createdProductId}`,
          method: 'GET',
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body.id).to.be.eq(createdProductId);
          cy.log(response.body.category);
        });
      });

      it('Update Product', () => {
        cy.request({
          url: `${baseUrlProducts}/${createdProductId}`,
          method: 'PUT',
          body: {
            description: 'Updated Description',
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body.description).to.be.eq('Updated Description');
        });

        cy.request({
          url: `${baseUrlProducts}/${createdProductId}`,
          method: 'PUT',
          body: {
            description: product.description,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body.description).to.be.eq(product.description);
        });
      });

      it('Delete Product', () => {
        cy.request({
          url: baseUrlProducts,
          method: 'POST',
          body: {
            ...generateProduct(),
            name: 'Temporary Product',
            category: createdCategoryId,
          },
          failOnStatusCode: false,
        }).then((response) => {
          cy.request({
            url: `${baseUrlProducts}/${response.body.id}`,
            method: 'DELETE',
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.be.eq(200);
          });
        });
      });
      it('Delete Product Validate Id', () => {
        cy.request({
          url: `${baseUrlProducts}/${generateNonExistentProductId()}`,
          method: 'DELETE',
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(404);
        });
      });

      it('Create Product Validate Category', () => {
        cy.request({
          url: baseUrlProducts,
          method: 'POST',
          body: {
            ...product,
            category: generateNonExistentCategoryId(),
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(404);
          expect(response.body.message).to.be.eq('Category not found');
        });
      });
      it('Get Products', () => {
        cy.request({
          url: baseUrlProducts,
          method: 'GET',
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body.length).to.above(0);
        });
      });
      it('Get Products with Category', () => {
        const randomCategoriesMap = new Map<string, string>();
        let randomCategoriesNames: string;

        cy.request({
          url: baseUrlCategories,
          method: 'GET',
          failOnStatusCode: false,
        }).then((response) => {
          generateRandom()
            .pickset<CategoryEntity>(
              response.body,
              generateRandom().integer({
                min: 1,
                max: 3,
              })
            )
            .forEach((category: CategoryEntity) => {
              randomCategoriesMap.set(category.id, category.name);
            });

          randomCategoriesNames = [...randomCategoriesMap.values()].join(',');

          expect(response.status).to.be.eq(200);

          cy.request<ProductEntityWithCategory[]>({
            url: `${baseUrlProducts}?categories=${randomCategoriesNames}`,
            method: 'GET',
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.be.eq(200);

            for (const product of response.body) {
              expect(product.category.id).to.be.oneOf([
                ...randomCategoriesMap.keys(),
              ]);
            }
          });
        });
      });
      it('Get Product Count', () => {
        let product_count: number;

        cy.request({
          url: baseUrlProducts,
          method: 'GET',
          failOnStatusCode: false,
        }).then((response) => {
          product_count = response.body.length;
          expect(response.body.length).to.above(0);

          cy.request({
            url: `${baseUrlProducts}/count`,
            method: 'GET',
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.be.eq(200);
            expect(response.body.product_count).to.be.eq(product_count);
          });
        });
      });
      it('Get All Featured Products', () => {
        cy.request({
          url: `${baseUrlProducts}/featured`,
          method: 'GET',
          failOnStatusCode: false,
        }).then((response) => {
          response.body.forEach((product: ProductEntity) => {
            expect(product.is_featured).to.be.eq(true);
          });
        });
      });

      it('Get Featured Products with limit', () => {
        const limit = generateRandom().integer({ min: 3, max: 10 });

        cy.request({
          url: `${baseUrlProducts}/featured/${limit}`,
          method: 'GET',
          failOnStatusCode: false,
        }).then((response) => {
          response.body.forEach((product: ProductEntity) => {
            expect(product.is_featured).to.be.eq(true);
          });

          expect(response.body.length).to.be.eq(limit);
        });
      });
    });
  });

  context('Users', () => {
    context('API', () => {
      it('Register User', () => {
        cy.request<RegisterUserResponse>({
          url: `${baseUrlUsers}`,
          method: 'POST',
          body: {
            ...userOne,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.body.registered_user).to.not.have.property(
            'password'
          );
        });
      });
      it.only('List Users', () => {
        cy.request<UserEntity[]>({
          url: `${baseUrlUsers}`,
          method: 'GET',
          failOnStatusCode: false,
        }).then(({ body }) => {
          body.forEach((user) => {
            expect(user).to.include.keys(['name', 'id', 'email']);
          });
        });
      });

      it.only('Get User', () => {
        cy.request<UserEntity[]>({
          url: `${baseUrlUsers}`,
          method: 'GET',
          failOnStatusCode: false,
        }).then(({ body }) => {
          userOneId = body[0].id;

          cy.request<UserEntity>({
            url: `${baseUrlUsers}/${userOneId}`,
            method: 'GET',
            failOnStatusCode: false,
          }).then(({ body }) => {
            expect(body.id).to.equal(userOneId);
          });
        });
      });
    });
  });
});
