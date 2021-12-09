import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios';


const apikey = (process.env.REACT_APP_API_KEY)

const ApiContext = createContext();

export default function ContextApi({ children }) {
    const [imagens, setImagens] = useState([]);
    const [query, setQuery] = useState('');
    const [pagina, setPagina] = useState(1);
    const [imagemFavorita, setImagemFavorita] = useState(false);

    async function searchImages() {
        const searchResponse = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${pagina}&locale=pt-BR`,
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
        const randomResponse = await axios.get(`https://api.pexels.com/v1/curated?page=${pagina}&per_page=30&locale=pt-BR`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: apikey,
                },
            })
        dadosImagens(randomResponse)
    }

    const dadosImagens = (resposta) => {
        setImagens(resposta.data.photos);
    }

    function proximaPagina() {
        setPagina(pagina + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function paginaAnterior() {
        if (pagina >= 2) {
            setPagina(pagina - 1);
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

    useEffect(() => {
            verificaQuery(pagina);
            // eslint-disable-next-line
        }, [pagina])

    return (
        <ApiContext.Provider
            value={{
                imagens,
                setImagens,
                query,
                setQuery,
                pagina,
                setPagina, 
                verificaQuery, 
                proximaPagina, 
                paginaAnterior, 
                imagemFavorita, 
                setImagemFavorita
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}

export function useApi() {
    const context = useContext(ApiContext);
    const { imagens,
        setImagens,
        query,
        setQuery,
        pagina,
        setPagina, 
        verificaQuery, 
        proximaPagina, 
        paginaAnterior, 
        imagemFavorita, 
        setImagemFavorita }  = context;
    return {
        imagens,
        setImagens,
        query,
        setQuery,
        pagina,
        setPagina, 
        verificaQuery, 
        proximaPagina, 
        paginaAnterior, 
        imagemFavorita, 
        setImagemFavorita
    };
}


