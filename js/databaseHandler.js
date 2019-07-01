var databaseHandler = {
db: null,
createDatabase: function(){
    this.db = window.openDatabase(
        "mypharma-ven.db",
        "1.0",
        "mypharma-ven database",
        5000000);
    this.db.transaction(
        function(tx){
            //Run sql here using tx
            //Product table
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS product(p_id INTEGER PRIMARY KEY AUTOINCREMENT, productName TEXT, category TEXT, quantity INTEGER, quantityType TEXT, expiryDate DATE)",
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table: " + error.message);
                }
            );
            //Sales Tables
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS sales(s_id INTEGER PRIMARY KEY AUTOINCREMENT, saleName TEXT, quantity INTEGER, price INTEGER, saleDate DATE, paymentStatus TEXT)",  
                [],
                function(tx, results){},
                function(tx, error){
                    console.log("Error while creating the table: " + error.message);
                }
            );
        },

        function(error){
            console.log("Transaction error: " + error.message);
        },
        function(){
            console.log("Create DB transaction completed successfully");
        }
    );
}
}