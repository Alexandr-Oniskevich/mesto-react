import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
// import Card from "./Card";
import { useEffect } from "react";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isImageOpen, setIsImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser , setcurrentUser ] =  React.useState({});
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    Promise.all([api.takeUserInfo(), api.getInitialCards()])
      .then(([profileValues, cardsValues]) => {
        setcurrentUser(profileValues);
        setCards(cardsValues);
      })
      .catch((err) => {
        console.log(`Возникла ошибка, ${err}`);
      });
  }, []);

  function handleCardClick(cardElement) {
    setIsImageOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: cardElement.name,
      link: cardElement.link,
    });
  }
  // function deleteCard() {
  //   setIsDeleteCardPopupOpen(true);
  // }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setIsDeleteCardPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    (!isLiked ? api.addLike(card._id) : api.deleteLike(card._id))
    .then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }  

  function handleCardDelete(data){
    api.deleteCard(data._id)
    .then(() => {
      const newCards = cards.filter((c) => c._id !== data._id);
      setCards(newCards);
      closeAllPopups()
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateUser(data){
    api.editUserInfo(data.name, data.about)
    .then((res) => {
      setcurrentUser(res);
      closeAllPopups()
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data.avatar)
    .then((res) => {
      setcurrentUser(res);
      closeAllPopups()
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateCard(data) {
    api.addNewCard(data.name, data.link)
    .then((newCard) => {
      setCards([...cards, newCard]);
      closeAllPopups()
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
      {/* <!--Попап редактирования профиля--> */}
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        isClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        
      />
      {/* <!--Попап добавления карточки--> */}
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen} 
        isClose={closeAllPopups} 
        onAddPlace={handleUpdateCard}
        />
      {/* <!-- Попап редактирования аватара --> */}
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        isClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
        />
      {/* Попап удаления карточки  */}
      <PopupWithForm
        isOpen={isDeleteCardPopupOpen}
        isClose={closeAllPopups}
        name="delete"
        title="Вы уверены?"
        btnText="Да"
      ></PopupWithForm>
      {/* <!-- Попап изображения --> */}
      <ImagePopup
        isOpen={isImageOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
