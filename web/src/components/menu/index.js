import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { slide as MenuSlider } from 'react-burger-menu';
import { useCategories } from '../../hooks/categories';
import CartButton from '../cartButton';
import StoreLogo from '../../assets/icons/storeLogo.png';
import styles from "./styles.module.css";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const Menu = (props) => {
  const history = useHistory();
  const categories = useCategories();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [isOpen, setIsOpen] = useState(false);

  const onStateChange = (state) => {
    setIsOpen(state.isOpen);
  }

  const menuItemClick = (itemId) => {
    props.onItemSelected(itemId);
    setIsOpen(false);
  }

  const goToHome = () => {
    history.push("/");
  }

  const renderCategories = () => {
    return (
      <div className={styles.categoriesContainer}>
        {categories &&
          categories.map(item => (
            <a onClick={() => menuItemClick(item.id)} className={styles.item}>
              <h2>{item.name}</h2>
            </a>
          ))}
      </div>
    );
  }

  return (
    <div id="outer-container">
      <div id="header" className={styles.header}>
        {isMobile &&
          <MenuSlider
            isOpen={isOpen}
            onStateChange={onStateChange}
            pageWrapId={"page-wrap"} 
            outerContainerId={"outer-container"}>
            {categories &&
              categories.map(item => (
                <a key={item.id} onClick={() => menuItemClick(item.id)}>
                  {item.name}
                </a>
              ))
            }
          </MenuSlider>
        }
        <img onClick={goToHome} src={StoreLogo} className={styles.logo} />
        <CartButton className={styles.cartIcon} />
      </div>
      <main id="page-wrap">
        <div className={styles.mainContent}>
          {!isMobile && renderCategories()}
          {props.children}
        </div>
      </main>      
    </div>
  );
}

export default Menu;