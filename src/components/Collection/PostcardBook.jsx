import React from 'react';
import "../../assets/sass/collection/_postcardBook.scss"
import pc1 from '../../assets/img/postcard1.png';
import pc2 from '../../assets/img/postcard2.png';

const PostcardBook = () => {

    const postcards = [
    { id: 1, imageUrl: pc1 },
    { id: 2, imageUrl: pc2 }
  ];
  
   return (
    <div className='postcardBook_wrap contents'>
      <div className='postcard-list'>
        {postcards.map((postcard) => (
          <div key={postcard.id} className='postcard'>
            <img src={postcard.imageUrl} alt={`postcard-${postcard.id}`} />
          </div>
        ))}
      </div>
    </div>
  )
};

export default PostcardBook;