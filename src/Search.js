import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Books'
import * as BooksAPI from './BooksAPI'
import debounce from 'lodash.debounce'

class SearchForm extends Component {
  state = {
      searchQuery: []
  }
  componentWillMount = () => {
     this.delayedCallback = debounce(function (event) {
       this.updateResults(event.target.value);
     }, 1000);
  }

  onChange = (event) => {
    event.persist();
    this.delayedCallback(event);
  }

  sortBooks = (book, shelf) => {
      book.shelf = shelf;
      this.props.sortBooks(book, shelf);
  }

  updateResults = (query) => {
    if(query) {
      BooksAPI.search(query).then((searchQuery) => {
      this.updateShelves(searchQuery);
      this.setState({ searchQuery : searchQuery })
    }).catch((error) => {
        this.setState({ searchQuery : [] })
        console.log('Error on search request')
        })
    }
    else {
      console.log('No search')
      this.setState({ searchQuery : [] })
      }

  }

    updateShelves = (array) => {
        array.forEach(book => {
            const matching = this.props.books.filter(b => b.id === book.id);
            if(matching.length > 0) {
                book.shelf = matching[0].shelf;
            }
        });
    }

  render() {
      return (
        <div className="list-books">

          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="search-books">
          <div className="search-books-bar">
          <Link className="close-search" to="/">Close Search</Link>
              <div className="search-books-input-wrapper">
              <input onChange={(event) => this.onChange(event)}
                placeholder="Search by title or author"
                type="search"
              />
              </div>
          </div>
          <div className="search-books-results">
          <ol className="books-grid">
          {this.state.searchQuery.length > 0 ?
            this.state.searchQuery.map((searchResults) => (
            <li key={searchResults.id ? searchResults.id : ''}>
              <Book book={searchResults}
                sortBooks={this.sortBooks}
              />
            </li>
          )) : <li className="no-results">No Results Found</li>}

          </ol>
        </div>
      </div>
      </div>
  )
  }
}

export default SearchForm
