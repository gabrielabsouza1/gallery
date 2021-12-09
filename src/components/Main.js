import React from 'react'
import { useApi } from '../context/api'


function Main() {
    const { imagens, query, setQuery, proximaPagina, paginaAnterior, verificaQuery, setImagemFavorita } = useApi();

    return (
        <section className="mainContainer">
            <div className="search">
                <input
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    type="text"
                    className="input"
                    placeholder="Search for Images" />
                <button
                    onClick={verificaQuery}
                    className="button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className="posicao-imagens">
                {imagens.map((img) => (
                    <div id="imagens">
                        <img key={img.id} src={img.src.large} alt="" loading="lazy"></img>
                        <div className="texto-imagem">
                            <div>
                                <i 
                                onClick={() => {
                                    sessionStorage.setItem(img.id, img.src.large);
                                    setImagemFavorita(true);
                                    verificaQuery();
                                }}
                                className={
                                    sessionStorage.hasOwnProperty(img.id) ? 
                                    "fas fa-heart favorite-button-false" :
                                    "fas fa-heart favorite-button-true"
                                    }></i>
                            </div>
                            <div className="estilo-texto">{img.photographer}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex-button">
                <button
                    className="button"
                    onClick={paginaAnterior}>
                    <i className="fas fa-arrow-left"></i> Previous Page
                </button>
                <button
                    className="button"
                    onClick={proximaPagina}
                >Next Page <i className="fas fa-arrow-right"></i></button>
            </div>
            
        </section>

    )
}

export default Main