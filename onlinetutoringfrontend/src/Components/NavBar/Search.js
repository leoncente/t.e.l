import React, { useState } from 'react';
import { Subjects } from './Subjects';
import './Search.css';
import { Link } from 'react-router-dom';

function Search(){
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click)
    return(
        <>
            <ul onClick ={handleClick} className = {click ? 'search-menu clicked' : 'search-menu '}>
                {Subjects.map((item,index) =>{
                    return(
                        <li key = {index}>
                            <Link className={item.cName} to={item.path} onClick={() => setClick(false)}>
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
export default Search;