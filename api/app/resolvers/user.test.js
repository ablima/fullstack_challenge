const server = require('../../server');
const { gql } = require('apollo-server-express');

it('should bring at least one user', async () => {
  const result = await server.executeOperation({
    query: gql`
      query {
        getUsers{
          id
        }
      }
    `
  });
  
  expect(result.errors).toBeUndefined();
  expect(result.data).toHaveProperty("getUsers");
  expect(result.data.getUsers.length).toBeGreaterThan(0);
})

it('should have a default user named Anderson Lima', async () => {
  const result = await server.executeOperation({
    query: gql`
      query {
        getUsers(name:"Anderson Lima"){
          name
        }
      }
    `
  });

  expect(result.errors).toBeUndefined();
  expect(result.data).toHaveProperty("getUsers");
  expect(result.data.getUsers[0].name).toBe("Anderson Lima");
});

afterAll(() => {
  return server.stop();
});