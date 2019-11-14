const db=require('../database/dbConfig.js');
 
 module.exports={
    findBooksByLenderId,
    findBookById,
    addBook,
    toggleAvailability,
    removeBook
}

// Find books by lender Id.
function findBooksByLenderId(lender_id){
    return db('lender_collection')
    .where({lender_id});
}

// Find book by lender collection Id (primary key)
function findBookById(id){
    return db('lender_collection')
    .where({id});
}

// Create a book in lender collection
async function addBook(lenderBook){
    await db('lender_collection').insert(lenderBook);
    return findBooksByLenderId(lenderBook.lender_id);
}

// Toggle the availability flag
async function toggleAvailability(lenderBook){
    const changes = lenderBook;
    changes.is_available = !changes.is_available;
    await db('lender_collection').where({ id: changes.id }).update(changes);
    return findBooksByLenderId(changes.lender_id);
}

// Remove a book from the lender collection
async function removeBook(lenderBook){
    await db('lender_collection').where({ id: lenderBook.id }).del();
    return findBooksByLenderId(lenderBook.lender_id);
}
