const db=require('../database/dbConfig.js');
 
 module.exports={
    findBooksByBorrowerId,
    findBookById,
    addBook,
    toggleRequestToBorrow,
    removeBook
}

// Find books by borrower id.
function findBooksByBorrowerId(borrower_id){
    return db('borrower_wishlist')
    .where({borrower_id});
}

// Find book by borrower Id (primary key)
function findBookById(id){
    return db('borrower_wishlist')
    .where({ id });
}

// Create a book in borrower wishlist
async function addBook(borrowWishlist){
    await db('borrower_wishlist').insert(borrowWishlist);
    return findBooksByBorrowerId(borrowWishlist.borrower_id);
}

// Toggle the 'Request to Borrow' flag
async function toggleRequestToBorrow(borrowWishlist){
    const changes = borrowWishlist;
    changes.request_to_borrow = !changes.request_to_borrow;
    await db('borrower_wishlist').where({ id: changes.id }).update(changes);
    return findBooksByBorrowerId(changes.borrower_id);
}

// Remove a book from the borrower wishlist
async function removeBook(borrowWishlist){
    await db('borrower_wishlist ').where({id: borrowWishlist.id}).del();
    return findBooksByBorrowerId(borrowWishlist.borrower_id);
}
