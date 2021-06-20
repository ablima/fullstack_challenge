const server = require('../../server');
const { gql } = require('apollo-server-express');

it('should have at least one product', async () => {
  const result = await server.executeOperation({
    query: gql`
      query {
        getOrders{
          products{
            id
          }
        }
      }
    `
  });
  
  expect(result.errors).toBeUndefined();
  expect(result.data).toHaveProperty("getOrders");

  if(result.data.getOrders.length > 0){
    result.data.getOrders.map(order => {
      expect(order).toHaveProperty("products");
      expect(order.products.length).toBeGreaterThan(0);
    });
  }
})

afterAll(() => {
  return server.stop();
});