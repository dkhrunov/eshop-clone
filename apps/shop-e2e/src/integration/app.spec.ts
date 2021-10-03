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
  deleteCategoryOnServer,
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
import {
  createOrderOnServer,
  deleteOrderOnServer,
  getAllOrdersFromServer,
  getOrderCount,
  getOrderFromServer,
  getTotalSales,
  getUserOrders,
  updateOrderStatus,
} from '../support/order.po';
import { ProductEntity } from '@esc/product/models';
import { OrderEntity, OrderItem } from '@esc/order/models';
import { UserFromServer } from '@esc/user/models';
import { environment } from '@env/environment';
import {
  addFeaturedProductsToCart,
  addToCartButtons,
  categoriesFilters,
  isNumberCategoriesEqualFoundResults,
  listProducts,
  registerAndLoginUser,
} from '../support/shop-product';

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

  const createdOrdersOnServer: Partial<OrderEntity>[] = [];

  before(() => {
    cy.visit('/');
    cy.clearLocalStorageSnapshot();

    for (const user of generatedUsers) {
      registerUserOnServer(user).then(({ body: newUser }) => {
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

                orderItems = generateOrderItems(createdProductsOnServer);
                const newOrder = generateOrder(orderItems);

                createOrderOnServer(newOrder, token).then(
                  ({ body: createdOrder }) => {
                    createdOrdersOnServer.push(createdOrder);
                  }
                );
              }
            );
          }
        );
      });
    }
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  context('Users API', () => {
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
      const [{ id }] = createdUsersOnServer;
      const token = userTokensMap.get(id) as string;

      const userForDelete = generateUser();
      userForDelete.name = 'User for delete';

      registerUserOnServer(userForDelete).then(({ body: user }) => {
        getUserFromServer(user.id, token).its('body').should('deep.include', {
          id: user.id,
          name: 'User for delete',
        });

        deleteUserOnServer(user.id, token)
          .its('body.entityDeleted')
          .should('eq', user.id);

        getUserFromServer(user.id, token)
          .its('body.message')
          .should('eq', 'Not Found');
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
      ).then(({ body: user }) => {
        expect(user.name).to.equal('Updated Name');

        updateUserOnServer(
          id,
          {
            name,
          },
          token
        )
          .its('body.name')
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

  context('Products API', () => {
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
        for (const { isFeatured } of products) {
          expect(isFeatured).to.be.eq(true);
        }
      });
    });

    it.skip('Delete Category', () => {
      const [{ id }] = createdUsersOnServer;
      const token = userTokensMap.get(id) as string;

      getAllCategoriesFromServer().then(({ body: [category] }) => {
        deleteCategoryOnServer(category.id, token).then(
          ({ body: { categoryDeleted } }) => {
            expect(categoryDeleted).to.be.eq(category.id);

            getCategoryFromServer(category.id)
              .its('body.message')
              .should('eq', 'Not Found');
          }
        );
      });
    });

    it('Get Featured Products with limit', () => {
      const limit = generateRandom().integer({ min: 3, max: 10 });

      getFeaturedProducts(limit).then(({ body: products }) => {
        for (const { isFeatured } of products) {
          expect(isFeatured).to.be.eq(true);
        }

        expect(products).to.have.length.of.at.most(limit);
      });
    });

    it('Upload product image', () => {
      const [{ id: userId }] = createdUsersOnServer;
      const token = userTokensMap.get(userId) as string;

      cy.fixture('image').then((image) => {
        const blob = Cypress.Blob.base64StringToBlob(image, 'image/jpeg');
        const randomImageName = generateNonExistentUUID();
        const myHeaders = new Headers({
          Authorization: `Bearer ${token}`,
        });
        const formData = new FormData();
        formData.append('image', blob, `${randomImageName}.jpeg`);

        fetch(`${environment.baseUrlApi}/uploads`, {
          method: 'POST',
          headers: myHeaders,
          body: formData,
        })
          .then((response) => response.json())
          .then(({ imageUrl }) => {
            expect(imageUrl).to.be.include(randomImageName);

            fetch(`${environment.baseUrlApi}/uploads/${randomImageName}.jpeg`, {
              method: 'GET',
              headers: myHeaders,
            }).then(({ status }) => {
              expect(status).to.be.eq(200);
            });
          });
      });
    });

    it.skip('Upload product image - Validate extension', () => {
      const [{ id: userId }] = createdUsersOnServer;
      const token = userTokensMap.get(userId) as string;

      cy.fixture('image').then((image) => {
        const blob = Cypress.Blob.base64StringToBlob(
          image,
          'image/notextension'
        );
        const randomImageName = generateNonExistentUUID();
        const myHeaders = new Headers({
          Authorization: `Bearer ${token}`,
        });
        const formData = new FormData();
        formData.append('image', blob, `${randomImageName}.jpeg`);

        fetch(`${environment.baseUrlApi}/uploads`, {
          method: 'POST',
          headers: myHeaders,
          body: formData,
        })
          .then((response) => response.json())
          .then(({ imageUrl }) => {
            expect(imageUrl).to.be.include(randomImageName);

            fetch(`${environment.baseUrlApi}/uploads/${randomImageName}.jpeg`, {
              method: 'GET',
              headers: myHeaders,
            }).then(({ status }) => {
              expect(status).to.be.eq(500);
            });
          });
      });
    });
    it('Upload gallery images', () => {
      const [{ id: userId }] = createdUsersOnServer;
      const token = userTokensMap.get(userId) as string;
      const [{ id: productId }] = createdProductsOnServer;

      cy.fixture('image').then((imageOne) => {
        cy.fixture('imageTwo').then((imageTwo) => {
          const blobOne = Cypress.Blob.base64StringToBlob(
            imageOne,
            'image/jpeg'
          );
          const blobTwo = Cypress.Blob.base64StringToBlob(
            imageTwo,
            'image/jpeg'
          );
          const randomImageNameOne = generateNonExistentUUID();
          const randomImageNameTwo = generateNonExistentUUID();
          const myHeaders = new Headers({
            Authorization: `Bearer ${token}`,
          });
          const formData = new FormData();
          formData.append('images', blobOne, `${randomImageNameOne}.jpeg`);
          formData.append('images', blobTwo, `${randomImageNameTwo}.jpeg`);

          fetch(`${environment.baseUrlApi}/uploads/gallery/${productId}`, {
            method: 'PUT',
            headers: myHeaders,
            body: formData,
          })
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              // expect(imageUrl).to.be.include(randomImageName);

              // fetch(
              //   `${environment.baseUrlApi}/uploads/${randomImageName}.jpeg`,
              //   {
              //     method: 'GET',
              //     headers: myHeaders,
              //   }
              // ).then(({ status }) => {
              //   expect(status).to.be.eq(200);
              // });
            });
        });
      });
    });
  });

  context('Orders API', () => {
    it('Create Order', () => {
      const [{ id: userId }] = createdUsersOnServer;
      const token = userTokensMap.get(userId) as string;

      orderItems = generateOrderItems(createdProductsOnServer);
      const newOrder = generateOrder(orderItems);

      createOrderOnServer(newOrder, token).then(
        ({ body: createdOrder, status }) => {
          expect(createdOrder).to.include.keys(newOrder);
          expect(status).to.be.eql(201);
        }
      );
    });

    it('List All orders', () => {
      const [{ id: userId }] = createdUsersOnServer;
      const token = userTokensMap.get(userId) as string;
      const [, exampleOrder] = createdOrdersOnServer;

      getAllOrdersFromServer(token).then(({ body: orderList, status }) => {
        for (const order of orderList) {
          expect(order).to.include.keys(exampleOrder);
        }
        expect(status).to.be.eql(200);
      });
    });
    it('Get order', () => {
      const [{ id: userId }] = createdUsersOnServer;
      const token = userTokensMap.get(userId) as string;
      const [, searchOrder] = createdOrdersOnServer;

      getOrderFromServer(searchOrder.id as string, token).then(
        ({ body: foundOrder, status }) => {
          expect(foundOrder).to.include.keys(searchOrder);
          expect(status).to.be.eql(200);
        }
      );
    });
    it('Update order status', () => {
      const [{ id: userId }] = createdUsersOnServer;
      const token = userTokensMap.get(userId) as string;
      const [, { id }] = createdOrdersOnServer;

      updateOrderStatus(id as string, 'DELIVERED', token).then(
        ({ body: { status: orderStatus }, status }) => {
          expect(orderStatus).to.be.eq('DELIVERED');
          expect(status).to.be.eql(200);
        }
      );

      updateOrderStatus(id as string, 'SHIPPED', token).then(
        ({ body: { status: orderStatus }, status }) => {
          expect(orderStatus).to.be.eq('SHIPPED');
          expect(status).to.be.eql(200);
        }
      );

      updateOrderStatus(id as string, 'STATUSNOTEXIST', token).then(
        ({
          body: {
            message: [error],
          },
          status,
        }) => {
          expect(error).to.be.eql('status must be a valid enum value');
          expect(status).to.be.eql(400);
        }
      );
    });

    it('Delete Order', () => {
      const [{ id: userId }] = createdUsersOnServer;
      const token = userTokensMap.get(userId) as string;

      orderItems = generateOrderItems(createdProductsOnServer);
      const newOrder = generateOrder(orderItems);

      createOrderOnServer(newOrder, token).then(({ body: { id } }) => {
        deleteOrderOnServer(id, token).then(({ body: { entityDeleted } }) => {
          expect(entityDeleted).to.be.eql(id);
        });
      });
    });

    it('Get Total Sales', () => {
      const [{ id: userId }] = createdUsersOnServer;
      const token = userTokensMap.get(userId) as string;

      getTotalSales(token).its('body.total_sales').should('be.greaterThan', 0);
    });
    it('Get Order Count', () => {
      const [{ id: userId }] = createdUsersOnServer;
      const token = userTokensMap.get(userId) as string;

      getAllOrdersFromServer(token).then(({ body: allOrders }) => {
        getOrderCount(token)
          .its('body.order_count')
          .should('eq', allOrders.length);
      });
    });
    it('Get User Orders', () => {
      const [, { user: userId }] = createdOrdersOnServer;
      const token = userTokensMap.get(userId as string) as string;

      getUserOrders(userId as string, token).then(({ body: orders }) => {
        for (const { user } of orders) {
          expect(user).to.deep.include({ id: userId });
        }
      });
    });
  });

  context('Shop', () => {
    it('Show main page', () => {
      cy.visit(`${environment.baseUrlFrontShop}`);
      cy.get('[data-cy=header]').should('be.visible');
      cy.get('[data-cy=productsBanner]').should('be.visible');
      cy.get('[data-cy=categoryItems]').should('be.visible');
      cy.get('[data-cy=productItems]').should('be.visible');
      cy.get('[data-cy=footer]').should('be.visible');
    });

    it('Home banner shows all products', () => {
      cy.visit(`${environment.baseUrlFrontShop}`);
      cy.get('[data-cy=productsBanner]').click();
      cy.url().should('eq', `${environment.baseUrlFrontShop}/products`);
    });
    it('Category item shows product with category', () => {
      cy.visit(`${environment.baseUrlFrontShop}`);

      cy.get('[data-cy=categoryItems]')
        .children()
        .first()
        .find('h3')
        .then((el) => {
          const categoryName = el.text();

          cy.wrap(el).parent().click();

          cy.url().should(
            'eq',
            `${environment.baseUrlFrontShop}/products?categories=${categoryName}`
          );
        });
    });

    it('Categories filter shows filtered products', () => {
      cy.visit(`${environment.baseUrlFrontShop}/products`);

      isNumberCategoriesEqualFoundResults();

      categoriesFilters()
        .first()
        .click()
        .then((name) => {
          const categoryName = name.text().trim();

          cy.url().should('contain', categoryName);

          isNumberCategoriesEqualFoundResults();
        });

      categoriesFilters()
        .eq(1)
        .click()
        .then((name) => {
          const categoryName = name.text().trim();

          cy.url().should('contain', categoryName);

          isNumberCategoriesEqualFoundResults();
        });
    });

    it('Show product details', () => {
      cy.visit(`${environment.baseUrlFrontShop}/products`);
      listProducts()
        .first()
        .find('h3')
        .then((name) => {
          const productName = name.text();

          cy.wrap(name).parent().click();

          cy.get('.productInfo').contains(productName);
          cy.get('.productDescription').should('exist');
        });
    });

    it('Show count items in cart', () => {
      cy.visit(`${environment.baseUrlFrontShop}`);

      cy.get('[data-cy=countBadge]').should('not.exist');

      addToCartButtons().first().click();

      cy.get('[data-cy=countBadge]').should('exist').and('contain', 1);

      addToCartButtons().first().click();

      cy.get('[data-cy=countBadge]').should('exist');

      cy.get('.ant-scroll-number').invoke('attr', 'title').should('eq', `${2}`);

      addToCartButtons().first().click();

      cy.get('.ant-scroll-number').invoke('attr', 'title').should('eq', `${3}`);

      addToCartButtons().first().parent().click();

      cy.get('[data-cy="quantitySelector"]').click();

      cy.get('nz-option-item').eq(2).click();

      addToCartButtons().first().click();

      cy.get('.ant-scroll-number').invoke('attr', 'title').should('eq', `${6}`);

      cy.get('nz-rate li').first().click();
      cy.get('nz-rate li').last().prev().click();

      cy.visit(`${environment.baseUrlFrontShop}/products`);

      addToCartButtons().first().click();

      cy.get('.ant-scroll-number').invoke('attr', 'title').should('eq', `${7}`);
    });

    it('Add product to cart and checkout', () => {
      cy.clearLocalStorage();
      cy.reload();
      cy.get('[data-cy=countBadge]').should('not.exist');

      addFeaturedProductsToCart();

      cy.get('.ant-scroll-number').invoke('attr', 'title').should('eq', `${4}`);

      cy.get('[data-cy="countBadge"]').click();

      cy.get('[data-cy="itemsCount"]').should('contain', 4);

      cy.get('[data-cy=deleteItemButton]').first().click();

      cy.get('[data-cy="itemsCount"]').should('contain', 3);

      cy.get('[data-cy=deleteItemButton]').first().click({ force: true });

      cy.get('[data-cy="itemsCount"]').should('contain', 2);

      cy.get('[data-cy=deleteItemButton]').first().click({ force: true });

      cy.get('[data-cy="itemsCount"]').should('contain', 1);

      cy.get('[data-cy=deleteItemButton]').first().click({ force: true });

      cy.get('[data-cy="itemsCount"]').should('contain', 'No items');
    });

    it('Checkout cart items', () => {
      registerAndLoginUser();
      addFeaturedProductsToCart();
      cy.get('[data-cy="countBadge"]').click();

      cy.get('[data-cy="orderItem"]').its('length').should('eq', 4);

      cy.get('[data-cy=checkoutButton]').click();

      cy.get('[data-cy=checkoutForm]').should('be.visible');
      cy.get('[data-cy=checkoutResult]').should('not.exist');
      cy.get('[data-cy=placeOrderButton]').click();
      cy.get('.ant-result-title').contains('Thank you! Your order is created!');
    });
  });
});
