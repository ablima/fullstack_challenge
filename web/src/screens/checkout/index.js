import { useHistory } from "react-router-dom";
import Menu from "../../components/menu";

const CheckoutScreen = () => {
  const history = useHistory();

  const onItemSelected = (id) => {
    history.push("/" + id);
  }

  return (
    <Menu onItemSelected={onItemSelected}>
      <div>
        <h1>Checkout 2</h1>
      </div>
    </Menu>    
  );
}

export default CheckoutScreen;