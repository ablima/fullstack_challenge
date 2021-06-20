const server = require('../../server');
const { gql } = require('apollo-server-express');

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    console.info(str);
    return false;
  }
  return true;
}

it('description should be a valid JSON string', async () => {
  const result = await server.executeOperation({
    query: gql`
      query {
        getProducts{
          description
        }
      }
    `
  });
  
  expect(result.errors).toBeUndefined();
  expect(result.data).toHaveProperty("getProducts");
  result.data.getProducts.map(product => {
    expect(IsJsonString(product.description)).toBe(true);
  })
})

it('should have at least one thumbnail', async () => {
  const result = await server.executeOperation({
    query: gql`
      query {
        getProducts{
          thumbnails
        }
      }
    `
  });
  
  expect(result.errors).toBeUndefined();
  expect(result.data).toHaveProperty("getProducts");
  result.data.getProducts.map(product => {
    expect(product.thumbnails.split(";").length).toBeGreaterThan(0);
  })
})

it('quantity should be greater than 0', async () => {
  const result = await server.executeOperation({
    query: gql`
      query {
        getProducts{
          qnt
        }
      }
    `
  });
  
  expect(result.errors).toBeUndefined();
  expect(result.data).toHaveProperty("getProducts");
  result.data.getProducts.map(product => {
    expect(product.qnt).toBeGreaterThanOrEqual(0);
  })
})

afterAll(() => {
  return server.stop();
});