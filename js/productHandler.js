var productHandler={
    //begining of all product(add,read,delete and update) function
    addProduct: function(productName, category, quantity, quantityType, expiryDate){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "INSERT INTO product(productName, category, quantity, quantityType, expiryDate) VALUES(?, ?, ?, ?, ?)",
                    [productName, category, quantity, quantityType, expiryDate],
                    function(tx, results){},
                    function(tx, error){
                        console.log("add product error: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );
    },
    loadProducts: function(displayProducts){
        databaseHandler.db.readTransaction(
            function(tx){
                tx.executeSql(
                    "SELECT * FROM product",
                    [],
                    function(tx, results){
                        //Do the display
                        displayProducts(results);
                    },
                    function(tx, error){//TODO: Alert the message to user
                        console.log("Error while selecting the products" + error.message);
                    }
                );
            }
        );
    },
    deleteProduct:function(p_id){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "DELETE FROM product WHERE p_id = ?",
                    [p_id],
                    function(tx, results){},
                    function(tx, error){//TODO: Could make an alert for this one.
                        console.log("Error happen when deleting: " + error.message);
                    }
                );
            }
        );
    },
    updateProduct: function(p_id, newProductName, newCategory, newQuantity, newQuantityType, newExpiryDate){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "UPDATE product SET productName=?, category=?, quantity=?, quantityType=?, expiryDate=? WHERE p_id = ?",
                    [newProductName, newCategory, newQuantity, newQuantityType, newExpiryDate, p_id],
                    function(tx, result){},
                    function(tx, error){//TODO: alert/display this message to user
                        console.log("Error updating product" + error.message);
                    }
                );
            }
        );
    },
    //end of all product functions

    //begining of sales(add,read,delete and update) functions
    addSales: function(saleName, quantity, price, saleDate, paymentStatus){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "INSERT INTO sales(saleName, quantity, price, saleDate, paymentStatus) VALUES(?, ?, ?, ?, ?)",
                    [saleName, quantity, price, saleDate, paymentStatus],
                    function(tx, results){},
                    function(tx, error){
                        console.log("add sale error: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );
    },
    loadSales: function(displaySales){
        databaseHandler.db.readTransaction(
            function(tx){
                tx.executeSql(
                    "SELECT * FROM sales",
                    [],
                    function(tx, results){
                        //Do the display
                        displaySales(results);
                    },
                    function(tx, error){//TODO: Alert the message to user
                        console.log("Error while selecting the sold items" + error.message);
                    }
                );
            }
        );
    }, 
    deleteSales:function(s_id){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "DELETE FROM sales WHERE s_id = ?",
                    [s_id],
                    function(tx, results){},
                    function(tx, error){//TODO: Could make an alert for this one.
                        console.log("Error happen when deleting: " + error.message);
                    }
                );
            }
        );
    },
    updateSales: function(s_id, newsaleName, newQuantity, newPrice, newsaleDate, newPaymentStatus){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "UPDATE sales SET saleName=?, quantity=?, price=?, saleDate=?, paymentStatus=? WHERE s_id = ?",
                    [newsaleName, newQuantity, newPrice, newsaleDate, newPaymentStatus, s_id],
                    function(tx, result){},
                    function(tx, error){//TODO: alert/display this message to user
                        console.log("Error updating sold item" + error.message);
                    }
                );
            }
        );
    },
    //end of all sales functions


    loadTotalPrice: function(displayTotalPrice){
        databaseHandler.db.readTransaction(
            function(tx){
                tx.executeSql(
                    "SELECT SUM(price) AS totalPrice  FROM sales",
                    [],
                    function(tx, results){
                        //display total price
                        displayTotalPrice(results);
                    },
                    function(tx, error){
                        console.log("Error while summing price" + error.message);
                    }
                );
            }
        );
    },

    loadTotalPricePaid: function(displayTotalPricePaid){
        databaseHandler.db.readTransaction(
            function(tx){
                tx.executeSql(
                    "SELECT SUM(price) AS totalPricePaid FROM sales WHERE paymentStatus ='paid'",
                    [],
                    function(tx, results){
                        //display total price
                        displayTotalPricePaid(results);
                    },
                    function(tx, error){
                        console.log("Error while summing price" + error.message);
                    }
                );
            }
        );
    },

    loadTotalPriceNotPaid: function(displayTotalPriceNotPaid){
        databaseHandler.db.readTransaction(
            function(tx){
                tx.executeSql(
                    "SELECT SUM(price) AS totalPriceNotPaid FROM sales WHERE paymentStatus ='notpaid'",
                    [],
                    function(tx, results){
                        //display total price
                        displayTotalPriceNotPaid(results);
                    },
                    function(tx, error){
                        console.log("Error while summing price" + error.message);
                    }
                );
            }
        );
    }
}