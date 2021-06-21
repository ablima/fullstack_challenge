import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';
import { CREATE_ORDER } from '../../queries';
import CheckoutScreen from './index';

const mocks = [
  {
    request: {
      query: CREATE_ORDER,
      variables: {
        order: {
          cardNumber: "0000111122223333",
          userId: 1,
          products: [
            {
              id: 17,
              qnt: 1
            },
            {
              id:18,
              qnt: 3
            }
          ]
        }
      }
    },
    result: {}
  }
];

test('Check if render is correct', () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/checkout"]}>
        <CheckoutScreen />
      </MemoryRouter>
    </MockedProvider>    
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});