// Import the necessary modules for testing
const fetchMock = require('fetch-mock');
const { Products, UI } = require('./script');

// Mock the fetch function to return a sample response
fetchMock.get('https://66086258a2a5dd477b146c41.mockapi.io/products', {
  status: 200,
  body: [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ]
});

describe('Products', () => {
  let products;

  beforeEach(() => {
    products = new Products();
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('should fetch products from the API', async () => {
    const result = await products.getProducts();
    expect(result).toEqual([
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 }
    ]);
  });
});

describe('UI', () => {
  let ui;

  beforeEach(() => {
    ui = new UI();
  });

  it('should display products', () => {
    const products = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 }
    ];
    const consoleSpy = jest.spyOn(console, 'log');
    ui.displayProducts(products);
    expect(consoleSpy).toHaveBeenCalledWith(products);
  });
});