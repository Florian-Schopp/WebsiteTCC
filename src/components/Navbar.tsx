
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function NavigationBar() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' />
            </div>
            <div className='menu-icon' onClick={handleOpen}>
                <div >
                    Menu
                </div>

            </div>
            <ul className={open ? 'nav-menu.active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={handleClose}>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/Simulation' className='nav-links' onClick={handleClose}>
                        Simulation
                    </Link>
                </li>
                <li className='nav-item'>
                    <a className='nav-links' href="docu/index.html" onClick={handleClose}>
                        Documentation
                    </a>
                </li>
                <li className='nav-item'>
                    <a className='nav-links' href="cov/index.html" onClick={handleClose}>
                        Coverage
                    </a>
                </li>

            </ul>
        </nav >



    );
}

export default NavigationBar;
