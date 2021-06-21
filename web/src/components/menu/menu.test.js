import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CATEGORIES } from '../../queries';
import Menu from './index';

const mocks = [
  {
    request: {
      query: GET_CATEGORIES
    },
    result: {
      data: {
        getCategories: [
          {
            name: "Categoria 1"
          },
          {
            name: "Categoria 2"
          },
          {
            name: "Categoria 3"
          },
          {
            name: "Categoria 4"
          }
        ]
      }
    }
  }
];

test('Check if render is correct', () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Menu />
    </MockedProvider>    
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});