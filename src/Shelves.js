import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Books'


const Shelves = (props) => {
  Shelves.propTypes = {
  books: PropTypes.array.isRequired,
  sortBooks: PropTypes.func.isRequired
  }
  return (
    <div className="list-books">

      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      <div className="list-books-content">
        <div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.books.filter(books =>
              books.shelf === 'currentlyReading').map(book => (
                <li key={book.id}>
                  <Book book={book}
                    sortBooks={props.sortBooks}
                    updateBooks={props.updateBooks}
                  />
                </li>
                ))
              }
            </ol>
          </div>
        </div>
        <div className="bookshelf">
            <h2 className="bookshelf-title">Want To Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.books.filter(books =>
                books.shelf === 'wantToRead').map(book => (
                  <li key={book.id}>
                    <Book book={book}
                      sortBooks={props.sortBooks}
                      updateBooks={props.updateBooks}
                    />
                  </li>
                  ))
                }
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.books.filter(books =>
                books.shelf === 'read').map(book => (
                  <li key={book.id}>
                    <Book book={book}
                      sortBooks={props.sortBooks}
                      updateBooks={props.updateBooks}
                    />
                  </li>
                  ))
                }
              </ol>
            </div>
          </div>

        </div>
      </div>

      <div className="open-search">
        <Link className="add-a-book" to="/search">Add a book</Link>
      </div>

  </div>
    )

  }


export default Shelves
