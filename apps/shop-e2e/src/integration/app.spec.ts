import {
  generateProduct,
  generateCategory,
  generateUser,
  generateNonExistentUUID,
  pickRandomCategories,
  generateOrderItems,
  generateOrder,
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
import { createOrderOnServer } from '../support/order.po';
import { ProductEntity } from '@esc/product/models';
import { OrderItem } from '@esc/order/models';
import { UserFromServer } from '@esc/user/models';

describe('Eshop Clone', () => {
  const randomNumberOfProducts = generateRandom().integer({ min: 1, max: 3 });
  const generatedProducts = Array.from({
    length: randomNumberOfProducts,
  }).map(() => generateProduct());

  const createdProductsOnServer: ProductEntity[] = [];

  const randomNumberOfUsers = generateRandom().integer({ min: 2, max: 3 });
  const generatedUsers = Array.from({
    length: randomNumberOfUsers,
  }).map(() => generateUser());

  const createdUsersOnServer: UserFromServer[] = [];
  const userTokensMap = new Map<string, string>();

  const category = generateCategory();
  let createdCategoryId: string;

  let orderItems: OrderItem[];

  before(() => {
    cy.visit('/');

    for (const user of generatedUsers) {
      registerUserOnServer(user).then(({ body: { user: newUser } }) => {
        createdUsersOnServer.push(newUser);

        loginUserOnServer(user.email, user.password).then(
          ({ body: { token } }) => {
            userTokensMap.set(newUser.id, token);

            createCategoryOnServer({ ...category }, token).then(
              ({ body: { id: categoryId } }) => {
                createdCategoryId = categoryId;

                for (const product of generatedProducts) {
                  createProductOnServer(product, categoryId, token).then(
                    ({ body: product }) => {
                      createdProductsOnServer.push(product);
                    }
                  );
                }
              }
            );
          }
        );
      });
    }
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
        const [{ id }] = createdUsersOnServer;
        const token = userTokensMap.get(id) as string;

        getAllUsersFromServer(token)
          .its('body')
          .each((user) => {
            expect(user).to.include.keys(['name', 'id', 'email']);
          });
      });

      it('Get User', () => {
        const [{ id }] = createdUsersOnServer;
        const token = userTokensMap.get(id) as string;

        getUserFromServer(id, token).then(({ body: { id: foundId } }) => {
          expect(foundId).to.equal(id);
        });
      });

      it('Get User Count', () => {
        const [{ id }] = createdUsersOnServer;
        const token = userTokensMap.get(id) as string;

        getAllUsersFromServer(token).then(({ body }) => {
          expect(body.length).to.above(0);

          getUserCount(token).then(({ status, body: { user_count } }) => {
            expect(status).to.be.eq(200);
            expect(user_count).to.be.eq(user_count);
          });
        });
      });

      it('Update User', () => {
        const [{ id, name }] = createdUsersOnServer;
        const token = userTokensMap.get(id) as string;

        updateUserOnServer(
          id,
          {
            name: 'Updated Name',
          },
          token
        ).then(({ body: { user } }) => {
          expect(user.name).to.equal('Updated Name');

          updateUserOnServer(
            id,
            {
              name,
            },
            token
          )
            .its('body.user.name')
            .should('eq', name);
        });
      });

      it('Restrict unauthorized access', () => {
        const [{ id }] = createdUsersOnServer;
        const token = userTokensMap.get(id) as string;

        getAllUsersFromServer('TOKEN NOT EXIST')
          .its('body.message')
          .should('equal', 'Unauthorized');

        getAllUsersFromServer(token).its('body').should('have.length.above', 0);
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
        const [{ id }] = createdUsersOnServer;
        const token = userTokensMap.get(id) as string;

        createCategoryOnServer({ ...category }, token)
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
        const [{ id }] = createdUsersOnServer;
        const token = userTokensMap.get(id) as string;

        getAllCategoriesFromServer().then(({ body: [category] }) => {
          updateCategoryOnServer(
            category.id,
            { ...category, name: 'Updated Category' },
            token
          ).then(({ body: { name } }) => {
            expect(name).to.be.eq('Updated Category');

            updateCategoryOnServer(category.id, { ...category }, token)
              .its('body')
              .should('deep.equal', category);
          });
        });
      });

      it('Create Product', () => {
        const [product] = generatedProducts;
        const [{ id }] = createdUsersOnServer;
        const token = userTokensMap.get(id) as string;

        getAllCategoriesFromServer().then(({ body: [category] }) => {
          createProductOnServer(product, category.id, token)
            .its('body')
            .should('deep.include', product);
        });
      });

      it('Get Product By Id', () => {
        const [product] = generatedProducts;
        const [{ id }] = createdUsersOnServer;
        const token = userTokensMap.get(id) as string;

        getAllCategoriesFromServer().then(({ body: [category] }) => {
          createProductOnServer(product, category.id, token).then(
            ({ body: newProduct }) => {
              getProductFromServer(newProduct.id)
                .its('body')
                .should('deep.include', product);
            }
          );
        });
      });

      it('Update Product', () => {
        const [{ id, name: oldName }] = createdProductsOnServer;
        const [{ id: userId }] = createdUsersOnServer;
        const token = userTokensMap.get(userId) as string;

        updateProductOnServer(id, { name: 'Updated Product Name' }, token).then(
          ({ body: { name } }) => {
            expect(name).to.be.eq('Updated Product Name');

            updateProductOnServer(id, { name: oldName }, token)
              .its('body.name')
              .should('eq', oldName);
          }
        );
      });

      it('Delete Product', () => {
        const [{ id: userId }] = createdUsersOnServer;
        const token = userTokensMap.get(userId) as string;
        const productForDelete = generateProduct();

        createProductOnServer(productForDelete, createdCategoryId, token).then(
          ({ body: { id } }) => {
            deleteProductOnServer(id, token).then(({ status }) => {
              expect(status).to.be.eq(200);
            });
          }
        );
      });
      it('Delete Product Validate Id', () => {
        const [{ id: userId }] = createdUsersOnServer;
        const token = userTokensMap.get(userId) as string;

        deleteProductOnServer(generateNonExistentUUID(), token)
          .its('status')
          .should('eq', 404);
      });

      it('Create Product Validate Category', () => {
        const [product] = generatedProducts;
        const [{ id: userId }] = createdUsersOnServer;
        const token = userTokensMap.get(userId) as string;

        const nonExistentCategoryId = generateNonExistentUUID();

        createProductOnServer(product, nonExistentCategoryId, token)
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
      it.only('Create Order', () => {
        orderItems = generateOrderItems(createdProductsOnServer);
        console.log(generateOrder(orderItems));
      });
    });
  });
});
