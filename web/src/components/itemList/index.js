import { useState } from "react";
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "../../queries";
import { useMutation } from "@apollo/client";
import { addToCart, removeFromCart } from "../../storage";
import { toast } from 'react-toastify';
import styles from "./styles.module.css";

const ItemList = (props) => {
  const product = props.data;
  const [inputQnt, setInputQnt] = useState(product.qnt);
  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);
  const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART);

  const addProduct = (qnt) => {
    addProductToCart({
      variables: {
        id: product.id,
        qnt: qnt
      }
    }).then(() => {
      addToCart(product, qnt);
      setInputQnt(product.qnt);
    }).catch((error) => {
      if(error.message.includes("Product out of stock")){
        toast.error("Produto fora de estoque.");
      }else{
        toast.error("Erro ao adicionar produto.");
      }
      setInputQnt(product.qnt);
    });
  }

  const removeProduct = (qnt) => {
    if(product.qnt > 1){
      removeProductFromCart({
        variables: {
          id: product.id,
          qnt: qnt
        }
      }).then(() => {
        removeFromCart(product, qnt);
        setInputQnt(product.qnt);
      }).catch(() => {
        toast.error("Erro ao remover produto");
        setInputQnt(product.qnt);
      });
    }
  }

  const removeAll = () => {
    removeProductFromCart({
      variables: {
        id: product.id,
        qnt: product.qnt
      }
    }).then(() => {
      removeFromCart(product, product.qnt);
    });
  }

  const getItemStyle = () => {
    let classes = [styles.itemContainer];
    classes.push(props.resized ? styles.itemResized : styles.item);
    return classes.join(" ");
  }

  const onInputChange = (e) => {
    setInputQnt(e.target.value);
  }

  const onInputBlur = () => {
    if(inputQnt <= 0){
      setInputQnt(product.qnt);
      toast.error("Valor deve ser maior que 0.");
      return;
    }

    let diff = product.qnt - inputQnt;

    if(diff == 0)
      return;

    if(diff > 0){
      removeProduct(diff);
    }else{
      addProduct(-diff);
    }
  }

  return (
    <div className={getItemStyle()}>
      <span>{product?.name}</span>
      {props.resized && 
        <span> - {product?.qnt}</span>
      }
      {!props.resized &&
        <>
          <button onClick={() => removeProduct(1)}>-</button>
          <input onBlur={onInputBlur} onChange={onInputChange} value={inputQnt} />
          <button onClick={() => addProduct(1)}>+</button>
        </>
      }
      <button onClick={removeAll}>Remover</button>
    </div>
  );
}

export default ItemList;