import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './Shelves'
import SearchForm from './Search'

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  sortBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books: books })
      })
    }).catch(function(error) {
      this.setState({ books: [] })
      console.log('Error on book request')
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchForm
          books={this.state.books}
          sortBooks={this.sortBooks}
          />
        )}/>

        <Route exact path="/" render={() => (
          <Shelves
          books={this.state.books}
          sortBooks={this.sortBooks}
          />
        )}/>
        {console.log(this.state.books)}
        </div>
    )
  }
}

export default BooksApp
