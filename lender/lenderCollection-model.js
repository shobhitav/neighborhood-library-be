const db=require('../database/dbConfig.js');
 
 module.exports={
    findBooksByLenderId,
    addBook,
    toggleAvailability,
    removeBook
}

// Find books by lender Id.
function findBooksByLenderId(lender_id){
    return db('lender_collection')
    .where({lender_id});
}

// Create a book in lender collection
async function addBook(lenderCollection){
    await db('lender_collection').insert(lenderCollection);
    return findBooksByLenderId(lenderCollection.lender_id);
}

// Toggle the availability flag
async function toggleAvailability(lenderCollection){
    const changes = lenderCollection;
    changes.is_available = !changes.is_available;
    await db('lender_collection').where({ id: changes.id }).update(changes);
    return findBooksByLenderId(changes.lender_id);
}

// Remove a book from the lender collection
async function removeBook(lenderCollection){
    await db('lender_collection').where({ id: lenderCollection.id }).del();
    return findBooksByLenderId(lenderCollection.lender_id);
}
