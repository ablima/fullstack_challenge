import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';
import { GET_PRODUCTS } from '../../queries';
import ListScreen from './index';

const mocks = [
  {
    request: {
      query: GET_PRODUCTS
    },
    result: {
      data: {
        getProducts: [
          {
            name: "Produto",
            description: {},
            qnt: 5,
            price: 100,
            categoryId: 1,
            thumbnails: "images/celular1-1.jpg"
          },
          {
            name: "Produto 2",
            description: {},
            qnt: 5,
            price: 100,
            categoryId: 2,
            thumbnails: "images/celular1-1.jpg;images/celular1-2.jpg"
          }
        ]
      }
    }
  }
];

test('Check if render is correct', () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/1"]}>
        <ListScreen />
      </MemoryRouter>      
    </MockedProvider>    
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});