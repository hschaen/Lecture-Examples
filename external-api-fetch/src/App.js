import React, { Component } from "react"
import './App.css'
import { InputGroup, InputGroupAddon, Input, Jumbotron, Container, Alert, Button, ListGroup, ListGroupItem } from 'reactstrap'

class App extends Component{
  constructor(){
    super()
    this.state = {
      search: "", // Search can start with an empty string and be updated from the form
      articles: [],
      error: null // If we have an error from the API return it here
    }
  }

  getArticles = (query) => {
    // Api key hidden in another file
    let apiKey = process.env.REACT_APP_NYT_API_KEY
    // Setting up the query and passing in the api key to the url
    let searchUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`

    fetch(searchUrl) // Fetch returns a promise
    .then((response) => {
      if(response.status !== 200){
        throw({ message: "Could not perform search. Please try again." })
      }
        return response.json() // Return the response as JSON
    })
    .then((payload) => {
      console.log(payload.response.docs)
      let articles = payload.response.docs
      this.setState({ articles: articles })
      console.log(this.state.articles)
    })
    .catch((error) => this.setState({error}))
  }

    search = () => {
      this.getArticles(this.state.search) // When a user clicks 'search', re-send the request to the api, with search values
    }

  render(){
    return(
      <React.Fragment>

        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">News Articles</h1>
              <p className="lead">Get NYT articles here.</p>
            </Container>
          </Jumbotron>
        </div>

        <div id="input">
          <InputGroup>
            <Input
            type="text"
            placeholder="search for an article"
            onChange={ (e) => this.setState({ search: e.target.value }) }
            value={ this.state.search }
            />
              <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={ this.search }>Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div id="error">
          { this.state.error &&
            <Alert color="danger">
              { this.state.error.message }
            </Alert>
          }
        </div>

        <div id="results">
          { this.state.articles.map((article, index) => {
              return(
                <ListGroup key={ index } >
                  <ListGroupItem tag="a" href={ article.web_url } action>{ article.abstract }</ListGroupItem>
                </ListGroup>
              )
            })
          }
        </div>

      </React.Fragment>
    )
  }
}
  export default App
