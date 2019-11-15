import React, { Cmponent } from "react";
import {connect} from "react-redux";
import {deleteBook} from "../actions/index";

class Book extends Component  {
    render() {
        return (
            <div className="App">
                <div className="book-box">
                    <h3>Name:{this.props.name}</h3>
                    <p>Genre:{this.props.genre}</p>
                    <p>Author:{this.props.author}</p>
                    <br />
                    <button 
                        className="delete-btn"
                        onClick= {e => {
                            this.props.deleteBook(this.props.id);
                        }}> Delete Book </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        book: state.deleteBook
    };
};

export default connect(
    mapStateToProps,
    {deleteBook}
)(Book)