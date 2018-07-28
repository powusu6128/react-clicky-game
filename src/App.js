import React, { Component} from 'react';
import image from './container/phil_logo.png';
import './App.css';
import CardHolder from "./components/CardHolder";
import Wrapper from "./components/Wrapper";
import data from "./data.json";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    data,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };
  clickPicture = (id) => {
    // Arrange the pictures in a random manner
    const randomized = this.shuffleArray(data);
    this.setState({data: randomized});
    // if clicked an image already clicked set this.state.score = 0; empty clickeadArray, end of if block
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Incorrect!! Game Over ☹️ Click an image to start again!", shakeit: "true"});
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "Correct!! 🙂 ",
        shakeit: "false"
      });
    }
    // set topscore = score if score>topscore.
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
    // shake the wrapper if shakeit is set to true
  }
  shuffleArray = (picturesArray) => {
      for (let i =0; i< picturesArray.length; i++) {
          const j = Math.floor(Math.random() * (i + 1));
          [picturesArray[i], picturesArray[j]] = [picturesArray[j], picturesArray[i]];
      }
      
      return picturesArray;
  }
  render() {
    return (
      <div className="App">
          <header className="App-header">
            <img src={image} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React Clicky Game!!</h1>

            <h3 className="App-intro">
              <strong>Click on an image to earn points, but don't click on any more than once!</strong> 
              <p className = "score"><strong>Score: {this.state.score} | TopScore: {this.state.topScore}</strong></p>
              <p className="message"><strong>{this.state.message}</strong></p>
            </h3>

          </header>
         
            <Wrapper
                shakeWrapper = {this.state.shakeit}
                pictures ={this.state.data.map(picture => (
                  <CardHolder
                    clickPicture={this.clickPicture}
                    id={picture.id}
                    key={picture.id} // to get rid of unique key prop warning
                    name={picture.name}
                    image={picture.image}
                    />
                ))}
            />
            <footer className="footer">
                <div className="container">
                  <span className="text-muted">&copy;philp Owusu - Clicky Game - React app.</span>
                </div>
            </footer> 
      </div>
    );
  }
}
export default App;