import React, { useEffect, useState } from 'react'
import axios from 'axios';


const apikey = (process.env.REACT_APP_API_KEY)


function Main() {

    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    async function viewData() {
        const resposta = await axios.get(`https://api.pexels.com/v1/curated?page=${page}&per_page=30`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: apikey,
                },
            })
        dadosApi(resposta)
    }

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
        dadosApi(searchResponse)
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
        viewData();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        verificaQuery(page);
        // eslint-disable-next-line
    }, [page])

    const dadosImagens = (resposta) => {
        setImages(resposta.data.photos);
    }

    const dadosApi = (resposta) => {
        setData(resposta.data);
    }

    function trocaPagina() {
        setPage(page + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <p className="totalImagens">Foram encontradas {data.total_results} imagens</p>
            <ul className="posicao-imagens">
                {images.map((img) => (
                    <li key={img.id}>
                        <img src={img.src.large} alt="" loading="lazy"></img>
                    </li>
                ))}
            </ul>
            <div className="flex-button">
                <button
                    className="button"
                    onClick={trocaPagina}
                >Next Page <i className="fas fa-arrow-right"></i></button>
            </div>
        </section>

    )
}

export default Main