class Animal{
    constructor(name, type, age, size){
        this.name = name;
        this.type = type;
        this.age = age;
        this.size = size;
        this.isEaten = false;
    }
    set type(data){
        data = data.toLowerCase();
        if(data !== "carnivore" && data !== "omnivore" && data !== "herbivore"){
            throw new Error("There is no such type!");
        } else {
            this._type = data;
        }
    }
    get type(){
        return this._type;
    }
    eat(food){
        if(food instanceof Animal){
            if(this.type === "herbivore"){
                console.log(`The animal ${this.name} is a herbivore and does not eat other animals!`);
                return;
            }
            if(this.size >= food.size * 2){
                food.isEaten = true;
                console.log(` The animal ${this.name} ate the ${food.name}!`);
                return;
            } else if(this === food){
                console.log("ITS THE SAME!");
                return;
            }else{
                console.log(`The animal ${this.name} tried to eat the ${food.name} but it was too large`);
                return;
            }
        }
        console.log(`The animal ${this.name} is eating ${food}`);
    }
}

class Lion extends Animal{
    constructor(name, age, size, isKing, huntingSkill){
        super(name, "carnivore", age, size);
        this.isKingOfTheJungle = isKing;
        this.huntingSkill = huntingSkill;
    }
    set huntingSkill(data){
        if(data < 0 || data > 10 || typeof(data) !== "number"){
            throw new Error("There is no such skill number!");
        } else {
            this._huntingSkill = data;
        }
    }
    get huntingSkill(){
        return this._huntingSkill;
    }
    hunt(animal){
        let randomNum = Math.floor(Math.random() * 10) + 1;
        if(animal instanceof Animal){
            if(this.isKingOfTheJungle){
                this.eat(animal)
                return;
            }
            if(randomNum <= this.huntingSkill){
                this.eat(animal);              
                return;
            } else {
                console.log("The Lion didn't catch it's prey");
                return;
            }
        }
        console.log(`The Lion can't hunt ${animal}`);
    }
}

class Rabbit extends Animal{
    constructor(name, age, size, speed){
        super(name, "herbivore", age, size);
        this.speed = speed;
    }
    get size(){
        return this._size * this.speed;
    }
    set size(data){

        this._size = data;
    }
    get speed(){
        return this._speed;
    }
    set speed(data){
        if(data < 0 || data > 10){
            throw new Error("There is no speed like that value!")
        }
        this._speed = data;
    }
}

let lion = new Animal("Lion", "carnivore", 2, 60);
let elephant = new Animal("Elephant", "herbivore", 12, 300);
let mouse = new Animal("mouse", "omnivore", 1, 5);
let lion1 = new Lion("king", 22, 70, false, 6);
let rabbit = new Rabbit("zajo", 22, 20, 7);
lion.eat(lion);

// lion1.hunt(mouse);
// lion1.hunt(rabbit);
// lion.eat(elephant);
// elephant.eat(lion);
// mouse.eat(lion);
// lion.eat(mouse);
// console.log(mouse);
/**

## Create a Lion class that inherits from Animal and has:
* isKingOfTheJungle - boolean
* huntingSkill - must be from 1 to 10 ( validate on setting this property )
* hunt - a method that checks if the input is an Animal.
	* If the input is an Animal than randomly generate a number from 1 to 10. If the number is equal or less than the huntingSkill of this Lion than try and eat the animal with the eat method.
	* If the Lion is king of the jungle than automatically try and eat the animal no matter the huntingSkill
	* If the number is larger than the huntingSkill then write in the console: The Lion didn't catch it's prey
	* If the input is not an animal write in the console: The Lion can't hunt (the input)

**Note**: name and type of the lion should be added automatically without entering it from the constructor

## Create a Rabbit class that inherits from Animal and has:
* speed - must be from 1 to 10 ( validate on setting this property )
* size - custom get and set. ( set is normal, get returns the size value multiplied by the speed property. )

 */