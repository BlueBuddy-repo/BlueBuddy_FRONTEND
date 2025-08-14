import React, { useEffect } from 'react'
import axios from 'axios'

const Turtle = () => {
    const API_KEY = `${process.env.REACT_TURTLE_API_KEY}`; 
    const URL = `http://apis.data.go.kr/B553482/SeaTurtleRouteService/getSeaTurtleRoute?serviceKey=${API_KEY}&pttlId=60811&resultType=json`;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL, {
                   
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className='turtle_wrap'>

        </div>
    )
}

export default Turtle
