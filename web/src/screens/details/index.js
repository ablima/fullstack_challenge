import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, ADD_PRODUCT_TO_CART } from "../../queries";
import { Carousel } from "react-responsive-carousel";
import { STATIC_URL } from "../../constants";
import { addToCart } from "../../storage";
import { toast } from 'react-toastify';
import { priceFormatter } from "../../utils";
import Menu from "../../components/menu";
import styles from "./styles.module.css";

const DetailsScreen = () => {  
  const { id } = useParams();
  const history = useHistory();
  const [inputQnt, setInputQnt] = useState(1);
  const [product, setProduct] = useState(null);
  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);
  const { data } = useQuery(GET_PRODUCTS, {
    variables: {
      id: parseInt(id)
    }
  });

  useEffect(() => {
    if(data && data.getProducts){
      let productData = Object.assign({}, data.getProducts[0]);
      productData.thumbnails = productData.thumbnails.split(";");
      productData.description = JSON.parse(productData.description);
      setProduct(productData);
    }
  }, [data]);

  const onItemSelected = (id) => {
    history.push("/" + id);
  }

  const onInputChange = (e) => {
    if(e.target.value > 0){
      setInputQnt(parseInt(e.target.value));
    }
  }

  const addProduct = () => {
    addProductToCart({
      variables: {
        id: product.id,
        qnt: inputQnt
      }
    }).then(() => {
      addToCart(product, inputQnt);
      toast.success("Item adicionado ao carrinho.");
    }).catch((error) => {
      if(error.message.includes("Product out of stock")){
        toast.error("Estoque insuficiente.");
      }else{
        toast.error("Erro ao adicionar produto.");
      }
    });
  }

  return (
    <Menu onItemSelected={onItemSelected}>
      <div>
        {product &&
          <div>
            <div className={styles.root}>
              <div className={styles.carousel}>
                <Carousel showStatus={false}>
                  {product.thumbnails.map(thumbnail => (
                    <img src={STATIC_URL + thumbnail} />
                  ))}
                </Carousel>
              </div>
              <div className={styles.info}>
                <h2>{product.name}</h2>
                <br/>
                <h1>{priceFormatter.format(product.price)}</h1>
                <br/>
                <div className={styles.qntInput}>
                  <h4>Quantidade:</h4>
                  <button onClick={() => setInputQnt(inputQnt - 1 > 0 ? inputQnt - 1 : inputQnt)}>-</button>
                  <input onChange={onInputChange} value={inputQnt} />
                  <button onClick={() => setInputQnt(inputQnt + 1)}>+</button>                
                </div>
                <br/>
                <button className={styles.addButton} onClick={addProduct}>Adicionar ao carrinho</button>
              </div>
            </div>
            <div className={styles.details}>
              <h2>Detalhes</h2>
              <table>
                {Object.keys(product.description).map(key => (
                  <tr>
                    <td>{key}</td>
                    <td>{product.description[key]}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        }
      </div>
    </Menu>    
  );
}

export default DetailsScreen;