import React, { useState, useEffect } from 'react';

const Favoritos = () => {

    const [favoritas, setFavoritas] = useState([])

    function imagensFavoritas() {
        setFavoritas(Object.values(sessionStorage));
    }

    useEffect(() => {
        imagensFavoritas(sessionStorage);
        // eslint-disable-next-line
    }, [sessionStorage])

    return (
        <section className="mainContainer">
            <div className="position-images">
                {favoritas.map((fav) => (
                    <div id="images">
                        <img key={fav.id} src={fav} alt="" loading="lazy"></img>
                        <div className="text-image">
                            <div className="trash-button">
                                <i
                                    onClick={() => {
                                        let indexFav = favoritas.indexOf(fav);
                                        let keySession = sessionStorage.key(indexFav);
                                        if (indexFav > -1) {
                                            sessionStorage.removeItem(keySession);
                                        }
                                        window.location.reload();
                                    }}
                                    className="fas fa-trash-alt"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Favoritos;