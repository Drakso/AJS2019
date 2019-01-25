// console.log("Hey!");
// setTimeout(()=> console.log("This happens later!"), 2000)
// setTimeout(()=> console.log("This happens later!"), 2000)
// console.log("Bye");
// let interval = setInterval(()=> console.log("Hello again!") , 3000);

// function sleep(ms) {
//     ms += new Date().getTime();
//     while (new Date() < ms){}
//    }
// document.getElementsByTagName("button")[0].addEventListener("click", ()=>{
//     clearInterval(interval);
//     setTimeout(()=> console.log("This happens later!"), 2000)
// })
// let cb1 = () => console.log("cb1");

// console.log("Hi");
// setTimeout(cb1 , 1000);
// console.log("Bye");

// function calculate(callback, num1, num2){
// 	console.log("calculating...");
// 	return callback(num1,num2);
// };
// let result = calculate((x, y) => x + y, 2, 5);
// console.log(result);

// function first(callback){
//     setTimeout(()=>{
//         console.log("First thing");
//         callback();
//     },1000);
// } 
// function second(){
// 	console.log("Second thing!");
// }
// first(second);

function makeCall(url, callback){
    $.ajax({
        url: url,
        success: function (response) {
          console.log('The request succeeded!');
          callback(response);
        }, 
        error: function(response){
          console.log('The request failed!');
          return response.responseText;
        }
      });
}
function print(results){
    console.log(results);
}
makeCall("https://swapi.co/api/people/1/", print);