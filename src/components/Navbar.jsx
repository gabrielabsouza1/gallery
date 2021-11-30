import React, { useState } from 'react'
import logotipo from "../logo.png";

const Navbar = () => {

    const [isMobile, setisMobile] = useState(false);

    return (
        <>
            <nav className="navbar" id="cabecalho" >
                <a href="#home"><img className="logo" src={logotipo} alt="logotipo pet shop"></img></a>
                <ul onClick={() => setisMobile(false)}
                className={isMobile ? "nav-links-mobile" : "nav-links"}
                >
                    <li className="home">
                        <a href="#home">Home</a>
                    </li>
                    <li className="sobre">
                        <a href="#sobre-nós">Sobre nós</a>
                    </li>
                    <li className="servicos">
                        <a href="#serviços">Serviços</a>
                    </li>
                    <li className="pacotes">
                        <a href="#pacotes">Pacotes</a>
                    </li>
                    <li className="localizacao">
                        <a href="#localizacao">Localização</a>
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