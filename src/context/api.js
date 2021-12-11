import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios';


const apikey = (process.env.REACT_APP_API_KEY)

const ApiContext = createContext();

export default function ContextApi({ children }) {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [favoriteImage, setFavoriteImage] = useState(false);

    async function searchImages() {
        const searchResponse = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${page}&locale=pt-BR`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: apikey,
                },
            })
        dataImages(searchResponse)
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
        dataImages(randomResponse)
    }

    const dataImages = (response) => {
        setImages(response.data.photos);
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

    async function verifyQuery() {
        if (query === '') {
            return randomImages();
        } else {
            return searchImages();
        }
    }

    useEffect(() => {
            verifyQuery(page);
            // eslint-disable-next-line
        }, [page])

    return (
        <ApiContext.Provider
            value={{
                images,
                setImages,
                query,
                setQuery,
                page,
                setPage, 
                verifyQuery, 
                nextPage, 
                previousPage, 
                favoriteImage, 
                setFavoriteImage
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}

export function useApi() {
    const context = useContext(ApiContext);
    const { images,
        setImages,
        query,
        setQuery,
        page,
        setPage, 
        verifyQuery, 
        nextPage, 
        previousPage, 
        favoriteImage, 
        setFavoriteImage }  = context;
    return {
        images,
        setImages,
        query,
        setQuery,
        page,
        setPage, 
        verifyQuery, 
        nextPage, 
        previousPage, 
        favoriteImage, 
        setFavoriteImage
    };
}


