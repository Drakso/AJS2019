// Object Create and Assign
let dog = {
    isHappy: true,
    bark: function(){
        console.log("BARK BARK BARK!")
    }
}

let barnie = Object.create(dog);
barnie.name = "Barnie";
barnie.color = "White";
barnie.age = 2;
barnie.happyBirthday = function(){
    console.log("Happy birthday Barnie!");
    this.age++;
}

let barnieTwinBrother = Object.create(barnie);
barnieTwinBrother.name = "Booch";

let addressInfo = {
    street: "Dogge Street",
    streetNumber: 24,
    contactPerson: "0703452323"
}

let barnieChip = Object.assign(barnie, addressInfo);

let anotherAddress = {
    street: "Other Street",
    streetNumber: 12,
    contactPerson: "072990002"
}

let barnieChipUpdate = Object.assign(barnieChip, anotherAddress);
let barnieChipUpdateReversed = Object.assign(anotherAddress, barnieChip);

// Keys, Values, Entries
console.log(Object.keys(barnie));
console.log(Object.values(barnie));
let dog = {
    name: "Sparky",
    age: 1,
    bark: function(){
        console.log("BARK BARK BARK");
    },
    printProperties: function(){
        Object.keys(this).forEach(key => console.log(key));
    },
    printValues: function(){
        Object.values(this).forEach(key => console.log(key));
    }
}

console.log(Object.entries(barnie))
dog.printOnlyProperties = function(){
    Object.entries(barnie).forEach(pair => typeof(pair[1]) === "function" ? "" : console.log(pair));
}

// Freeze and Seal
Object.freeze(barnie);
barnie.friend = "Sparky";
console.log(barnie.friend);
barnie.name = "Bob";
console.log(barnie.name);
console.log(Object.isFrozen(barnie));

Object.seal(dog);
dog.friend = "Barnie";
console.log(dog.friend);
dog.name = "Bill";
console.log(dog.name);
console.log(Object.isSealed(dog));

console.log(Object.isSealed(barnie));
console.log(Object.isFrozen(dog));