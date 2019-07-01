$(document).ready(function(){
    databaseHandler.createDatabase();
});
function addSales(){
    var saleName = $("#txtsaleName").val();
    var quantity = $("#txtsaleQuantity").val();
    var price = $("#txtsalePrice").val();
    var saleDate = $("#txtsaleDate").val();
    var paymentStatus = $("#txtpaymentStatus").val();

    if(!saleName){
        alert("Name is required");
    }else{
        var r = confirm("Name: " + saleName + "\n" + "Quantity: " + quantity + "\n" + "Price: " + price + "\n" + "Purchase Date: " + saleDate + "\n" + "Status: " + paymentStatus);
        if(r==true){
            productHandler.addSales(saleName, quantity, price, saleDate, paymentStatus);
            $("#txtsaleName").val("");
            $("#txtsaleQuantity").val("");
            $("#txtsalePrice").val("");
            $("#txtsaleDate").val("");
            $("#txtpaymentStatus").val("");
        }
    }
}
var currentSale={
    s_id: -1,
    saleName: "",
    quantity:-1,
    price: "",
    saleDate: "",
    paymentStatus: "",
}
function displaySales(results){
    var length = results.rows.length;
    var lstProducts = $("#lstProducts");
    lstProducts.empty();//Clean the old data before adding.
    for(var i = 0; i< length; i++){
        var item = results.rows.item(i);
        var a = $("<a />");
        var h2 = $("<h2 />").text("Product name: ");
        var h3 = $("<h2 />").text("Quantity: ");
        var h4 = $("<h2 />").text("Price: ");
        var h5 = $("<h2 />").text("Purchase date: ");
        var h6 = $("<h2 />").text("Status: ");
        var p = $("<p />").text("Id: ");
        var spansaleName = $("<span />").text(item.saleName);
        spansaleName.attr("name", "saleName");
        var spanQuantity = $("<span />").text(item.quantity);
        spanQuantity.attr("name", "quantity");
        var spanPrice = $("<span />").text(item.price);
        spanPrice.attr("name", "price");
        var spansaleDate = $("<span />").text(item.saleDate);
        spansaleDate.attr("name", "saleDate");
        var spanStatus = $("<span />").text(item.paymentStatus);        
        spanStatus.attr("name", "paymentStatus");
        var spanProductId = $("<span />").text(item.s_id);
        spanProductId.attr("name", "s_id");
        h2.append(spansaleName);
        h3.append(spanQuantity);
        h4.append(spanPrice);
        h5.append(spansaleDate);
        h6.append(spanStatus);
        p.append(spanProductId);
        a.append(h2);
        a.append(h3);
        a.append(h4);
        a.append(h5);
        a.append(h6);
        a.append(p);
        var li = $("<li/>");
        li.attr("data-filtertext", item.saleNamepricepaymentStatus);
        li.append(a);
        lstProducts.append(li);
    }
    lstProducts.listview("refresh");
    lstProducts.on("tap", "li", function(){
        currentSale.s_id = $(this).find("[name='s_id']").text();
        currentSale.saleName = $(this).find("[name='saleName']").text();
        currentSale.quantity = $(this).find("[name='quantity']").text();
        currentSale.price = $(this).find("[name='price']").text();
        currentSale.saleDate = $(this).find("[name='saleDate']").text();
        currentSale.paymentStatus = $(this).find("[name='paymentStatus']").text();
        //Set event for the list item
        $("#popupUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadpage", function(){
    productHandler.loadSales(displaySales);
});

function deleteSales(){
    var r = confirm("Delete product\nName: "+currentSale.saleName+"\nQuantity: "+currentSale.quantity+"\nPrice: "+currentSale.price+"\nPurchase date: "+currentSale.saleDate+"\nStatus: "+currentSale.paymentStatus);
    if(r==true){
        productHandler.deleteSales(currentSale.s_id);
        productHandler.loadSales(displaySales);
    }
    $("#popupUpdateDelete").popup("close");
}

$(document).on("click", function(){
    $("#txtnewsaleName").val(currentSale.saleName);
    $("#txtnewsaleQuantity").val(currentSale.quantity);
    $("#txtnewsalePrice").val(currentSale.price);
    $("#txtnewsaleDate").val(currentSale.saleDate);
    $("#txtnewpaymentStatus").val(currentSale.paymentStatus);
});

function updateSales(){
    var newsaleName = $("#txtnewsaleName").val();
    var newQuantity = $("#txtnewsaleQuantity").val();
    var newPrice = $("#txtnewsalePrice").val();
    var newsaleDate = $("#txtnewsaleDate").val();
    var newPaymentStatus = $("#txtnewpaymentStatus").val();

    productHandler.updateSales(currentSale.s_id, newsaleName, newQuantity, newPrice, newPaymentStatus);
    $("#updatedialog").dialog("close");
}

function displayTotalPrice(results){
    var length = results.rows.length;
    var myTotalPrice = $("#myTotalPrice");
    myTotalPrice.empty();
    for(var i = 0; i < length; i++){
        var item = results.rows.item(i);
        var h = $("<h3 />").text("Total amount: Naira");
        var spanPrice = $("<span />").text(item.totalPrice);
        spanPrice.attr("name", "totalPrice");
        spanPrice.css({"color":"#337ab7", "font-size":"100%"});
        h.append(spanPrice);
        myTotalPrice.append(h);
        
    }
}

function displayTotalPricePaid(results){
    var length = results.rows.length;
    var myTotalPricePaid = $("#myTotalPricePaid");
    myTotalPricePaid.empty();
    for(var i = 0; i < length; i++){
        var item = results.rows.item(i);
        var h = $("<h3 />").text("Total amount paid: Naira");
        var spanPrice = $("<span />").text(item.totalPricePaid);
        spanPrice.attr("name", "totalPricePaid");
        spanPrice.css({"color":"#5cb85c", "font-size":"100%"});
        h.append(spanPrice);
        myTotalPricePaid.append(h);
        
    }
}

function displayTotalPriceNotPaid(results){
    var length = results.rows.length;
    var myTotalPriceNotPaid = $("#myTotalPriceNotPaid");
    myTotalPriceNotPaid.empty();
    for(var i = 0; i < length; i++){
        var item = results.rows.item(i);
        var h = $("<h3 />").text("Total amount notpaid: Naira");
        var spanPrice = $("<span />").text(item.totalPriceNotPaid);
        spanPrice.attr("name", "totalPriceNotPaid");
        spanPrice.css({"color":"#d9534f", "font-size":"100%"});
        h.append(spanPrice);
        myTotalPriceNotPaid.append(h);
        
    }
}

/*function displayTotalPrice(results){
    var length = results.rows.length;
    var mytotalprice = $("#mytotalprice");

    for(var i = 0; i < length; i++){
        var item = results.rows.item(i);
        //console.log("for item: ", item);
    
        var totalprice = JSON.stringify(results.rows.item(i));
        var h3 = $("<h3 />").text(totalprice);
        
        mytotalprice.append(h3);
    }
}*/
$(document).on("pagebeforeshow", "#loadaccount", function(){
    productHandler.loadTotalPrice(displayTotalPrice);
});

$(document).on("pagebeforeshow", "#loadaccount", function(){
    productHandler.loadTotalPricePaid(displayTotalPricePaid);
});

$(document).on("pagebeforeshow", "#loadaccount", function(){
    productHandler.loadTotalPriceNotPaid(displayTotalPriceNotPaid);
});
