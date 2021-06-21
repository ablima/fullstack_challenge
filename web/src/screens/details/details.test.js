import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';
import { GET_PRODUCTS, ADD_PRODUCT_TO_CART } from '../../queries';
import DetailsScreen from './index';

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: {
        id: 17
      }
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
          }
        ]
      }
    }
  },
  {
    request: {
      query: ADD_PRODUCT_TO_CART,
      variables: {
        id: 17,
        qnt: 1
      }
    },
    result: {}
  }
];

test('Check if render is correct', () => {  
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/details/17"]}>
        <DetailsScreen />
      </MemoryRouter>
    </MockedProvider>    
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});