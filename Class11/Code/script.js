// function Animal(name, type){
// 	this.name = name;
// 	this.type = type;
//     this.eat = function(){console.log(this.name + " is eating!")}
// }

// let dog = new Animal("spark", "k9");
// let anotherDog = Object.create(dog);

// let random = {
// 	name: "bob",
// 	last: "wo",
// 	eat: function(){console.log(this.name + " is eating!")}
// }

// // dog.eat();
// // anotherDog.eat();
// // random.eat();

// let fish = { 
//     type: "sea",
//     water: "salty",
//     fins: 2
// }
// function Dog(isGoodBoi, name){
//     this.prototype = Object.create(new Animal());
//     this.isGoodBoi = isGoodBoi;
//     this.__proto__.name = name;
    
// }
// Animal.prototype.talk = function(){
//     console.log(`${this.name} can talk! WOW!`);
// }



// Dog.prototype.goWild = function(){console.log("go wild!")};
// Dog.prototype = Object.create(new Animal());

// let dogo = new Dog(true, "spike");
// dogo.talk();
// dogo.eat();
// Dog.prototype.goWild = function(){console.log("go wild!")};
// dogo.goWild();
// console.log(Dog.prototype);
// // console.log(Animal.prototype);
// // console.log(Animal);
// // console.log(dog.prototype);
// // console.log(Dog.prototype)

// console.log(dogo);
// fish.__proto__ = new Animal("fishy","fish");
// fish.name = "NEMO";
// // fish.eat();
// // console.log(fish.__proto__)

function Vehicle(id, name, batchNo, price){
	this.id = id;
	this.name = name;
	this.batchNo = batchNo;
	this.price = price;
	this.company = "move.inc";
	this.printVehicle = function(){
		console.log(`${id}. ${name}, BATCH: ${batchNo}, ${price}$`);
	}
}
// function WheeledVehicle(wheels){
// 	this.wheels = wheels;
// 	this.drive = function(){
// 		console.log(`Driving on ${this.wheels} wheels!`);
// 	}
// }
function WheeledVehicle(wheels, id, name, batch, price){
    WheeledVehicle.prototype = Object.create(new Vehicle());
    this.__proto__.id = id;
	this.__proto__.name = name;
	this.__proto__.batchNo = batch;
	this.__proto__.price = price;
	this.wheels = wheels;
	this.drive = function(){
		console.log(`Driving on ${this.wheels} wheels!`);
	}
}
WheeledVehicle.prototype = Object.create(new Vehicle());
let someCar = new WheeledVehicle(4, 11, "car", "33r", 1200);
console.log(someCar);
let vehicle = new Vehicle(12, "Yugo", "25B", 500);
console.log(vehicle);
let someOtherCar = new WheeledVehicle(2)
console.log(someOtherCar);
// let wheeledVehicle = Object.create(new Vehicle(12, "Yugo", "25B", 500));
// wheeledVehicle.drive = function(){console.log("WROOM!")}
// let car = Object.create(wheeledVehicle);
// car.fuelTank = 32;
// car.drive();
// car.printVehicle();
// console.log(car);