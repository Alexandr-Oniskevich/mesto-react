import React from "react";

function Card(props){

  function handleClick() { 
    props.onCardClick(props.card) 
  }

  function handleDelete () {
     props.onDeleteCard(props.card) 
    }

  return(
    <li className="elements__card">
      <button className="elements__del-card" onClick={ handleDelete } ></button>
      <img src={props.link} alt={props.name}  onClick={ handleClick } className="elements__img"/>
      <div className="elements__description">
        <h2 className="elements__text">{props.name}</h2>
        <div className="elements__like-block">
          <button className="elements__like" type="button"></button>
          <p className="elements__number-like">{props.likes}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;