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

export const GET_CATEGORIES = gql`
  query {
    getCategories{
      id
      name
    }
  }
`;