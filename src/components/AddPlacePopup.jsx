import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props){

  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e){
    e.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }
return(
  <PopupWithForm
        isOpen={props.isOpen}
        isClose={props.isClose}
        onSubmit={handleSubmit}
        name="cards"
        title="Новое место"
        btnText="Создать"
      >
        <input
          className="popup__input popup__input_item_name"
          ref={nameRef}
          id="place-input"
          name="mestoname"
          type="text"
          minLength="2"
          maxLength="30"
          required
          placeholder="Название"
        />
        <span className="popup__input-error place-input-error"></span>
        <input
          className="popup__input popup__input_item_description"
          id="url-input"
          ref={linkRef}
          name="mestolink"
          type="url"
          required
          placeholder="Ссылка на картинку"
        />
        <span className="popup__input-error url-input-error"></span>
      </PopupWithForm>
  )
}

export default AddPlacePopup;