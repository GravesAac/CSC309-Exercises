function groupBy(arr, property) {
    result = {};
    for (var j = 0; j < arr.length; j++) {
        for (const prop in arr[j]) {
            if (prop === property) {
                if(Object.hasOwn(result, arr[j][prop])){
                    result[arr[j][prop]].push(arr[j]);
                } else {
                    result[arr[j][prop]] = [];
                    result[arr[j][prop]].push(arr[j]);
                }
            }
        }
    }
    return result;
}

const memoize = (fn) => {
    let cache = {};
    return (n) => {
        if (n in cache) {
            return cache[n];
        } else {
            let curr = fn(n);
            cache[n] = curr;
            return curr;
        }
    }
}

function flattenArray(nestedArray) {
    let result = [];
    for (var i = 0; i < nestedArray.length; i++) {
        if(Array.isArray(nestedArray[i])) {
            result = result.concat(flattenArray(nestedArray[i]));
        } else {
            result.push(nestedArray[i]);
        }
    }
    return result;
}

class EventEmitter {
    constructor () {
        this.event = {}
    }

    on (eventname, handler) {
        if (!this.event[eventname]) {
            this.event[eventname] = [];
        }
        this.event[eventname].push(handler);
        
    }

    emit(eventname, input) {
        if(this.event[eventname]) {
            this.event[eventname].forEach(handler => handler(input));
        }
    }
    
}

function sumNestedValues(obj) {
     let sum = 0;
     for (const item in obj) {
         if (typeof(obj[item]) == 'number') {
             sum += obj[item];
         } else {
             sum += sumNestedValues(obj[item]);
         }
     }
     return sum;
 }

function paginateArray(arr, pageSize, pageNumber){
    let curr = [];
    let start = pageSize * (pageNumber - 1);
    for (var i = start; i < (start + pageSize); i++) {
        if (typeof(arr[i]) != 'undefined') {
            curr.push(arr[i]);
        } else {
            break;
        }
    }
    return curr;
}

function firstNonRepeatingChar(str) {
    let curr = {};
    let charlst = [];
    for (var i = 0; i < str.length; i++) {
        if(!curr[str.charAt(i)]) {
            curr[str.charAt(i)] = 0;
        } 
        curr[str.charAt(i)] ++;
    }
    for (var i = 0; i < str.length; i ++) {
        if (curr[str.charAt(i)] == 1) {
            return str.charAt(i);
        }
    }
    return null;
}

module.exports = {
    flattenArray,
    groupBy,
    memoize,
    sumNestedValues,
    paginateArray,
    EventEmitter,
    firstNonRepeatingChar,
  };

