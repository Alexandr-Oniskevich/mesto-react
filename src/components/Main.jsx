import React from 'react';
import api from '../utils/Api.js'
import Card from './Card.jsx';


function Main(props){

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards ] = React.useState([]);

  React.useEffect(() => {
    Promise.all([ api.takeUserInfo(), api.getInitialCards()])
    .then(([ ProfileValues, cardsValues ]) => {
      setUserName(ProfileValues.name)
      setUserDescription(ProfileValues.about)
      setUserAvatar(ProfileValues.avatar)
      setCards(cardsValues)
      
    })
    .catch((err) => { console.log(`Возникла ошибка, ${err}`) })

  }, []);

  return(
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__edit" onClick={props.onEditAvatar}></div>
          <img src={userAvatar} alt="аватар профиля" className="profile__avatar"  />
          <div className="profile__description">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__profession">{userDescription }</p>
            <button className="profile__btn-edit" type="button" onClick={props.onEditProfile}></button>
          </div>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
        
        {cards.map((cardElement) =>(
          <Card 
          key = { cardElement._id }
          name={cardElement.name}
          likes={cardElement.likes.length}
          link={cardElement.link}
          onDeleteCard = {props.onDeleteCard}
          onCardClick = { props.onCardClick }
          card = { cardElement }
          />
       ) )}
        </ul>
      </section>
    </main>
  )
}

export default Main;