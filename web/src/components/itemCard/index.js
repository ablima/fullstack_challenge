import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";

const ItemCard = (props) => {
  const history = useHistory();

  const onItemClicked = () => {
    history.push("/details/" + props.product.id);
  }

  return (
    <div onClick={onItemClicked} className={styles.card}>
      {props.product &&
        <h1>{props.product.name}</h1>
      }
    </div>    
  );
}

export default ItemCard;