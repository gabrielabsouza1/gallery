import React, { useEffect, useState } from 'react'
import axios from 'axios';

const apikey = (process.env.REACT_APP_API_KEY)


function Main() {

    const [imagens, setImagens] = useState([]);
    const [query, setQuery] = useState('')

    async function searchImages() {
        const searchResponse = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=30`,
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
        const randomResponse = await axios.get(`https://api.pexels.com/v1/curated?page=2&per_page=30`,
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
        verificaQuery();
        // eslint-disable-next-line
       }, [])

    const dadosImagens = (resposta) => {
        setImagens(resposta.data.photos);
    }

    async function verificaQuery () {
        if (query ==='') {
            return randomImages();
        } else {
            return searchImages();
        }
    }

    return (
        <section className="containerMain background">
            <input 
            onChange={e => setQuery(e.target.value)}
            value={query}
            type="text" 
            className="input" 
            placeholder="Search for Images" />
            <button 
            onClick={verificaQuery}
            className="search_btn">Search</button>

            <ul className="posicao-imagens">
                {imagens.map((img) => (
                    <li key={img.id}>
                        <img className="imagens-pagina" src={img.src.large} alt=""></img>
                    </li>
                ))}
            </ul>
            <div>
                <button>Next Page</button>
            </div>
            <div>{console.log(imagens)}</div>
        </section>

    )
}

export default Main