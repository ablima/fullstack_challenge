import ReactLoading from 'react-loading';
import styles from "./styles.module.css";

const LoadingOverlay = (props) => {
  return (
    <>
      {props.visible &&
        <div className={styles.overlay}>
          <div className={styles.loading}>
            <ReactLoading className={styles.spinner} type="spin" height={50} width={50} />
            <h3>{props.text}</h3>
          </div>
        </div>
      }
    </>
  );
}

export default LoadingOverlay;