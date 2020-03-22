# Week 8: React Review

## React Review
- `$ yarn create react-app mcdonalds`
- `$ cd mcdonalds`
- Turn App.js into a class App

#### User Stories
- Create an app to keep track of my order total
- Click on menu items to add items to the total

#### Process
- Add reactstrap
- `$ npm install --save bootstrap reactstrap`
- Add `import 'bootstrap/dist/css/bootstrap.min.css'` to index.js

- Add a state object
Question: what do we need to add before `state`?
```
this.state = {
  totalPrice: 0,
  menu: [
    {name: "Burger", cost: 4.5, emoji: "🍔"},
    {name: "Fries", cost: 1.5, emoji: "🍟"},
    {name: "Drink", cost: 2, emoji: "🥤"},
    {name: "Ice Cream", cost: 2.5, emoji: "🍦"},
  ],
  emojiList: []
}
```

- Create a Menu.js component with a basic setup

- Map through the menu in state and pass the values as props to Menu.js
```
<h3>Select Your Items</h3>
<div>
  { this.state.menu.map((value, index) => {
    return(
        <Menu
          key={ index }
          menuItem={ value.name }
          itemCost={ value.cost }
          itemEmoji={ value.emoji }
        />
    )
  })}
  </div>
```

- Add a reactstrap card to Menu.js:
```
<Card body>
  <CardTitle>Menu Item: { this.props.menuItem }</CardTitle>
  <CardText>Menu Price: ${ this.props.itemCost }</CardText>
  <Button onClick={ this.addItem }>Add { this.props.menuItem }</Button>
</Card>
```
- Import necessary bootstrap components
- `import { Card, CardTitle, CardText, Button } from "reactstrap"`
<br>
- Add a method to Menu.js:
```
addItem = () => {
  this.props.addMenuPrice(this.props.itemCost, this.props.itemEmoji)
}
```

- Add a method to App.js:
```
addMenuPrice = (price, emoji) => {
  let newTotal = this.state.totalPrice
  this.setState({ totalPrice: newTotal += price})
  this.state.emojiList.push(emoji)
  this.setState({ emojiList: this.state.emojiList})
}
```

- Pass the method as props: 
```addMenuPrice={ this.addMenuPrice }```

- In App.js:
    - Render the total price : 
    ```<p>Total cost: ${ this.state.totalPrice }</p>```
    - Map through the emoji list:
```
<div style={{ height: "40px" }}>
  Items: { this.state.emojiList.map((value, index) => {
    return(
      <span key={ index }>
        { value }
      </span>
    )
  })}
</div>
```
- In Menu.js:
    - Add styling to the cards: 
    ```<div style={{ display: "flex", flexWrap: "wrap"}}>```
