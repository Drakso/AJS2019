// Constructor function example
function Person(name, lastName) {
    this.name = name
    this.lastName = lastName
}

Person.prototype.sayName = function () {
    return `Hi my name is ${this.name} ${this.lastName}`
}

function Programmer(name, lastName, languages) {
    Person.call(this, name, lastName)
    this.languages = languages
}

Programmer.prototype = Object.create(Person.prototype)
Programmer.prototype.turnCoffeeIntoCode = function () {
    return `I turn coffee into code like a boss`
}
// 

// Class example

class Person {
    constructor(name, lastName) {
        this.name = name
        this.lastName = lastName
    }
    sayName() {
        return `Hi my name is ${this.name} ${this.lastName}`
    }
}

class Programmer extends Person {
    constructor(name, lastName, languages) {
        super(name, lastName)
        this.languages = languages
    }
    turnCoffeeIntoCode() {
        return `I turn coffee into code like a boss`
    }
}

// Merged, differences and similarities
function MypersonClass () { // <--- the class wrapper
    function Person(name, lastName) {
        this.name = name                   // <--- Our constructor function
        this.lastName = lastName
    }

    Person.prototype.sayName = function () {
        return `Hi my name is ${this.name} ${this.lastName}`  // <--- our prototype function
    }
}

class Person {
   /*function Person*/ constructor(name, lastName) {
        this.name = name
        this.lastName = lastName
    }
    /*Person.prototype.*/sayName() {
        return `Hi my name is ${this.name} ${this.lastName}`
    }
}
//