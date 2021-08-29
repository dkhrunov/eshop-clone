import {
  generateProduct,
  generateCategory,
  generateUser,
  generateNonExistentUUID,
  pickRandomCategories,
} from '@esc/shared/util-helpers';
import { Chance as generateRandom } from 'chance';
import {
  deleteUserOnServer,
  getUserCount,
  getUserFromServer,
  getAllUsersFromServer,
  loginUserOnServer,
  registerUserOnServer,
  updateUserOnServer,
} from '../support/user.po';
import {
  createCategoryOnServer,
  createProductOnServer,
  deleteProductOnServer,
  getAllCategoriesFromServer,
  getAllProductsFromServer,
  getCategoryFromServer,
  getFeaturedProducts,
  getProductFromServer,
  getProductsCount,
  getProductsWithCategory,
  updateCategoryOnServer,
  updateProductOnServer,
} from '../support/product.po';

describe('Eshop Clone', () => {
  const userOne = generateUser();
  let userOneId: string;
  let userOneToken: string;

  const product = generateProduct();
  let createdProductId: string;

  const category = generateCategory();
  let createdCategoryId: string;

  before(() => {
    cy.visit('/');

    registerUserOnServer(userOne).then(({ body }) => {
      userOneId = body.user.id;

      loginUserOnServer(userOne.email, userOne.password).then(({ body }) => {
        userOneToken = body.token;

        createCategoryOnServer({ ...category }, userOneToken).then(
          ({ body: { id } }) => {
            createdCategoryId = id;

            createProductOnServer(product, id, userOneToken).then(
              ({ body: { id } }) => {
                createdProductId = id;
              }
            );
          }
        );
      });
    });
  });

  context('Users', () => {
    context('API', () => {
      it('Register User', () => {
        const newUser = generateUser();
        registerUserOnServer(newUser);
      });

      it('Login User', () => {
        const newUser = generateUser();

        registerUserOnServer(newUser);

        loginUserOnServer(newUser.email, newUser.password)
          .its('body.token')
          .should('be.a', 'string');

        loginUserOnServer(newUser.email, 'wrongpassword')
          .its('body.message')
          .should('eq', 'Invalid credentials');
      });

      it('Delete User', () => {
        const userForDelete = generateUser();
        userForDelete.name = 'User for delete';

        registerUserOnServer(userForDelete).then(({ body: { user } }) => {
          loginUserOnServer(userForDelete.email, userForDelete.password).then(
            ({ body: { token } }) => {
              getUserFromServer(user.id, token)
                .its('body')
                .should('deep.include', {
                  id: user.id,
                  name: 'User for delete',
                });

              deleteUserOnServer(user.id, token)
                .its('body.affected')
                .should('eq', 1);

              getUserFromServer(user.id, token)
                .its('body.message')
                .should('eq', 'Not Found');
            }
          );
        });
      });

      it('List Users', () => {
        getAllUsersFromServer(userOneToken)
          .its('body')
          .each((user) => {
            expect(user).to.include.keys(['name', 'id', 'email']);
          });
      });

      it('Get User', () => {
        getUserFromServer(userOneId, userOneToken).then(({ body }) => {
          expect(body.id).to.equal(userOneId);
        });
      });

      it('Get User Count', () => {
        getAllUsersFromServer(userOneToken).then(({ body }) => {
          expect(body.length).to.above(0);

          getUserCount(userOneToken).then(
            ({ status, body: { user_count } }) => {
              expect(status).to.be.eq(200);
              expect(user_count).to.be.eq(user_count);
            }
          );
        });
      });

      it('Update User', () => {
        getAllUsersFromServer(userOneToken).then(({ body: [user] }) => {
          const userFromServer = user.id;
          const userOneName = user.name;

          updateUserOnServer(
            userFromServer,
            {
              name: 'Updated Name',
              password: 'Updated Password',
            },
            userOneToken
          ).then(({ body: { user } }) => {
            expect(user.name).to.equal('Updated Name');

            updateUserOnServer(
              userFromServer,
              {
                name: userOneName,
              },
              userOneToken
            )
              .its('body.user.name')
              .should('eq', userOneName);
          });
        });
      });

      it('Restrict unauthorized access', () => {
        const newUser = generateUser();

        getAllUsersFromServer('TOKEN NOT EXIST')
          .its('body.message')
          .should('equal', 'Unauthorized');

        registerUserOnServer(newUser).then(() => {
          loginUserOnServer(newUser.email, newUser.password).then(
            ({ body: { token } }) => {
              getAllUsersFromServer(token)
                .its('body')
                .should('have.length.above', 0);
            }
          );
        });
      });
    });
  });

  context('Products', () => {
    context('API', () => {
      it('List Categories', () => {
        getAllCategoriesFromServer().then((response) => {
          expect(response.status).to.be.eq(200);
        });
      });
      it('Create Category', () => {
        createCategoryOnServer({ ...category }, userOneToken)
          .its('body')
          .should('include.all.keys', category);
      });

      it('Get Category By Id', () => {
        getAllCategoriesFromServer().then(({ body: [category] }) => {
          getCategoryFromServer(category.id)
            .its('body')
            .should('deep.equal', category);
        });
      });

      it('Update Category', () => {
        getAllCategoriesFromServer().then(({ body: [category] }) => {
          updateCategoryOnServer(
            category.id,
            { ...category, name: 'Updated Category' },
            userOneToken
          ).then(({ body: { name } }) => {
            expect(name).to.be.eq('Updated Category');

            updateCategoryOnServer(category.id, { ...category }, userOneToken)
              .its('body')
              .should('deep.equal', category);
          });
        });
      });

      it('Create Product', () => {
        getAllCategoriesFromServer().then(({ body: [category] }) => {
          createProductOnServer(product, category.id, userOneToken)
            .its('body')
            .should('deep.include', product);
        });
      });

      it('Get Product By Id', () => {
        getAllCategoriesFromServer().then(({ body: [category] }) => {
          createProductOnServer(product, category.id, userOneToken).then(
            ({ body: newProduct }) => {
              getProductFromServer(newProduct.id)
                .its('body')
                .should('deep.include', product);
            }
          );
        });
      });

      it('Update Product', () => {
        updateProductOnServer(
          createdProductId,
          { name: 'Updated Product Name' },
          userOneToken
        ).then(({ body: { name } }) => {
          expect(name).to.be.eq('Updated Product Name');

          updateProductOnServer(
            createdProductId,
            { name: product.name },
            userOneToken
          )
            .its('body.name')
            .should('eq', product.name);
        });
      });

      it('Delete Product', () => {
        const productForDelete = generateProduct();

        createProductOnServer(
          productForDelete,
          createdCategoryId,
          userOneToken
        ).then(({ body: { id } }) => {
          deleteProductOnServer(id, userOneToken).then(({ status }) => {
            expect(status).to.be.eq(200);
          });
        });
      });
      it('Delete Product Validate Id', () => {
        deleteProductOnServer(generateNonExistentUUID(), userOneToken)
          .its('status')
          .should('eq', 404);
      });

      it('Create Product Validate Category', () => {
        const nonExistentCategoryId = generateNonExistentUUID();

        createProductOnServer(product, nonExistentCategoryId, userOneToken)
          .its('body')
          .should('deep.equal', {
            error: 'Not Found',
            message: 'Category not found',
            statusCode: 404,
          });
      });
      it('Get Products', () => {
        getAllProductsFromServer().then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body.length).to.above(0);
        });
      });
      it('Get Products with Category', () => {
        getAllCategoriesFromServer().then(({ body: categories }) => {
          const { allCategoriesMap, allCategoriesNames } =
            pickRandomCategories(categories);

          getProductsWithCategory(allCategoriesNames).then(
            ({ status, body: products }) => {
              expect(status).to.be.eq(200);

              for (const {
                category: { id },
              } of products) {
                expect(id).to.be.oneOf([...allCategoriesMap.keys()]);
              }
            }
          );
        });
      });
      it('Get Product Count', () => {
        getAllProductsFromServer().then(({ body: products }) => {
          expect(products.length).to.above(0);

          getProductsCount()
            .its('body.product_count')
            .should('eq', products.length);
        });
      });
      it('Get All Featured Products', () => {
        getFeaturedProducts().then(({ body: products }) => {
          for (const { is_featured } of products) {
            expect(is_featured).to.be.eq(true);
          }
        });
      });

      it('Get Featured Products with limit', () => {
        const limit = generateRandom().integer({ min: 3, max: 10 });

        getFeaturedProducts(limit).then(({ body: products }) => {
          for (const { is_featured } of products) {
            expect(is_featured).to.be.eq(true);
          }

          expect(products).to.have.length.of.at.most(limit);
        });
      });
    });
  });

  context('Orders', () => {
    context('API', () => {
      it('Create Order', () => {
        //
      });
    });
  });
});
