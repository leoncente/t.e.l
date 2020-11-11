
import React, { useState } from 'react';
import './NavBar.css'
import logo from './logoTel.png';
import { Link } from 'react-router-dom';
import Search from './Search';

function NavBar (){

    //Definition of states
    const [click, setCLick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [search, setSearch] = useState(false);

    //Changing the states to show the drop-down list 
    const handleClick = () => setCLick(!click);
    const closeMobileMenu = () => setCLick(false);

    //The drop-down list is hidden in case the window is resized 
    const onMouseEnterSearch = () => {
        if(window.innerWidth < 960){
            setSearch(false);
        }else{
            setSearch(true);
        }
    };

    //The drop-down list is hidden in case the window is resized
    const onMouseLeaveSearch = () => {
        if(window.innerWidth < 960){
            setSearch(false);
        }else{
            setSearch(false);
        }
    };

    //The drop-down list is hidden in case the window is resized
    const onMouseEnter = () => {
        if(window.innerWidth < 960){
            setDropdown(false);
        }else{
            setDropdown(true);
        }
    };

    //The drop-down list is hidden in case the window is resized
    const onMouseLeave = () => {
        if(window.innerWidth < 960){
            setDropdown(false);
        }else{
            setDropdown(false);
        }
    };

    return(
         <>
        <nav className="navbar">
            <Link to='/' className = 'navbar-logo' onClick = {closeMobileMenu}>
                <img src={logo} width='160px' height='60px' />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
                <i className = {click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
                <li className = 'nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Inicio
                    </Link>
                </li>
                <li className='nav-item' onMouseEnter={onMouseEnterSearch} onMouseLeave={onMouseLeaveSearch}>
                    <Link to='/register' className = 'nav-links' onClick={closeMobileMenu}>
                        Registrarse
                    </Link>
                    {search && <Search/>}
                </li>
                <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <Link to='/subjects' className = 'nav-links' onClick={closeMobileMenu}>
                        Materias
                    </Link>
                </li>
               
                
                
            </ul> 
        </nav>
        </>
    );

    
}

export default NavBar;