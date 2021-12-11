import React, { useState } from 'react'
import logo from "../logo.png";

const Navbar = () => {

    const [isMobile, setisMobile] = useState(false);

    return (
        <>
            <nav className="navbar">
                <a href="/"><img src={logo} alt="logotipo album de fotos"></img></a>
                <ul onClick={() => setisMobile(false)}
                className={isMobile ? "nav-links-mobile" : "nav-links"}
                >
                    <li className="home">
                        <a href="/">Home</a>
                    </li>
                    <li className="favoritos">
                        <a href="/favoritos">Favoritos</a>
                    </li>
                </ul>
                <button
                    className="mobile-menu-icon"
                    onClick={() => setisMobile(!isMobile)}
                >
                    {isMobile ? (
                        <i className="fas fa-times"></i>
                    ) : (
                        <i className="fas fa-bars"></i>
                    )}
                </button>
            </nav>
        </>
    );
};

export default Navbar;