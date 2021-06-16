import { useHistory } from "react-router-dom";
import Menu from "../../components/menu";

const DetailsScreen = () => {
  const history = useHistory();

  const onItemSelected = (id) => {
    history.push("/" + id);
  }

  return (
    <Menu onItemSelected={onItemSelected}>
      <div>
        <h1>Details</h1>
      </div>
    </Menu>    
  );
}

export default DetailsScreen;