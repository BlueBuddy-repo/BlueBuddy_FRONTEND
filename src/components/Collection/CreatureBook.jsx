import React, { useState } from 'react';
import cardImage from '../../assets/img/card.png';
import whaleImg from '../../assets/img/whale.png';
import turtleImg from '../../assets/img/turtle.png';
import "../../assets/sass/collection/_creatureBook.scss"

const CreatureBook  = () => {

  const totalCount = 12
  const imageUrl = cardImage;

  const [creatures] = useState([
    { id: 1, imageUrl: turtleImg, displayOrder: 6 },
    { id: 2, imageUrl: whaleImg, displayOrder: 1 },
  ]);

  const creatureMap = new Map();
  creatures.forEach(creature => {
    creatureMap.set(creature.displayOrder, creature);
  });

  const cards = Array.from({ length: totalCount }, (_, index) => {
  const position = index + 1;
  const creature = creatureMap.get(position);

  return (
      <div key={position} className="card">
        <img
          src={creature ? creature.imageUrl : cardImage}
          alt={creature ? `creature-${creature.id}` : 'default card'}
        />
      </div>
    );
  });

  return (
    <div className='creatureBook_wrap contents'>
      <h2 className='title'>생물도감</h2>

      <div className='creature-grid'>{cards}</div>
    </div>
  )
}

export default CreatureBook 


