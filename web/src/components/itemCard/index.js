import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { addToCart } from "../../storage";
import { toast } from "react-toastify";
import { ADD_PRODUCT_TO_CART } from "../../queries";
import styles from "./styles.module.css";

const ItemCard = (props) => {
  const data = props.product;
  const history = useHistory();

  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART, {
    onCompleted: () => {
      addToCart(data);
    },
    onError: (error) => {
      if(error.message.includes("Product out of stock")){
        toast.error("Produto fora de estoque.");
      }else{
        toast.error("Erro ao adicionar produto.");
      }
    }
  });

  const onItemClicked = () => {
    history.push("/details/" + data.id);
  }

  const onAddToCartClicked = () => {
    addProductToCart({
      variables: {
        id: data.id
      }
    });
  }

  return (
    <div className={styles.card}>
      <div onClick={onItemClicked}>
        {props.product &&
          <div>
            <h1>{data.name}</h1>
            <h3>Estoque: {data.qnt}</h3>
          </div>          
        }
      </div>
      <div onClick={onAddToCartClicked} className={styles.addButton}>
        Adicionar ao carrinho
      </div>
    </div>    
  );
}

export default ItemCard;