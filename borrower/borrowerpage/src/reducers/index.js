import {
    FETCH_BOOK,
    CREATE_BOOK,
    ADDING_BOOK_SUCC,
    ADDING_BOOK_FAIL,
    DELETING_BOOK
} from '../actions';
import { isNull } from 'util';

const initialState = {
    book: [],
    fetchingBook: false,
    addingBook: false,
    updatingBook: false,
    deletingBook: false,
    error: null
};

function reducer( state = initialState, action) {
    switch (action.type) {
        case FETCH_BOOK: 
            return {
                ...state,
                error:'',
                addingBook: false
            };
        case CREATE_BOOK:
            return {
                ...state,
                error:'',
                addingBook: true
            }
        case ADDING_BOOK_SUCC:
            return {
                ...state,
                error:'',
                error: null
            }
        case ADDING_BOOK_FAIL:
            return {
                ...state,
                addingBook: false,
                error: action.payload
            }
        case DELETING_BOOK:
            return {
                ...state,
                book: state.book.filter(book => book.id !== action.payload)
            }
        default:
            return state;
    }
}

export default reducer;