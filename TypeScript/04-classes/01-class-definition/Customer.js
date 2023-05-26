var customer = /** @class */ (function () {
    function customer(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return customer;
}());
var cli = new customer("Hugo", "Baltazar");
console.log(cli);
