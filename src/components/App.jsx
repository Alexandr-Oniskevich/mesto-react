import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup'
import Card from "./Card";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isImageOpen, setIsImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick (cardElement) {
    setIsImageOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: cardElement.name,
      link: cardElement.link
    })
  }
  function deleteCard(){
    setIsDeleteCardPopupOpen(true)
  }

    function handleEditAvatarClick(){
      setIsEditAvatarPopupOpen(true)
    }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setIsDeleteCardPopupOpen(false);
  }

  return (
    <div className="App">
      <Header/>
      <Main 
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick = { handleCardClick }
      onDeleteCard = { deleteCard }
      />
      <Footer/>
    {/* <!--Попап редактирования профиля--> */}
    <PopupWithForm
     isOpen ={isEditProfilePopupOpen}
     isClose={closeAllPopups}
     name ='pofile' 
     title='Редактировать профиль'
     btnText='Сохранить'>
        <input className="popup__input popup__input_item_name" id="name-input" name="profile_name" type="text" required placeholder="Имя" minLength="2" maxLength="40"/>
        <span className="popup__input-error name-input-error"></span>
        <input className="popup__input popup__input_item_description" id="job-input" name="profile_job" type="text" required placeholder="О себе" minLength="2" maxLength="200"/>
        <span className="popup__input-error job-input-error"></span>    
    </PopupWithForm>
    {/* <!--Попап добавления карточки--> */}
    <PopupWithForm
     isOpen={isAddPlacePopupOpen}
     isClose={closeAllPopups}
     name ='cards' 
     title='Новое место'
     btnText='Создать'>
        <input className="popup__input popup__input_item_name" id="place-input" name="mestoname" type="text" minLength="2" maxLength="30" required placeholder="Название"/>
        <span className="popup__input-error place-input-error"></span>
        <input className="popup__input popup__input_item_description" id="url-input" name="mestolink" type="url" required placeholder="Ссылка на картинку"/>
        <span className="popup__input-error url-input-error"></span>    
    </PopupWithForm>
    {/* <!-- Попап редактирования аватара --> */}
    <PopupWithForm
     isOpen={isEditAvatarPopupOpen}
     isClose={closeAllPopups}
     name ='avatar' 
     title='Обновить аватар'
     btnText='Сохранить'>
        <input className="popup__input popup__input_item_avatar" name="avatarinput" id="avatar-input" type="url" required placeholder="Ссылка на фото"/>
        <span className="popup__input-error avatar-input-error"></span>   
    </PopupWithForm>
     {/* Попап удаления карточки  */}
     <PopupWithForm
     isOpen ={isDeleteCardPopupOpen}
     isClose={closeAllPopups}
     name ='delete' 
     title='Вы уверены?'
     btnText='Да'>  
    </PopupWithForm>
    {/* <!-- Попап изображения --> */}
    <ImagePopup 
     isOpen = {isImageOpen}
     onClose ={closeAllPopups}
     card = { selectedCard }
    />
    </div>
  );
}

export default App;
