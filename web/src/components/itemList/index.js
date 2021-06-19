import { useState } from "react";
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "../../queries";
import { useMutation } from "@apollo/client";
import { addToCart, removeFromCart } from "../../storage";
import { toast } from 'react-toastify';
import { priceFormatter } from "../../utils";
import { STATIC_URL } from "../../constants";
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
      toast.success("Produto adicionado ao carrinho");
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
        toast.info("Produto removido do carrinho.");
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
      toast.info("Produto removido do carrinho.");
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

  return product && (
    <div className={getItemStyle()}>
      <div className={styles.infoContainer}>
        <img src={STATIC_URL + product.thumbnails[0]} />        
        {props.resized &&
          <>
            <h5>{product?.name}</h5>
            <h6>Qnt: {product?.qnt}</h6>
            <button className={styles.removeButton} onClick={removeAll}>X</button>
          </>
        }
        {!props.resized &&
          <h4>{product?.name}</h4>
        }
      </div>
      <div className={styles.qntContainer}>
        {!props.resized &&
          <>
            <div className={styles.priceContainer}>
              <h5>Preço:</h5>
              <h5>{priceFormatter.format(product.price)}</h5>
            </div>
            <div className={styles.qntInputContainer}>
              <button onClick={() => removeProduct(1)}>-</button>
              <input onBlur={onInputBlur} onChange={onInputChange} value={inputQnt} />
              <button onClick={() => addProduct(1)}>+</button>
            </div>
            <div className={styles.priceContainer}>
              <h5>Subtotal:</h5>
              <h5>{priceFormatter.format(product.price * product.qnt)}</h5>
            </div>
          </>
        }
      </div>
    </div>
  );

}

export default ItemList;