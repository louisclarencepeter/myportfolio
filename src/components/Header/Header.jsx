import React, { useState } from 'react';
import logo from '../../assets/images/me.jpg';
import './Header.scss';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
    };

    return (
        <>
        </>
    );
}

export default Header;
