import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://api.themoviedb.org/3'; // Base URL da API
  const API_KEY = 'xxxxxxxxx'; // Substitua com sua chave da API do The Movie Database

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Por favor, insira uma consulta para pesquisar.');
      return;
    }
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.results) {
        setResults(data.results);
      } else {
        setError('Nenhum resultado encontrado.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" class="container-fluid">

      <div>
        <section class="search">
          <div class="container">
          <div class="row">
          <div class="col-sm-12">
            <div class="content">
              <h2>Consulta de Séries e Filmes</h2>
                <div class="input-group">
                  <input type="text" 
                         class="form-control" 
                         placeholder="Digite o nome de um filme ou série..."
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                  />
                  <span class="input-group-btn">
                    <button type="submit" 
                            class="btn" 
                            onClick={handleSearch} 
                            disabled={loading}>
                              Buscar
                    </button>
                  </span>
              </div>
            </div>
          </div>
          </div>
          </div>
          </section>
        </div>

        {error && <p className="error-message">{error}</p>}
        {loading && <p>Carregando...</p>}


        <hgroup class="mb20">
          <h2 class="lead"><strong class="text-danger">{results.length}</strong> results were found for the search for <strong class="text-danger">{query}</strong></h2>								
        </hgroup>


        <div class="row">	
        {results.map((result) => (
          <div class="col-sm-4 col-xs-12">
            <div class="single-blog" key={result.id}>
                <div class="single-blog-img">
                    <a href={result.homepage}>
                      <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                      alt={result.title || result.name} />
                    </a>
                </div>
                <div class="blog-content-box">
                    <div class="blog-post-date">
                        <span>{result.vote_average}</span>
                        <span>Stars</span>
                    </div>
                    <div class="blog-content">
                        <h4><a href={result.homepage}>{result.title || result.name}</a></h4>
                        <div class="meta-post">
                            <span class="author">Status: {result.status}</span>
                            <span>Release: {result.release_date}</span>
                            <span>IMDB: {result.imdb_id}</span>
                        </div>
                        <div class="exerpt">
                          {result.overview}
                        </div>
                        <a href={result.homepage} class="btn-two">Read More</a>
                    </div>
                </div>
            </div>
          </div>
        ))}
        </div>


    </div>
  );
}

export default App;
