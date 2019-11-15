import React, { Component } from "react";
import { connect } from "react-redux";
import Book from "./Book";
import { getBook, addBook, deleteBook } from "../actions/index";

class BookForm extends Component {
    state = {
        newBook: {
        name:'',
        genre:'',
        author:''
        }
    };
    componentDidMount(){
        this.props.getBook();
    };
    changeHandler = e => {
        this.setState({
            newBook: {
                ...this.state.newBook,
                [e.target.name]: e.target.value
            }
        })
    };
    submitHandler = e => {
        e.preventDefault();
        this.props.addBook(this.state.newBook);
        this.setState({
            newBook: {
                name:'',
                genre:'',
                author:''
            }
        })
    };
    render() {
        return (
            <div className = "App">
                <div>
                    {this.props.book.map(book => {
                        return (
                            <Book 
                                name={book.name}
                                id={book.id}
                                genre={book.genre}
                                author={book.author}
                                deleteBook={this.deleteBook}
                            />
                        );
                    })}
                </div>
                <form onSubmit={this.submitHandler}>
                    <h2>Stack Up On Books!</h2>
                    <input 
                        onChange={this.changeHandler}
                        type='text'
                        placeholder="Add Vivlio"
                        value={this.state.newBook.name}
                        name="name"
                    />
                    <input 
                        onChange={this.changeHandler}
                        type='text'
                        placeholder='Genre'
                        value={this.state.newBook.genre}
                        name='genre'
                    />
                    <input
                        onChange={this.changeHandler}
                        type='text'
                        placeholder='Author'
                        value={this.state.newBook.author}
                        name='author'
                    />
                    <button className="md-button" type="submit">
                        Add Book
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        book:state.book
    }
}

export default connect(
    mapStateToProps,
    {getBook, addBook, deleteBook}
)(BookForm);