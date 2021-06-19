import { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from "../../queries";
import Menu from "../../components/menu";
import ItemCard from "../../components/itemCard";
import { useParams } from "react-router-dom";
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "../../queries";
import styles from "./styles.module.css"

const ListScreen = () => {
  const { id } = useParams();
  const [categoryId, setCategoryId] = useState(id ? id : 1);
  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);
  const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART);
  const { data } = useQuery(GET_PRODUCTS, {
    variables: {
      categoryId: parseInt(categoryId)
    }
  });

  const onItemSelected = (id) => {
    setCategoryId(id);
  }

  return (
    <Menu onItemSelected={onItemSelected}>
      <div className={styles.cardContainer}>
        {data &&
          data.getProducts &&
          data.getProducts.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))
        }
      </div>
    </Menu>
  );
}

export default ListScreen;