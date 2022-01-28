export class Item {
    constructor(itemID,name, brand, categoryID, wholesalePrice, price, stockQty, orderQty){
        
        this.ID = itemID;
        this.name = name
        this.brand = brand;
        this.categoryID = categoryID;
        this.wholesalePrice = wholesalePrice
        this.price = price;
        this.stockQty = stockQty;
        this.orderQty = orderQty;
    }

}