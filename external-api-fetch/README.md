# External API and Fetch

## Set Up
- $ yarn create react-app 888888
- $ cd 888888
- Delete unnecessary files

## Reactstrap
- https://reactstrap.github.io/
- $ npm install --save bootstrap
- $ npm install --save reactstrap react react-dom
- Import Bootstrap CSS in the src/index.js file
- import 'bootstrap/dist/css/bootstrap.min.css'
- bring in an Input and a Jumbotron

## API Set Up
- Signed up for [New York Times Developers](https://developer.nytimes.com/apis)
- Confirmed email, signed in, added app in the user dropdown menu, registered app
- Selected the API and save, generates the key


## API Key
- Create a file called *.env* in the outermost level of the react app
- Save the API key using the format `REACT_APP_MY_KEY_NAME_HERE = "my-api-key"`
- `REACT_APP_` is the key phrase needed for React
- Add the *.env* file to the *.gitignore* file
```
# api keys
.env
```
- Call the api key in the appropriate component
```
let apiKey = process.env.REACT_APP_MY_KEY_NAME_HERE
```


## Fetch / then
- Mean Girls video
- Asynchronous responses
- Async/Await
- Washing machine example

```
let endpoint = 'https://url//apikey'
  fetch(endpoint)
  .then((response => {
    return response.json()
  }))
  .then((payload=>{
    this.setState({ payload })
  }))
```
- Fetch sends the request which returns a promise
- .then() gets the response from the API and returns it as JSON
- When the first promise gets resolved, we get the received data/payload and can set it to state

-
