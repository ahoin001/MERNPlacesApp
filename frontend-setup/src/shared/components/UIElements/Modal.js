import React from 'react'
import ReactDOM from "react-dom";
import {CSSTransition} from 'react-transition-group'

import './Modal.css'
import Backdrop from './Backdrop';

/*
    Component that displays list of PlaceItem components
*/
const ModalOverlay = props => {

    const content = (

        //String interpolation here allows us flexobility of passing in our own class name and style object
        <div className={`modal ${props.className}`} style={props.style}>

            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>

            {/* If onsubmit function provided, then use it (it has its wn prevent default), else prevent butttons from refreshing page onsubmit */}
            <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>

                <div className={`modal__content ${props.contentClass}`}>
                    {/* So we can pass as much as we need to here we use children */}
                    {props.children}
                </div>

                <footer className={`footer ${props.footerClass}`}>
                    {props.footer}
                </footer>

            </form>

        </div>
    )

    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));

}


/*
    
*/
const Modal = props => {

    return (

        <React.Fragment>

            {/* If we have true for show prop, render Backdrop, and onClick handle cancellation with prop */}
            {props.show && <Backdrop onClick={props.onCancel} />}

            {/* Animation rules */}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames='modal'
            >

                {/* Actual modal content from above component */}
                {/* ...props will take all props passed in to Modal will be given to Model Overlay as well */}
                <ModalOverlay {...props} />

            </CSSTransition>>

        </React.Fragment>

    )

}

export default Modal
