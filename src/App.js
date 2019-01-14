import React, { Component } from "react";
import "./App.css";
import MovieRow from "./MovieRow.js";
import $ from "jquery"; // $ now represents jquery library

class App extends Component {
  constructor(props) {
    super(props);
    // console.log("This is my initializer");

    // const movies = [
    // {
    // id: 0,
    // poster_src:
    // "https://image.tmdb.org/t/p/w185_and_h278_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    // title: "Avengers: Infinity War",
    // overview: "Description"
    // },
    // {
    // id: 1,
    // poster_src:
    // "https://image.tmdb.org/t/p/w185_and_h278_bestv2/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
    // title: "Avengers",
    // overview: "Description2"
    // }
    // ];

    // var movieRows = [];

    // movies.forEach(movie => {
    // console.log(movie.title);
    // const movieRow = <MovieRow movie={movie} />;
    // movieRows.push(movieRow);
    // });

    // this.state = { rows: movieRows };
    this.state = {};
    this.performSearch("avengers");
  }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb");
    const urlString =
      "https://api.themoviedb.org/3/search/movie?&api_key=hidden&query=" +
      searchTerm;
    // asynchronous data fetch from the internet
    $.ajax({
      // provide dictionary of options to get data
      url: urlString,
      success: searchResults => {
        console.log("Fetched data successfully");
        // console.log(searchResults);
        const results = searchResults.results;
        // console.log(results[0]);

        var movieRows = [];

        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          // console.log(movie.poster_path);
          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movieRow);
        });

        this.setState({
          rows: movieRows
        });
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }
    });
  }

  searchChangeHandler(event) {
    const searchTerm = event.target.value;
    this.performSearch(searchTerm);
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img src="green_app_icon.svg" width="50" alt="app-icon" />
              </td>
              <td width="8" />
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input
          style={{
            fontSize: 24,
            display: "block",
            width: "99%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16
          }}
          placeholder="Enter search term"
          onChange={this.searchChangeHandler.bind(this)} // bind this entire class to the value of boundObject
        />

        {this.state.rows}
      </div>
    );
  }
}

export default App;
