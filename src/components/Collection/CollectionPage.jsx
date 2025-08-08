import React from 'react';
import CreatureBook from './CreatureBook';
import PostcardBook from './PostcardBook';

const CollectionPage = () => {
  return (
    <div className="collectionPage">
      <CreatureBook />
      <PostcardBook />
    </div>
  );
};

export default CollectionPage;
