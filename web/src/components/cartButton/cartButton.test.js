import React from 'react';
import renderer from 'react-test-renderer';
import CartButton from './index';

test('Check if render is correct', () => {
  const component = renderer.create(
    <CartButton />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});