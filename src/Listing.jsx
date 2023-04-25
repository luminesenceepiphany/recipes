import React from 'react';
import {Link} from "react-router-dom";

function Listing(props) {
    return (
            <div className='app'>
                {props.meals.map((item)=>{
                    return <Link to={`/detailed/${item.idMeal}`}>
                        <img src={item.strMealThumb} alt="" />
                        <p>{item.strMeal}</p>
                    </Link>
                })}
            </div>
    );
}

export default Listing;