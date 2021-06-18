import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "../../queries";
import { useMutation } from "@apollo/client";
import { addToCart, removeFromCart } from "../../storage";
import { toast } from 'react-toastify';
import styles from "./styles.module.css";

const ItemList = (props) => {
  const product = props.data;

  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART, {
    onCompleted: () => {
      addToCart(product);
    },
    onError: (error) => {
      if(error.message.includes("Product out of stock")){
        toast.error("Produto fora de estoque.");
      }else{
        toast.error("Erro ao adicionar produto.");
      }
    }
  });

  const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART, {
    onCompleted: () => {
      removeFromCart(product);
    }
  });

  const addProduct = () => {
    addProductToCart({
      variables: {
        id: product.id
      }
    });
  }

  const removeProduct = () => {
    removeProductFromCart({
      variables: {
        id: product.id
      }
    });
  }

  const getItemStyle = () => {
    let classes = [styles.itemContainer];
    classes.push(props.resized ? styles.itemResized : styles.item);
    return classes.join(" ");
  }

  return (
    <div className={getItemStyle()}>
      <span>{product?.name}</span>
      {props.resized && 
        <span> - {product?.qnt}</span>
      }
      {!props.resized &&
        <>
          <button onClick={removeProduct}>-</button>
          <span>{product?.qnt}</span>
          <button onClick={addProduct}>+</button>
        </>
      }      
    </div>
  );
}

export default ItemList;