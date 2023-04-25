import React from 'react';
import { useParams } from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from "axios";
function Detailed() {
    const {id} = useParams()
    const [article,setArticle] = useState(null)
    const [ingrids,setIngrids] = useState([])
    const [text,setText] = useState(false)
    useEffect(()=>{
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(article => {
            setArticle(article.data.meals[0])
            const array = []
            for(const [key,value] of Object.entries(article.data.meals[0])){
               if (key.includes("Ingredient") && value) {
                   const measure = article.data.meals[0][`strMeasure${key.substring(key.indexOf('nt') + 2)}`]
                   array.push(`${value} / ${measure}`)
               }
            }
            setIngrids(array)
        })
    },[])
    return (
        <>
        { article && <div>
            <h1>{article.strMeal} </h1>
            <div className="ingrid">
                <img className="detailedPic" src={article.strMealThumb} alt=""/>
                <div className="listing">
                    <h2>Ingridients👨‍🍳</h2>
                    <ul>
                        {ingrids.map((item)=>{
                            return <>
                               <li>{item}</li>
                            </>
                        })}
                    </ul>

                </div>
            </div>
            <div className="instruct">
                <p>{text ? article.strInstructions : `${article.strInstructions.substring(0,250)}...`}</p>
                <button className='showText' onClick={()=>{setText(!text)}}>Show more</button>
            </div>
            <div className="iframe">
                <iframe width="1080" height="500" src={article.strYoutube.replace("watch?v=","embed/") }></iframe>
            </div>
        </div>
        }

        </>
)
}

export default Detailed;