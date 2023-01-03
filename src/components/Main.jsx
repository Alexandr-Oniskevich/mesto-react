import React from "react";
import {useEffect, useState} from 'react';
import api from "../utils/Api.js";
import Card from "./Card.jsx";

function Main({onCardClick, onDeleteCard, onAddPlace, onEditProfile, onEditAvatar}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.takeUserInfo(), api.getInitialCards()])
      .then(([ProfileValues, cardsValues]) => {
        setUserName(ProfileValues.name);
        setUserDescription(ProfileValues.about);
        setUserAvatar(ProfileValues.avatar);
        setCards(cardsValues);
      })
      .catch((err) => {
        console.log(`Возникла ошибка, ${err}`);
      });
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__edit" onClick={onEditAvatar}></div>
          <img
            src={userAvatar}
            alt="аватар профиля"
            className="profile__avatar"
          />
          <div className="profile__description">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__profession">{userDescription}</p>
            <button
              className="profile__btn-edit"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((cardElement) => (
            <Card
              onDeleteCard={onDeleteCard}
              onCardClick={onCardClick}
              card={cardElement}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
