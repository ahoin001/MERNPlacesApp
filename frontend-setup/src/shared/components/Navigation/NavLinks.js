import React from 'react'
// NavLink is Different from Link in that it allows more style options
import { NavLink } from "react-router-dom";

import './NavLinks.css'

const NavLinks = props => {
    return (
        <ul className='nav-links'>
            <li>
            {/* exact here tells to only mark this as active when we are on this exact url, not just on any route that starts with / */}
                <NavLink to='/' exact>ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to='/u1/places'>MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to='/places/new'>ADD PLACE </NavLink>
            </li>
            <li>
                <NavLink to='/auth'>AUTHENTICATE</NavLink>
            </li>
        </ul>
    )
}

export default NavLinks
