import React from 'react';
import { bigIntLiteral } from '@babel/types';
import { data, nepoActors } from '../movieData';

const IdArray = ['tt10888594'];
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      filteredMovies: [],
      selectedMovies: [],
      step1: true,
      step2: false,
      step3: false,
      nepoScore: 0,
    };
  }

  moveToStep2 = () => {
    const filteredMovies = data.filter(eachMovie => eachMovie.Year === 2020);
    this.setState({
      filteredMovies: filteredMovies.slice(0, 60),
      selectedMovies: [],
      step1: false,
      step2: true,
      step3: false,
    });
  };

  moveToStep1 = () => {
    this.setState({
      step1: true,
      step2: false,
      step3: false,
    });
  };

  loadMovies = (e) => {
    const filteredMovies = data.filter(
      eachMovie => eachMovie.Year == e.currentTarget.value,
    );
    this.setState({
      filteredMovies: filteredMovies.slice(0, 60),
      selectedMovies: [],
    });
  };

  onCheckboxChange = (e) => {
    console.log(e);
    const { selectedMovies } = this.state;
    if (e.currentTarget.checked) {
      selectedMovies.push(e.currentTarget.id);
    }
 else {
      const index = selectedMovies.indexOf(e.currentTarget.id);
      if (index > -1) {
        selectedMovies.splice(index, 1);
      }
    }
    this.setState({ selectedMovies });
  };

  getNepoScore = () => {
    const { selectedMovies } = this.state;
    const score = [];
    let total = 0;
    selectedMovies.map((eachMovieId) => {
      const eachScore = this.getScore(eachMovieId);
      score.push(eachScore);
      total += parseInt(eachScore, 10);
    });
    this.setState({
      nepoScore: parseInt(total / score.length),
      step1: false,
      step2: false,
      step3: true,
    });
  };

  isNepoActor = (actorName) => {
    let found = false;
    for (let i = 0; i < nepoActors.length; i++) {
      if (nepoActors[i].toLowerCase().trim() === actorName.toLowerCase()) {
        found = true;
        break;
      }
    }
    return found;
  };

  getScore = (movieId) => {
    const { filteredMovies } = this.state;
    let imdbScore = 10;
    let actorsScore = 10;
    let movieObj = {};
    for (let i = 0; i < filteredMovies.length; i++) {
      if (filteredMovies[i].imdbID === movieId) {
        movieObj = filteredMovies[i];

        const actorsArr = movieObj.Actors.split(',');
        const productionsArr = movieObj.Production.split(',');
        const directorsArr = movieObj.Director.split(',');
        let nepoActorsCount = 0;
        for (let j = 0; j < actorsArr.length; j++) {
          if (this.isNepoActor(actorsArr[j].trim())) {
            nepoActorsCount++;
          }
        }
        actorsScore = (actorsArr.length - nepoActorsCount) / actorsArr.length;
        imdbScore = filteredMovies[i].imdbRating;
        break;
      }
    }
    const totalScore = actorsScore * 10 * 7 + (imdbScore / 8.5) * 30;
    return totalScore;
  };

  render() {
    const {
 filteredMovies, step1, step2, step3, nepoScore 
} = this.state;
    return (
      <div>
        {step1 && (
          <>
            <div className="pure-u-1-12" />
            <div className="pure-u-5-6">
              <p style={{ marginTop: '50px' }}>
                How you soar on our nepottysm meter ?
              </p>
              <div className="pure-u-1">
                <button
                  type="button"
                  className="pure-button button-primary"
                  onClick={this.moveToStep2}
                >
                  Find Out
                </button>
              </div>
            </div>
            <div className="pure-u-1-12" />
          </>
        )}
        {step2 && (
          <>
            <p>
              <span>Select the movies you watched in year</span>
              <select
                onChange={this.loadMovies}
                className="pure-button button-primary dropdown"
              >
                <option selected>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
                <option>2016</option>
              </select>
            </p>
            <div className="pure-g">
              <div className="pure-u-1-24" />
              <div className="pure-u-11-12">
                {filteredMovies.length > 0
                  && filteredMovies.map(eachMovie => (
                    <div className="pure-u-1-2 pure-u-sm-1-3 pure-u-md-1-4 pure-u-lg-1-6">
                      <label className="card" htmlFor={eachMovie.imdbID}>
                        <input
                          className="checkbox"
                          type="checkbox"
                          id={eachMovie.imdbID}
                          onChange={this.onCheckboxChange}
                        />
                        <img className="thumbnail" src={eachMovie.Poster} />
                        <div>
                          <h4 className="movieTitle">{eachMovie.Title}</h4>
                          <p className="line-clamp" title={eachMovie.Plot}>
                            {eachMovie.Plot}
                          </p>
                          {/* <p>
                        <span>Director:</span>
                        {eachMovie.Director}
                      </p>
                      <p>
                        <span>Producer:</span>
                        {eachMovie.Production}
                      </p>
                      <p>
                        <span>Actors:</span>
                        {eachMovie.Actors}
                      </p> */}
                        </div>
                      </label>
                    </div>
                  ))}
              </div>
              <div className="pure-u-1-24" />
            </div>
            <div style={{ paddingBottom: '40px' }}>
              <button
                type="button"
                className="pure-button button-primary sticky-button-bottom"
                onClick={this.getNepoScore}
              >
                Get score
              </button>
            </div>
          </>
        )}
        {step3 && (
          <>
            <div className="pure-u-1-12" />
            <div className="pure-u-5-6">
              <p style={{ marginTop: '50px' }}>
                Your score is
{" "}
                <span className="nepo-score-badge">{nepoScore}</span>
              </p>
              {nepoScore >= 75 && (
                <p>
                  You have an excellent taste in movies, you should review
                  movies for us
                </p>
              )}
              {nepoScore < 75 && nepoScore >= 50 && (
                <p>Check critic reviews before going for movies</p>
              )}
              {nepoScore < 50 && (
                <p>
                  Going for a coin toss is better than asking you for a movie
                  suggestion
                </p>
              )}
            </div>
            <div className="pure-u-1-12" />
            <div className="pure-u-1">
              <button
                type="button"
                className="pure-button button-primary"
                onClick={this.moveToStep1}
              >
                Start again ?
              </button>
            </div>
          </>
        )}
        {/* <div /> */}
        {/* <button type="button" onClick={this.onLoad}>
          Load data
        </button>
        <div>{this.state.result}</div> */}
      </div>
    );
  }
}

export default LandingPage;
