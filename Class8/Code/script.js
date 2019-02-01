function  getDocuments(){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url:"https://raw.githubusercontent.com/sedc-codecademy/sedc7-04-ajs/master/g2/Class7/documents.json",
            success: (response)=> {
                resolve(JSON.parse(response));
            },
            error: (error)=> {
                reject(error);
            }
        })
    })
}


// document.querySelector("button").addEventListener("click", ()=>{
//     fetch("https://raw.githubusercontent.com/sedc-codecademy/sedc7-04-ajs/master/g2/Class7/documents.json")
//     .then(response => response.json())
//     .then(data => showDocuments(data))
//     .catch(error => console.log(error.message))
//     .finally(()=> console.log("Everything is done at: " + new Date()));
// })

// Function that gets all documents from server
function getImportantDocuments(documents){
    let importantDocuments = documents.filter(doc => doc.important);
    return new Promise((resolve, reject)=>{
        if(importantDocuments.length === 0){
          reject("There are no important documents!");
        }
        setTimeout(() => {
          resolve(importantDocuments);
        }, 3000);
    })
}
function checkDocuments(documents){
    if(!documents || typeof(documents) != "object"){
        throw new Error("Problem with documents!");
    }
    if(documents.length === 0){
        throw new Error("There is no documents!")
    }
}
function showDocuments(documents){
    documents.forEach(doc => {
        console.log(`${doc.name}.${doc.type} (${doc.size}mb)`);
    });
}

document.querySelector("button").addEventListener("click", ()=>{
    getDocuments()
    .then(data => {
        console.log("We got the documents!");
        checkDocuments(data);
        return getImportantDocuments(data);
    })
    .then(data =>{
        showDocuments(data);
    })
    .catch(error => console.log(error.message))
    .finally(()=> console.log(`Everything is done at: ${new Date()}`));
})

// document.querySelector("button").addEventListener("click", ()=>{
//     getDocuments().then(data => {
//         console.log("We got the documents!");
//         showDocuments(data);
//     }).catch(error => console.log(error.message));
// })

// function first(workTime){
//     return new Promise((resolve, reject)=>{
//         if(workTime <= 0){
//             reject("It's too short of a work time. Please try again!");
//         }
//         setTimeout(() => {
//             resolve("First thing, preparing for the second");
//         }, workTime);

//     })
// }

// function second(){
//     console.log("second thing!");
// }

// document.querySelector("button").addEventListener("click", ()=>{
//     first(1000)
//     .then(success => {
//         console.log(success);
//         second();
//     })
//     .catch(error => console.log(`ERROR: ${error}`))
// })

async function runCode(){
    let response = await fetch("https://raw.githubusercontent.com/sedc-codecademy/sedc7-04-ajs/master/g2/Class7/documents.json");
    let data = await response.json();
    console.log(data);
}
runCode();

function first(workTime){
    return new Promise((resolve, reject)=>{
      if(workTime <= 0){
        reject("It's too short of a work time. Please try again!");
      }
      setTimeout(() => {
        resolve("First thing, preparing for the second");
      }, workTime);
    })
  }
  
function second(){
console.log("second thing!");
}

async function runFunctions(){
    console.log(await first(2000)); // 2
    second(); // 4
    console.log(`Everything is done at: ${new Date()}`); // 5
}

runFunctions(); // 1
console.log("This does not wait for the async function to finish!"); // 3

async function showImportantDocuments(){
    let startTime = new Date().getTime(); // 2
    let documents = await getDocuments(); // 3
    checkDocuments(documents); // 5
    let importantDocs = await getImportantDocuments(documents); // 6
    showDocuments(importantDocs); // 7
    console.log(`Done in: ${( new Date().getTime() - startTime) / 1000}s`); // 8
}

showImportantDocuments(); // 1
console.log("This does not wait for the async function to finish!"); // 4
