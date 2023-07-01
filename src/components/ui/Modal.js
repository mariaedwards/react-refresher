import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = ({ onClose }) => {
  return <div onClick={onClose} className={classes.backdrop}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = ({ onClose, children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('overlays')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById('overlays')
      )}
    </>
  );
};

export default Modal;
