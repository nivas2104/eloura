import React, { useState } from 'react';
import './search.css'

function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchPlaces = () => {
        const apiUrl = `http://api.geonames.org/searchJSON?q=${searchInput}&username=nikash13579`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Response data:', data);
                const results = data.geonames;
                console.log('Results:', results);

                // Fetch descriptions and images for each place
                Promise.all(results.map(result => {
                    return Promise.all([fetchDescription(result.name), fetchImage(result.name)])
                        .then(([description, imageUrl]) => ({
                            ...result,
                            description,
                            imageUrl
                        }));
                }))
                .then(resultsWithDetails => {
                    setSearchResults(resultsWithDetails);
                })
                .catch(error => console.error('Error fetching place details:', error));
            })
            .catch(error => console.error('Error fetching search results:', error));
    };

    const fetchDescription = (placeName) => {
        return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${placeName}`)
            .then(response => response.json())
            .then(wikiData => wikiData.extract)
            .catch(error => {
                console.error('Error fetching Wikipedia data:', error);
                return 'Description not available';
            });
    };

    const fetchImage = (placeName) => {
        return fetch(`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=300&titles=${placeName}&origin=*`)
            .then(response => response.json())
            .then(imageData => {
                const pages = imageData.query.pages;
                const pageId = Object.keys(pages)[0];
                return pages[pageId].thumbnail.source;
            })
            .catch(error => {
                console.error('Error fetching image data:', error);
                return ''; // Return an empty string if image is not available
            });
    };

      

    return (
        <div className='explore'>
            <h1 className='search-input'>Geonames Places Search</h1>
       
            <div className='searchbar'>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter a location"
                />
                <button onClick={searchPlaces}>Search</button>
            </div>
            <div id="results">
                {searchResults.length > 0 ? (
                    searchResults.map(result => (
                        <div >
                            <div className='places-list'>
                                <div key={result.geonameId} className="place">
                                <h2>{result.name}</h2>
                                <p>Country: {result.countryName}</p>
                                <p>Description: {result.description}</p>
                                {result.imageUrl && <img src={result.imageUrl} alt={`Thumbnail of ${result.name}`} />}
                                </div>
                            </div>
                            <br></br>
                        </div>   
                        
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
}

export default Search;
