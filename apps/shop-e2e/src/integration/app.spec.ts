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
import { UserResponse, UserEntity, LoginResponse } from '@esc/user/entities';

describe('Eshop Clone', () => {
  const baseUrlProducts = `${environment.baseUrlApi}/products`;
  const baseUrlUsers = `${environment.baseUrlApi}/users`;
  const baseUrlCategories = `${environment.baseUrlApi}/categories`;

  const userOne = generateUser();
  let userOneToken: string;
  let userOneId: string;

  before(() => cy.visit('/'));

  context('Users', () => {
    context('API', () => {
      it('Register User', () => {
        cy.request<UserResponse>({
          url: `${baseUrlUsers}`,
          method: 'POST',
          body: {
            ...userOne,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.body.user).to.not.have.property('password');
        });
      });

      it('Login User', () => {
        const newUser = generateUser();

        cy.request<UserResponse>({
          url: `${baseUrlUsers}`,
          method: 'POST',
          body: {
            ...newUser,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.body.user).to.not.have.property('password');

          cy.request<LoginResponse>({
            url: `${baseUrlUsers}/login`,
            method: 'POST',
            body: {
              email: userOne.email,
              password: userOne.password,
            },
            failOnStatusCode: false,
          }).then((response) => {
            userOneToken = response.body.token;
            expect(response.body).to.have.property('token');
          });

          cy.request({
            url: `${baseUrlUsers}/login`,
            method: 'POST',
            body: {
              email: userOne.email,
              password: 'wrongpassword',
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.body.message).to.be.eql('Invalid credentials');
          });
        });
      });

      it('Delete User', () => {
        const userForDelete = generateUser();
        let userForDeleteId: string;

        cy.request<UserResponse>({
          url: `${baseUrlUsers}`,
          method: 'POST',
          body: {
            ...userForDelete,
            name: 'User For Delete',
          },
          failOnStatusCode: false,
        }).then((response) => {
          userForDeleteId = response.body.user.id;
          expect(response.body.user).to.not.have.property('password');

          cy.request({
            url: `${baseUrlUsers}/${userForDeleteId}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${userOneToken}`,
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.body.id).to.be.eql(userForDeleteId);
          });

          cy.request({
            url: `${baseUrlUsers}/${userForDeleteId}`,
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${userOneToken}`,
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.body.affected).to.be.eql(1);
          });

          cy.request({
            url: `${baseUrlUsers}/${userForDeleteId}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${userOneToken}`,
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.body.message).to.be.eql('Not Found');
          });
        });
      });

      it('List Users', () => {
        cy.request<UserEntity[]>({
          url: `${baseUrlUsers}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userOneToken}`,
          },
          failOnStatusCode: false,
        }).then(({ body }) => {
          body.forEach((user) => {
            expect(user).to.include.keys(['name', 'id', 'email']);
          });
        });
      });

      it('Get User', () => {
        cy.request<UserEntity[]>({
          url: `${baseUrlUsers}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userOneToken}`,
          },
          failOnStatusCode: false,
        }).then(({ body }) => {
          userOneId = body[0].id;

          cy.request<UserEntity>({
            url: `${baseUrlUsers}/${userOneId}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${userOneToken}`,
            },
            failOnStatusCode: false,
          }).then(({ body }) => {
            expect(body.id).to.equal(userOneId);
          });
        });
      });

      it('Get User Count', () => {
        let user_count: number;

        cy.request({
          url: baseUrlUsers,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userOneToken}`,
          },
          failOnStatusCode: false,
        }).then((response) => {
          user_count = response.body.length;
          expect(response.body.length).to.above(0);

          cy.request({
            url: `${baseUrlUsers}/count`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${userOneToken}`,
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.be.eq(200);
            expect(response.body.user_count).to.be.eq(user_count);
          });
        });
      });

      it('Update User', () => {
        cy.request<UserEntity[]>({
          url: `${baseUrlUsers}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userOneToken}`,
          },
          failOnStatusCode: false,
        }).then(({ body }) => {
          userOneId = body[0].id;
          const userOneName = body[0].name;

          cy.request<UserResponse>({
            url: `${baseUrlUsers}/${userOneId}`,
            method: 'PUT',
            body: {
              name: 'Updated Name',
              password: 'Updated Password',
            },
            headers: {
              Authorization: `Bearer ${userOneToken}`,
            },
            failOnStatusCode: false,
          }).then(({ body }) => {
            expect(body.user.name).to.equal('Updated Name');

            cy.request<UserResponse>({
              url: `${baseUrlUsers}/${userOneId}`,
              method: 'PUT',
              body: {
                name: userOneName,
              },
              headers: {
                Authorization: `Bearer ${userOneToken}`,
              },
              failOnStatusCode: false,
            }).then(({ body }) => {
              expect(body.user.name).to.equal(userOneName);
            });
          });
        });
      });

      it('Restrict unauthorized access', () => {
        const userTwo = generateUser();
        let userTwoToken: string;

        cy.request({
          url: `${baseUrlUsers}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer NOTWORKINGTOKEN`,
          },
          failOnStatusCode: false,
        })
          .its('body.message')
          .should('equal', 'Unauthorized');

        cy.request<UserResponse>({
          url: `${baseUrlUsers}`,
          method: 'POST',
          body: {
            ...userTwo,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.body.user).to.not.have.property('password');

          cy.request<LoginResponse>({
            url: `${baseUrlUsers}/login`,
            method: 'POST',
            body: {
              email: userOne.email,
              password: userOne.password,
            },
            failOnStatusCode: false,
          }).then((response) => {
            userTwoToken = response.body.token;
            expect(response.body).to.have.property('token');

            cy.request({
              url: `${baseUrlUsers}`,
              method: 'GET',
              headers: {
                Authorization: `Bearer ${userTwoToken}`,
              },
              failOnStatusCode: false,
            })
              .its('body')
              .should('have.length.above', 0);
          });
        });
      });
    });
  });

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
          headers: {
            Authorization: `Bearer ${userOneToken}`,
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
          headers: {
            Authorization: `Bearer ${userOneToken}`,
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
          headers: {
            Authorization: `Bearer ${userOneToken}`,
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
          headers: {
            Authorization: `Bearer ${userOneToken}`,
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
          headers: {
            Authorization: `Bearer ${userOneToken}`,
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
          headers: {
            Authorization: `Bearer ${userOneToken}`,
          },
          failOnStatusCode: false,
        }).then((response) => {
          cy.request({
            url: `${baseUrlProducts}/${response.body.id}`,
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${userOneToken}`,
            },
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
          headers: {
            Authorization: `Bearer ${userOneToken}`,
          },
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
          headers: {
            Authorization: `Bearer ${userOneToken}`,
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
});
