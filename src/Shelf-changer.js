import React, { Component } from 'react'

class ShelfChanger extends Component {
  state = {
    value : 'none'
  }

  updateState = (event) => {
    this.setState({ value: event.target.value})
  }

  render(){
    return (
      <div className="book-shelf-changer" title="Move Book">
          <select onChange={(event) => this.props.sortBooks(this.props.books, event.target.value)}
  	                value={this.props.books.shelf ? this.props.books.shelf : this.state.value}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none" >None</option>
          </select>
        </div>
      )
  }
}
export default ShelfChanger
