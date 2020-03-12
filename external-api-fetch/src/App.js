import React, { Component } from "react"
import './App.css'
import { InputGroup, InputGroupAddon, Input, Jumbotron, Container, Alert, Button } from 'reactstrap'

class App extends Component{
  constructor(){
    super()
    this.state = {
      search: "", // Search can start with an empty string and be updated from the form
      review: "",
      title: "",
      author: "",
      error: null // If we have an error from the API return it here
    }
  }

  getBookReviews = (query) => {
    const apiKey = '2KJ3BY5sKw3JX1ZmnHL13YzclFAi0Arp'
    let searchUrl = `https://api.nytimes.com/svc/books/reviews.json?title=${query}&api-key=${apiKey}`
    fetch(searchUrl) //Fetch returns a promise
    .then((response) => {
      if(response.status !== 200){
        throw({ message: "Could not perform search. Please try again." })
      }
      return response.json() // Return the response as JSON
    })
    .then((payload) => {
      // the payload is a larger object and needs to be parsed
      const title = payload.body.results[0].book_title
      const author = payload.body.results[0].book_author
      const review = payload.body.results[0].url
      console.log(review)
      this.setState({ review, author, title }) //Finally, we can add the found recipes to our list
      // testing -------
      // fetch(review)
      // .then((response) => {
      //   console.log("here", response)
      //   if(response.status !== 200){
      //     throw({ message: "Could not perform search. Please try again." })
      //   }
      //   return response.json() // Return the response as JSON
      // })
      // // testing -------
    })
    .catch((error) => this.setState({ error }))
  }
  search = () => {
    this.getBookReviews(this.state.search) // When a user clicks 'search', re-send the request to the api, with search values
  }

  render(){
    return(
      <React.Fragment>
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">Book Reviews App</h1>
              <p className="lead">Get NYT book reviews here.</p>
            </Container>
          </Jumbotron>
        </div>
        <div id="input">
          <InputGroup>
            <Input
              type="text"
              placeholder="search for a book title"
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
        <div>
          { this.state.review &&
            <Jumbotron fluid>
              <Container fluid>
                <h4 className="lead">Title: { this.state.title }</h4>
                <h4 className="lead">Author: { this.state.author }</h4>
                <p className="lead">{ this.state.review }</p>
              </Container>
            </Jumbotron>
          }
        </div>
      </React.Fragment>
    )
  }
}
export default App
