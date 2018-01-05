/*
Write a function called arrayFrom which converts an array-like-object into an array.

Examples:
    var divs = document.getElementsByTagName('divs');
    divs.reduce // undefined
    var converted = arrayFrom(divs);
    converted.reduce // function(){}....
*/

function arrayFrom(arrayLikeObject){
    var newArray = Array.prototype.slice.call(arrayLikeObject);
    return newArray;
}

/* 
// Write a function called sumEvenArguments which takes all of the arguments passed to a function and returns 
the sum of the even ones.

Examples:
    sumEvenArguments(1,2,3,4) // 6
    sumEvenArguments(1,2,6) // 8
    sumEvenArguments(1,2) // 2
*/

function sumEvenArguments() {
    var evenArr = [].slice.call(arguments); 
    return evenArr.reduce(function(acc, nex){
        if(nex % 2 === 0){
            acc += nex;
        }
        return acc;
    },0);
}

sumEvenArguments(1,2,3,4) // 6

/* 
Write a function called invokeMax which accepts a function and a maximum amount. invokeMax should return a 
function that when called increments a counter. If the counter is greater than the maximum amount, the inner 
function should return "Maxed Out"

Examples:

    function add(a,b){
        return a+b
    }

    var addOnlyThreeTimes = invokeMax(add,3);
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(2,2) // 4
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(1,2) // "Maxed Out!"

*/

function invokeMax(fn, num) {
    var count = 0;
    return function () {
        if (count >= num) {
            return "Maxed Out!";
        }
        count++;
        return fn.apply(this, arguments);
        // return the result of the function being called with apply. we don't care what the 
        // value of the keyword 'this' is, so we'll just pass whatever is the value of 'this' at the time.
        // but we do want to use apply so we can pass in the array of arguments to the inner function.
        // Remember: arguments will refer to the arguments passed to the inner function when it is invoked. 
        // Every time a function gets created, it gets its own keyword "this" and its own arguments.
    }
}
    

function add(a,b){
    return a+b;
}

var addOnlyThreeTimes = invokeMax(add,3);
addOnlyThreeTimes(1,2) // 3
addOnlyThreeTimes(2,2) // 4
addOnlyThreeTimes(1,2) // 3
addOnlyThreeTimes(1,2) // "Maxed Out!"

/* 
Write a function called once which accepts two parameters, a function and a value for the keyword 'this'. Once should return a new function
 that can only be invoked once, with the value of the keyword this in the function set to be the second parameter.

Examples:

    function add(a,b){
        return a+b
    }

    var addOnce = once(add, this);
    addOnce(2,2) // 4
    addOnce(2,2) // undefined
    addOnce(2,2) // undefined
    
    function doMath(a,b,c){
        return this.firstName + " adds " + (a+b+c)
    }
    
    var instructor = {firstName: "Elie"}
    var doMathOnce = once(doMath, instructor);
    doMathOnce(1,2,3) // "Elie adds 6"
    doMathOnce(1,2,3) // undefined
    

*/

function once(fn, thisArg){
    var beenCalled = false;
    return function(){
        if(!beenCalled){
            beenCalled = true;
            return fn.apply(thisArg, arguments);
            // return the result of the function that we pass to 'once' being invoked using apply.
            // Here, we can specify the value of the keyword 'this' and pass in the arguments array-like object
            // from the inner function.
        }
    }
}

function add(a,b){
    return a+b
}

var addOnce = once(add, this);
addOnce(2,2) // 4
addOnce(2,2) // undefined
addOnce(2,2) // undefined


// BONUSES! 

/* 
Write a function called bind which accepts a function and a value for the keyword this. Bind should return a new function that when invoked, 
will invoke the function passed to bind with the correct value of the keyword this. HINT - if you pass more than two parameters to bind, 
those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

Examples:

    function firstNameFavoriteColor(favoriteColor){
        return this.firstName + "'s favorite color is " + favoriteColor
    }
    
    var person = {
        firstName: 'Elie'
    }
    
    var bindFn = bind(firstNameFavoriteColor, person);
    bindFn('green') // "Elie's favorite color is green"
    
    var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
    bindFn2('green') // "Elie's favorite color is blue" 
    
    function addFourNumbers(a,b,c,d){
        return a+b+c+d;
    }

    bind(addFourNumbers,this,1)(2,3,4) // 10
    bind(addFourNumbers,this,1,2)(3,4) // 10
    bind(addFourNumbers,this,1,2,3)(4) // 10
    bind(addFourNumbers,this,1,2,3,4)() // 10
    bind(addFourNumbers,this)(1,2,3,4) // 10
    bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10

*/

function bind(fn, thisArg){
    // we're going to pass in some function and some value for the keyword 'this'
    var outerArgs = [].slice.call(arguments, 2);
    // create a variable which is the result of the arguments array-like object being converted into an array.
    // here we pass a parameter to slice. We want to collect the remaining arguments that get passed to the bind function.
    // We don't want the first or second parameter, just any remaining ones.
    return function(){
        var innerArgs = [].slice.call(arguments);
        // then return a function and inside of this inner function make a variable 'inner' which is the result of converting
        // the arguments array-like object into an array.    
        var allArgs = outer.concat(innerArgs);
        // variable 'allArgs' which will concatinate the outer args with the inner args. 
        // The idea here is to build up one large array of arguments which we can pass to apply
        return fn.apply(thisArg, allArgs);
        // return the result of the orginial function being invoked with apply as the first parameter,
        // and passing in for the keyword 'this', our second parameter to bind. 
        // then, as an array of arguments, passing in both the outer and the inner ones.
    }
}


/* 
Write a function called flip which accepts a function and a value for the keyword this. Flip should return a new function that when invoked,
 will invoke the function passed to flip with the correct value of the keyword this and all of the arguments passed to the function REVERSED. 
 HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is 
 invoked. You will have to make use of closure! 

Examples:

    function personSubtract(a,b,c){
        return this.firstName + " subtracts " + (a-b-c);
    }
    
    var person = {
        firstName: 'Elie'
    }
    
    var flipFn = flip(personSubtract, person);
    flipFn(3,2,1) // "Elie subtracts -4"
    
    var flipFn2 = flip(personSubtract, person, 5,6);
    flipFn2(7,8). // "Elie subtracts -4"
    
    function subtractFourNumbers(a,b,c,d){
        return a-b-c-d;
    }

    flip(subtractFourNumbers,this,1)(2,3,4) // -2
    flip(subtractFourNumbers,this,1,2)(3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4) // -2
    flip(subtractFourNumbers,this,1,2,3,4)() // -2
    flip(subtractFourNumbers,this)(1,2,3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
    flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
    flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22

*/


function flip(fn, thisArg){
     // we're going to pass in some function and some value for the keyword 'this'
     var outerArgs = [].slice.call(arguments,2);
     // we're going to collect the remaining arguments passed to 'flip' by converting the array-like arguments
     // into an array and slicing from two.
     return function(){
     // return an anonymous function and inside of this function we'll make a variable called innerArgs
        var innerArgs = [].slice.call(arguments);
        // We want to make suer that we invoke our funciton with only the number of parameters specified.
        // since we are going to be calling the arguments in reverse.
        var allArgs = outerArgs.concat(innerArgs).slice(0, fn.length);
        // so in our allArgs variable, we will concatente the outeRArgs with the innerArgs, but we're only going
        //to make a copy starting from 0 to however many parameters of the function that we pass to 'flip' accepts.
        // all functions have a property called length which return the number of arguments that the function accepts.
        // we can use the length to figure out exactly how many parameters our allArgs array should use.
        return fn.apply(thisArg, allArgs.reverse());
        // finally, we return the result of invoking the function using apply and as a first parameter specifying a value
        // for the keyword 'this' which we passed in the flip function, and as the second parameter we'll use our allArgs variable.
        // We'll just have to make sure that we call reverse on our allArgs variable.   
     }
}



