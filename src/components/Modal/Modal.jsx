import { Component } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot=document.querySelector('#modal-root')

export class Modal extends Component {


    render() {
         return createPortal(
    <div className={css.Overlay}>
      <div className={css.Modal}>
       {this.props.children}
      </div>
             </div>,
             modalRoot
  );
}

 
}
