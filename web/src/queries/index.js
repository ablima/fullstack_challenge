import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
  query Products($id: Int, $name: String, $categoryId: Int){
    getProducts(id: $id, name: $name, categoryId: $categoryId){
      id
      name
      description
      qnt
      price
      thumbnails
    }
  }
`

export const ADD_PRODUCT_TO_CART = gql`
  mutation Product($id: Int, $qnt: Int){
    addProductToCart(id: $id, qnt: $qnt){
      qnt
    }
  }
`;

export const REMOVE_PRODUCT_FROM_CART = gql`
  mutation Product($id: Int, $qnt: Int){
    removeProductFromCart(id: $id, qnt: $qnt){
      qnt
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    getCategories{
      id
      name
    }
  }
`;

export const CREATE_ORDER = gql`  
  mutation Order($order: NewOrder){
    createOrder(order: $order){
      id
    }
  }
`;