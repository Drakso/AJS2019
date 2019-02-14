class Ship{
    constructor(name, crew, fuelCapacity, hullStrength, speed, img){
        this.name = name;
        this.crew = crew;
        this.fuelMax = fuelCapacity;
        this.fuel = fuelCapacity;
        this.hullMax = hullStrength;
        this.hull = hullStrength;
        this.speed = speed;
        this.credits = 1000;
        this.img = img;
        this.isWorking = false;
        this.isDamaged = false;
        this.isDestroyed = false;
        this.dockedPlanet = null;
    }
    start(destinationPlanet){
        if(!destinationPlanet instanceof Planet) {
            console.log(`${destinationPlanet} is not a planet!`);
            return;
        }
        if(destinationPlanet === this.dockedPlanet){
            console.log(`You are already on planet ${destinationPlanet}.`);
            return;
        }
        if(this.crew >= 1 && this.fuel >= destinationPlanet.distance * 10 && !this.isDamaged && !this.isDestroyed){
            this.isWorking = true;
            if(this.dockedPlanet instanceof Planet){
                this.dockedPlanet.pop();
            }
            console.log("Everything set and ready to go.");
        } else {
            console.log("The ship is not ready to go yet.")
            return;
        }
        console.log(`Heading to ${destinationPlanet.name}`);
        setTimeout(()=>{
            this.fuel -= destinationPlanet.distance * 10;
            this.dock(destinationPlanet);
        }, destinationPlanet.distance * 1000 / this.speed );
    }
    stats(){
        console.log("------- SHIP STATS -------");
        console.log(`CREW: ${this.crew}`);
        console.log(`FUEL: ${this.fuel}/${this.fuelMax}`);
        console.log(`HULL: ${this.hull}/${this.hullMax}`);
    }
    dock(planet){
        console.log(`Docking on planet ${planet.name}`);
        setTimeout(()=>{
            planet.shipsDocked.push(this);
            this.isWorking = false;
            this.planetDocked = planet;
            console.log(`${this.name} docked on the ${planet.name} planet.`);
        }, 2000);
    }
}

class Planet{
    constructor(name, size, population, distance, development){
        this.name = name;
        this.size = size;
        this.population = population;
        this.distance = distance;
        this.shipsDocked = [];
        this.development = development;
    }
    getMarketPrice(price){
        return this.development * price - Math.floor(this.population / this.size);
    }
    repair(ship){
        if(!ship instanceof Ship){
            console.log(`${ship} is not a ship.`);
            return;
        }
        if(this.shipsDocked.length === 0){
            console.log(`You are not docked on this planet!`);
            return;
        }
        let price = this.getMarketPrice(8);
        if(ship.credits >= price){
            ship.credits -= price;
            ship.hull = ship.hullMax;
            console.log("Hulls repaired!");
        } else {
            console.log(`You need ${price - ship.credits} more credits.`);
        }
    }
    refuel(ship){
        if(!ship instanceof Ship){
            console.log(`${ship} is not a ship.`);
            return;
        }
        if(this.shipsDocked.length === 0){
            console.log(`You are not docked on this planet!`);
            return;
        }
        let price = this.getMarketPrice(3);
        if(ship.credits >= price){
            ship.credits -= price;
            ship.fuel = ship.fuelMax;
            console.log("Ship refuled!");
        } else {
            console.log(`You need ${price - ship.credits} more credits.`);
        }
    }
    hireCrewMember(ship){
        if(!ship instanceof Ship){
            console.log(`${ship} is not a ship.`);
            return;
        }
        if(this.shipsDocked.length === 0){
            console.log(`You are not docked on this planet!`);
            return;
        }
        let price = this.getMarketPrice(15);
        if(ship.credits >= price){
            ship.credits -= price;
            ship.crew += 1;
            console.log("A new crew member boarded the ship!");
        } else {
            console.log(`You need ${price - ship.credits} more credits.`);
        }
    }
}

class Event{
    constructor(name, description, crew, fuel, hull, img){
        this.name = name;
        this.description = description;
        this.crew = crew;
        this.fuel = fuel;
        this.hull = hull;
        this.img = img;
    }
}

let game = {
    ships: [
        new Ship("StarFighter", 3, 380, 500, 0.5, "img/StarFighter.png"),
        new Ship("Crushinator", 5, 540, 400, 0.2, "img/Crushinator.png"),
        new Ship("Scouter", 1, 300, 300, 0.9, "img/Scouter.png")
    ],
    planets: [
        new Planet("Rubicon9", 300000, 2000000, 4, 2, "img/Rubicon9.png"),
        new Planet("R7", 120000, 4000000, 7, 3, "img/R7.png"),
        new Planet("Magmus", 500000, 10000000, 6, 1, "img/Magmus.png"),
        new Planet("Dextriaey", 50000, 500000, 9, 3, "img/Dextriaey.png"),
        new Planet("B18-1", 250000, 4000000, 12, 2, "img/B18-1.png")
    ],
    selectedShip: null,
    gameCardInfo: function(planet){
        return `
        <div class="card" style="width: 18rem;">
        <img src="img/${planet.name}.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${planet.name}</h5>
          <p class="card-text">Area: ${planet.size}</p>
          <p class="card-text">Population: ${planet.population}</p>
          <p class="card-text">Development: ${planet.development}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" value="repair">Repair</li>
          <li class="list-group-item" value="refuel">Refuel</li>
          <li class="list-group-item" value="hire">Hire Crew Member</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link" value="stats">Ship Stats</a>
          <a href="#" class="card-link" value="goto">Go to</a>
        </div>
      </div>`
    },
    fillGameBoard: function(){
        game.selectedShip = game.ships[parseInt(prompt("Select a ship: 1, 2, 3")) - 1];
        for (let planet of game.planets) {
            let planetDiv = document.getElementById(planet.name);
            planetDiv.innerHTML = game.gameCardInfo(planet);
            planetDiv.addEventListener("click", function(e){
                e.preventDefault();
                let option = e.target.getAttribute("value");
                option === "repair" ? planet.repair(game.selectedShip) : "";
                option === "refuel" ? planet.refuel(game.selectedShip) : "";
                option === "hire" ? planet.hireCrewMember(game.selectedShip) : "";
                option === "stats" ? game.selectedShip.stats() : "";
                option === "goto" ? game.selectedShip.start(planet) : "";
            })
        }
    }
}

game.fillGameBoard();

