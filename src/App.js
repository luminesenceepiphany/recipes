import './App.scss';
import React, {useEffect , useState} from "react";
import {Routes, Route, Link} from 'react-router-dom'
import axios from 'axios'
import Listing from "./Listing.jsx";
import Detailed from "./Detailed.jsx";
function App() {
    const [category,setCategory] = useState([])
    const [meals,setMeals] = useState([]);
    const [active,setActive] = useState("Seafood")
    const [menu,setMenu]= useState(false)
    useEffect(()=>{
    axios.get("https://www.themealdb.com/api/json/v1/1/categories.php").then(category => {
        setCategory(category.data.categories)
    })
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${active}`).then(res => {
        setMeals(res.data.meals)
        console.log(meals)
    })

    },[active])
    function handleMenu() {
        setMenu(!menu)
    }
    function handleClick(category) {
        setActive(category)
    }

    return (
        <>
            { menu && <div className="menu">
                <img src="/close.png" alt="" onClick={handleMenu}/>
                <div className='mobCategories'>

                {category.map((item)=>{
                    return <div className="mobileCategory">
                        <Link to="/" onClick={()=> {
                            handleClick(item.strCategory)
                            setMenu(false)
                        }}>{item.strCategory}</Link>
                    </div>
                })}
                </div>
            </div>}
            <div className="menuButton">
                 <img src="/menu.png" alt="" onClick={handleMenu}/>
            </div>
            <div className="category">
                {category.map((item)=>{
                    return <div>
                        <Link to="/" onClick={()=>handleClick(item.strCategory)}>{item.strCategory}</Link>
                    </div>
                })}
            </div>
            <Routes>
                <Route path="/" element={<Listing meals={meals}/>}/>
                <Route path="/detailed/:id" element={<Detailed/>}/>
            </Routes>
                <p className="top">vika top</p>
            </>
        )
}

export default App;


