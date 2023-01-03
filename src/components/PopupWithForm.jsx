import React from "react";

function PopupWithForm(props){
return(
  <div id={`popup-${props.name}`} className={ `popup ${ props.isOpen ? 'popup_open' : '' }` }>
      <div className="popup__conteiner">
        <button className="popup__btn-close" type="button" onClick={props.isClose}></button>
        <form className="popup__form-edit" id={`${props.name}-form`} name={`${props.name}`} noValidate>
          <h3 className="popup__title">{props.title}</h3>
          { props.children }
          <button className="popup__btn-submit" type="submit" disabled>{props.btnText}</button>
        </form>
      </div>
    </div> 
)
}

export default PopupWithForm;