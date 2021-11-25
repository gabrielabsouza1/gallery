import React, { useEffect, useState } from 'react'
import axios from 'axios';

const apikey = (process.env.REACT_APP_API_KEY)


function Main() {

    const [imagens, setImagens] = useState([]);

    async function getImages(page_num) {
        const response = await axios.get(`https://api.pexels.com/v1/curated?page=1&per_page=30`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: apikey,
                },
            })
        dadosImagens(response)
    }

    useEffect(() => {
        getImages(); 
        // eslint-disable-next-line
       }, [])

    const dadosImagens = (resposta) => {
        setImagens(resposta.data.photos);
    }

    return (
        <section className="containerMain background">
            <input type="text" className="input" placeholder="Search for Images" />
            <button className="search_btn">Search</button>

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