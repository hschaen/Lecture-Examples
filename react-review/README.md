# Week 8: React Review

## React Review
- $ yarn create react-app mcdonalds
- $ cd mcdonalds
- turn App.js into a class App

#### User Stories
- Create an app to keep track of my order total
- Click on menu items to add items to the total

#### Process
- add reactstrap
- $ npm install --save bootstrap
- $ npm install --save reactstrap react react-dom
- add `import 'bootstrap/dist/css/bootstrap.min.css'` to index.js

- add a state object
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

- create a Menu.js component with a basic setup

- map through the menu in state and pass the values as props to Menu.js
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

- add a reactstrap card Menu.js
```
<Card body>
  <CardTitle>Menu Item: { this.props.menuItem }</CardTitle>
  <CardText>Menu Price: ${ this.props.itemCost }</CardText>
  <Button onClick={ this.addItem }>Add { this.props.menuItem }</Button>
</Card>
```
- import necessary bootstrap components
- `import { Card, CardTitle, CardText, Button } from "reactstrap"`


- Add a method to Menu.js
```
addItem = () => {
  this.props.addMenuPrice(this.props.itemCost, this.props.itemEmoji)
}
```

- Add a method to App.js
```
addMenuPrice = (price, emoji) => {
  let newTotal = this.state.totalPrice
  this.setState({ totalPrice: newTotal += price})
  this.state.emojiList.push(emoji)
  this.setState({ emojiList: this.state.emojiList})
}
```

- pass the method as props: `addMenuPrice={ this.addMenuPrice }`

- render the total price: `<p>Total cost: ${ this.state.totalPrice }</p>`
- map through the emoji list
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
- Add styling to the cards: `<div style={{ display: "flex", flexWrap: "wrap"}}>`
