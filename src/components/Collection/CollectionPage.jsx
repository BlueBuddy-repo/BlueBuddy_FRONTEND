import React from 'react';
import CreatureBook from './CreatureBook';
import PostcardBook from './PostcardBook';
import "../../assets/sass/collection/_collectionTitle.scss"

const CollectionPage = () => {
  return (
    <div className="collectionPage">
      <div className="title_wrap">
        <h2 className='title'>생물도감</h2>
      </div>     
      <CreatureBook />

      <div className="title_wrap">
        <h2 className='title'>엽서</h2>
      </div>  
      <PostcardBook />
    </div>
  );
};

export default CollectionPage;
