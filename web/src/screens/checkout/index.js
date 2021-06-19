import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useReactiveVar } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { cart, clearCart } from "../../storage";
import { CREATE_ORDER } from "../../queries";
import { toast } from 'react-toastify';
import { priceFormatter } from "../../utils";
import LoadingOverlay from "../../components/loadingOverlay";
import ItemList from "../../components/itemList";
import Menu from "../../components/menu";
import styles from "./styles.module.css";

const onlyNumberPattern = /\d+/g;

const CheckoutScreen = () => {
  const [isPayment, setIsPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const cartItems = useReactiveVar(cart());
  const history = useHistory();
  const [createOrder] = useMutation(CREATE_ORDER);

  if(cartItems.total == 0){
    if(!overlayVisible){
      toast.info("O carrinho está vazio.");
    }
    history.push("/");
  }

  const onItemSelected = (id) => {
    history.push("/" + id);
  }  

  const finishCheckout = () => {
    setOverlayVisible(true);

    let products = [];
    cartItems.products.map(product => {
      products.push({
        id: product.id,
        qnt: product.qnt
      });      
    });

    createOrder({
      variables: {
        order: {
          cardNumber: cardNumber.split("-").join(""),
          userId: 1,
          products: products  
        }
      }
    }).then(() => {
      toast.success("Compra realizada com sucesso!");
      clearCart();
    }).catch((error) => {
      setOverlayVisible(false);
      if(error.message.includes("Credit card not approved")){
        toast.error("Compra não aprovada.");
      }else if(error.message.includes("Invalid credit card")){
        toast.error("Número do cartão inválido.");
      }else{
        toast.error("Erro ao finalizar compra.");
      }
    });
  }

  const getTotalPrice = () => {
    let total = 0.0;
    cartItems.products.map(product => {
      total += (product.price * product.qnt);
    });

    return total.toFixed(2);
  }

  const onCardNumberChange = (e) => {
    let input = e.target.value.split("-").join("");
    input = input.match(onlyNumberPattern)?.join("");
    
    if(input?.length > 0){
      input = input.match(new RegExp('.{1,4}', 'g')).join("-");
      setCardNumber(input);
    }else{
      setCardNumber("");
    }
  }

  return (
    <>
      <LoadingOverlay visible={overlayVisible} text="Processando..." />
      <Menu onItemSelected={onItemSelected}>
        <div className={styles.root}>
          {!isPayment &&
            <div className={styles.infoContainer}>
              <h1>Carrinho</h1>
              {cartItems.products.map(product => (
                <ItemList data={product} />
              ))}
            </div>
          }
          {isPayment && 
            <div className={styles.infoContainer}>
              <span onClick={() => setIsPayment(false)} className={styles.backButton}>Voltar</span>
              <h1>Pagamento</h1>
              <h2>Forma de pagamento</h2>
              <div className={styles.paymentOption}>
                Cartão de crédito
              </div>
              <br/>
              <label for="cardNumber">Numero do cartao</label>
              <br/>
              <input 
                id="cardNumber"
                maxLength={19}
                onChange={onCardNumberChange}
                value={cardNumber}
                className={styles.cardInput}
                placeholder="Digite o número"
              />
            </div>
          }
          <div className={styles.checkoutContainer}>
            <h3>Total: {priceFormatter.format(getTotalPrice())}</h3>
            {!isPayment ?
              <button onClick={() => setIsPayment(true)}>Comprar</button> :
              <button onClick={finishCheckout} disabled={cardNumber.length != 19}>Finalizar</button>
            }
          </div>        
        </div>
      </Menu>      
    </>
  );
}

export default CheckoutScreen;