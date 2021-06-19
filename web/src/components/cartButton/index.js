import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Animated } from "react-animated-css";
import { useReactiveVar } from '@apollo/client';
import { cart } from "../../storage";
import { priceFormatter } from "../../utils";
import ItemList from "../itemList";
import CartIcon from '../../assets/icons/cart.svg';
import styles from './styles.module.css';

const CartButton = (props) => {
  const history = useHistory();
  const cartItems = useReactiveVar(cart());
  const [cartOpen, setCartOpen] = useState(false);

  const goToCheckout = () => {
    history.push("/checkout");
  }

  const openCartReview = () => {
    setCartOpen(!cartOpen);
  }

  const getTotalPrice = () => {
    let total = 0.0;
    cartItems.products.map(product => {
      total += (product.price * product.qnt);
    });

    return total.toFixed(2);
  }

  return (
    <div className={props.className}>
      {cartItems.total > 0 && 
        <div className={styles.badge}>
          {cartItems.total}
        </div>
      }
      <img onClick={openCartReview} src={CartIcon} className={styles.icon} />
      <Animated
        animateOnMount={false}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInDuration={200}
        animationOutDuration={500}
        isVisible={cartOpen}>
        <div className={styles.cartContainer}>
          {cartItems.total == 0 ?
            <span>Sem produtos no carrinho</span> :
            <>
              <div className={styles.cartItems}>
                {cartItems.products.map(product => (
                  <ItemList resized={true} data={product} />
                ))}
              </div>
              <div className={styles.footer}>
                <span>Total: {priceFormatter.format(getTotalPrice())}</span>
                <button onClick={goToCheckout}>Checkout</button>
              </div>
            </>
          }
        </div> 
      </Animated>
    </div>
  );
}

export default CartButton;