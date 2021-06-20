const server = require('../../server');
const { gql } = require('apollo-server-express');

it('should have 4 categories available', async () => {
  const result = await server.executeOperation({
    query: gql`
      query {
        getCategories{
          id
        }
      }
    `
  });
  
  expect(result.errors).toBeUndefined();
  expect(result.data).toHaveProperty("getCategories");
  expect(result.data.getCategories.length).toBe(4);
})

afterAll(() => {
  return server.stop();
});