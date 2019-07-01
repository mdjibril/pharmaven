$(document).on("ready", function(){
    databaseHandler.createDatabase();
});
function addProduct(){
    var productName = $("#txtproductName").val();
    var category = $("#txtCategory").val();
    var quantity = $("#txtQuantity").val();
    var quantityType = $("#txtQuantityType").val();
    var expiryDate =$("#txtExpiryDate").val();

    if(!productName){
        alert("Name is required");
    }else{
        var r = confirm("Name: " + productName + "\n" + "Category: " + category + "\n" + "Quantity: " + quantity + "\n" + "QuantityType: " + quantityType + "\n" + "Expiry Date: " + expiryDate);
        if(r==true){
            productHandler.addProduct(productName, category, quantity, quantityType,expiryDate);
            $("#txtproductName").val("");
            $("#txtCategory").val("");
            $("#txtQuantity").val("");
            $("#txtQuantityType").val("");
            $("#txtExpiryDate").val("");
        }
    }
}
var currentProduct={
    p_id: -1,
    productName: "",
    category: "",
    quantity:-1,
    quantityType: "",
    expiryDate: "",
}
function displayProducts(results){
    var length = results.rows.length;
    var lstProducts = $("#lstProducts");
    lstProducts.empty();//Clean the old data before adding.
    for(var i = 0; i< length; i++){
        var item = results.rows.item(i);
        var a = $("<a />");
        var h2 = $("<h2 />").text("Product name: ");
        var h3 = $("<h2 />").text("Category: ");
        var h4 = $("<h2 />").text("Quantity: ");
        var h5 = $("<h2 />").text("Package type: ");
        var h6 = $("<h2 />").text("Expiry Date: ");
        var p = $("<p />").text("Id: ");
        var spanProductName = $("<span />").text(item.productName);
        spanProductName.attr("name", "productName");
        var spanCategory = $("<span />").text(item.category);
        spanCategory.attr("name", "category");
        var spanQuantity = $("<span />").text(item.quantity);
        spanQuantity.attr("name", "quantity");
        var spanQuantityType = $("<span />").text(item.quantityType);
        spanQuantityType.attr("name", "quantityType");
        var spanExpiryDate = $("<span />").text(item.expiryDate);        
        spanExpiryDate.attr("name", "expiryDate");
        var spanProductId = $("<span />").text(item.p_id);
        spanProductId.attr("name", "p_id");
        h2.append(spanProductName);
        h3.append(spanCategory);
        h4.append(spanQuantity);
        h5.append(spanQuantityType);
        h6.append(spanExpiryDate);
        p.append(spanProductId);
        a.append(h2);
        a.append(h3);
        a.append(h4);
        a.append(h5);
        a.append(h6);
        a.append(p);
        var li = $("<li/>");
        li.attr("data-filtertext", item.productNamecategoryexpiryDate);
        li.append(a);
        lstProducts.append(li);
    }
    lstProducts.listview("refresh");
    lstProducts.on("tap", "li", function(){
        currentProduct.p_id = $(this).find("[name='p_id']").text();
        currentProduct.productName = $(this).find("[name='productName']").text();
        currentProduct.category = $(this).find("[name='category']").text();
        currentProduct.quantity = $(this).find("[name='quantity']").text();
        currentProduct.quantityType = $(this).find("[name='quantityType']").text();
        currentProduct.expiryDate = $(this).find("[name='expiryDate']").text();
        //Set event for the list item
        $("#popupUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadpage", function(){
    productHandler.loadProducts(displayProducts);
});

function deleteProduct(){
    var r = confirm("Delete product\nName: "+currentProduct.productName+"\nCategory: "+currentProduct.category+"\nQuantity: "+currentProduct.quantity+"\nType: "+currentProduct.quantityType+"\nExpiry Date: "+currentProduct.expiryDate);
    if(r==true){
        productHandler.deleteProduct(currentProduct.p_id);
        productHandler.loadProducts(displayProducts);
    }
    $("#popupUpdateDelete").popup("close");
}

$(document).on("pagebeforeshow", "#updatedialog", function(){
    $("#txtnewProductName").val(currentProduct.productName);
    $("#txtnewCategory").val(currentProduct.category);
    $("#txtnewQuantity").val(currentProduct.quantity);
    $("#txtnewQuantityType").val(currentProduct.quantityType);
    $("#txtnewExpiryDate").val(currentProduct.expiryDate);
});

function updateProduct(){
    var newProductName = $("#txtnewProductName").val();
    var newCategory = $("#txtnewCategory").val();
    var newQuantity = $("#txtnewQuantity").val();
    var newQuantityType = $("#txtnewQuantityType").val();
    var newExpiryDate = $("#txtnewExpiryDate").val();

    productHandler.updateProduct(currentProduct.p_id, newProductName, newCategory,newQuantity, newQuantityType, newExpiryDate);
    $("#updatedialog").dialog("close");
}