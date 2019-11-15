import axios from "axios";

export const FETCH_BOOK = "FETCH_BOOK";
export const ADDING_BOOK_SUCC = "ADDING_BOOK_SUCC";
export const ADDING_BOOK_FAIL = "ADDING_BOOK_FAIL";
export const DELETING_BOOK = "DELETING_BOOK";

export const getBook = () => {
    dispatch({ type: FETCH_BOOK });
    axios
        .get('http://www.meuvivlio.com/api/borrower-wishlist')
        .then(res => dispatch({ type: ADDING_BOOK_SUCC, payload: res.data}))
        .catch(err => dispatch({ type: ADDING_BOOK_FAIL, payload: err }))
}
export const deleteBook = () => dispatch => {
    dispatch({ type: DELETING_BOOK });
    axios
        .delete('http://www.meuvivlio.com/api/borrower-wishlist/:id')
        .then( res => dispatch({ type: DELETING_BOOK, payload: res.data}))
        .catch(err => {
            dispatch({ type: DELETING_BOOK });
        });
};