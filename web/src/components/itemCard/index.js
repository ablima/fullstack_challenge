import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { addToCart } from "../../storage";
import { toast } from "react-toastify";
import { ADD_PRODUCT_TO_CART } from "../../queries";
import { STATIC_URL } from "../../constants";
import { priceFormatter } from "../../utils";
import styles from "./styles.module.css";

const ItemCard = (props) => {
  const data = props.product;
  const thumbnails = data.thumbnails.split(";");
  const history = useHistory();
  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);

  const onItemClicked = () => {
    history.push("/details/" + data.id);
  }

  const onAddToCartClicked = () => {
    addProductToCart({
      variables: {
        id: data.id,
        qnt: 1
      }
    }).then(() => {
      addToCart(data, 1);
      toast.success("Item adicionado ao carrinho.");
    }).catch((error) => {
      if(error.message.includes("Product out of stock")){
        toast.error("Produto fora de estoque.");
      }else{
        toast.error("Erro ao adicionar produto.");
      }
    });
  }

  return (
    <div className={styles.card}>
      <div id="cardButton" onClick={onItemClicked} className={styles.cardInfo}>
        {props.product &&
          <div>
            <img src={STATIC_URL + thumbnails[0]} />
            <h3>{data.name}</h3>
            <h2>{priceFormatter.format(data.price)}</h2>
          </div>          
        }
      </div>
      <div id="addButton" onClick={onAddToCartClicked} className={styles.addButton}>
        Adicionar ao carrinho
      </div>
    </div>    
  );
}

export default ItemCard;