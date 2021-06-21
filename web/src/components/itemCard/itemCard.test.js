import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { ADD_PRODUCT_TO_CART } from '../../queries';
import ItemCard from './index';

const mocks = [
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

const product = {
  name: "Produto",
  description: {},
  qnt: 5,
  price: 100,
  categoryId: 1,
  thumbnails: "images/celular1-1.jpg"
}

test('Check if render is correct', () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ItemCard product={product} />
    </MockedProvider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});