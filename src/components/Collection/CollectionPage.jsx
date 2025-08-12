import React from 'react';
import CreatureBook from './CreatureBook';
import PostcardBook from './PostcardBook';

const CollectionPage = () => {
  return (
    <div className="collectionPage_contents">
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
