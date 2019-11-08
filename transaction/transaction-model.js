const db=require('../database/dbConfig.js');
 
 module.exports={
    
    addTransaction,
    
}



// Add a transaction history
async function addTransaction(transaction){
    await db('transactions').insert(transaction);
    // return findTransactions(transaction.lender_id);
}
