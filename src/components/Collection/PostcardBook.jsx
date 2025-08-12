import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostcardBook = () => {

    const [postcards, setPostcards] = useState([]);
    const [error, setError] = useState(null);
  

    useEffect(() => {
        axios.get('user-postcards/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then(res => {
        if (res.data.success) {
            console.log('API 데이터:', res.data.data); 
            setPostcards(res.data.data);
        } else {
            setError('엽서 데이터를 불러올 수 없습니다.');
        }
        })
        .catch(err => {
        setError('API 호출 실패');
        console.error('API 호출 실패:', err.message);
        });
    }, [token]);

  if (error) return null;

    return (
        <div className='postcardBook_wrap contents'>
        <div className='postcard-list'>
            {postcards.map((postcard) => (
            <div key={postcard.userPostcardId} className='postcard'>
                <img src={postcard.imagePath} alt={`postcard-${postcard.userPostcardId}`} />
                {/* <div className='text'>{postcard.postcardText}</div>             */}
                <div className='text'>
                {postcard.postcardText
                    .replace(/\\n/g, '\n')  
                    .split('\n')     
                    .map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                    ))
                }
</div>
            </div>
            ))}
        </div>
        </div>
    )
};

export default PostcardBook;