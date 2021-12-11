import React from 'react'
import { useApi } from '../context/api'


function Main() {
    const { images, query, setQuery, nextPage, previousPage, verifyQuery, setFavoriteImage } = useApi();

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
                    onClick={verifyQuery}
                    className="button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className="position-images">
                {images.map((img) => (
                    <div id="images">
                        <img key={img.id} src={img.src.large} alt="" loading="lazy"></img>
                        <div className="text-image">
                            <div>
                                <i 
                                onClick={() => {
                                    sessionStorage.setItem(img.id, img.src.large);
                                    setFavoriteImage(true);
                                    verifyQuery();
                                }}
                                className={
                                    sessionStorage.hasOwnProperty(img.id) ? 
                                    "fas fa-heart favorite-button-false" :
                                    "fas fa-heart favorite-button-true"
                                    }></i>
                            </div>
                            <div className="text-style">{img.photographer}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex-button">
                <button
                    onClick={previousPage}>
                    <i className="fas fa-arrow-left"></i> Previous Page
                </button>
                <button
                    onClick={nextPage}
                >Next Page <i className="fas fa-arrow-right"></i></button>
            </div>  
        </section>

    )
}

export default Main