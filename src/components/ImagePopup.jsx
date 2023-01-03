import React from "react";

function ImagePopup(props){
  return(
    <div id="image-popup" className={ `popup popup_img_active ${ props.isOpen ? 'popup_open' : '' }` }>
        <div className="popup__img-container">
          <button type="button" className="popup__btn-close" onClick={props.onClose}></button>
          <img src={ props.card.link } className="popup__image" alt={ props.card.name }/>
          <p className="popup__description">{ props.card.name }</p>
        </div>
    </div>
  )
}

export default ImagePopup;