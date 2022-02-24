import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import profile from "./components/profile";
// import FindPets from "./components/FindPets";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/api")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <p>{this.state.apiResponse}</p>
        </header> */}
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={profile} />
            {/* <Route exact path="/posts" component={Posts} /> */}
            {/* <Route exact path="/findPets" component={FindPets} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
