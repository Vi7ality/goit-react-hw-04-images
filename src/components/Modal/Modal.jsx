import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal (props) {

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  })

  const handleKeydown = event => {
    if (event.code === 'Escape') {
      props.onClose();
    }
  };

  const onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      props.onClose();
    }
  };

    return createPortal(
      <div className={css.Overlay} onClick={onBackdropClick}>
        <div className={css.Modal}>{props.children}</div>
      </div>,
      modalRoot
    );
}
  
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
}


