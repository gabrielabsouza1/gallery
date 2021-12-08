import React, { useEffect, useState } from 'react'
import axios from 'axios';


const apikey = (process.env.REACT_APP_API_KEY)


function Main() {

    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [imagemFavorita, setImagemFavorita] = useState(false);

    async function searchImages() {
        const searchResponse = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${page}&locale=pt-BR`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: apikey,
                },
            })
        dadosImagens(searchResponse)
    }

    async function randomImages() {
        const randomResponse = await axios.get(`https://api.pexels.com/v1/curated?page=${page}&per_page=30&locale=pt-BR`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: apikey,
                },
            })
        dadosImagens(randomResponse)
    }

    useEffect(() => {
        verificaQuery(page);
        // eslint-disable-next-line
    }, [page])

    const dadosImagens = (resposta) => {
        setImages(resposta.data.photos);
    }

    function nextPage() {
        setPage(page + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function previousPage() {
        if (page >= 2) {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    async function verificaQuery() {
        if (query === '') {
            return randomImages();
        } else {
            return searchImages();
        }
    }

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
                {images.map((img) => (
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
                    onClick={previousPage}>
                    <i className="fas fa-arrow-left"></i> Previous Page
                </button>
                <button
                    className="button"
                    onClick={nextPage}
                >Next Page <i className="fas fa-arrow-right"></i></button>
            </div>
            
        </section>

    )
}

export default Main