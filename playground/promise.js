const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a+b);
            }else{
                reject('Arguments must be numbers');
            }
        }, 500);
    });
}

asyncAdd(2, 5)
    .then((res) => {
        console.log('Result: ', res);
        return asyncAdd(res, 33);
    })
    .then((res) => {
        console.log('Result again: ', res);
    })
    .catch((
        error) => console.log(error)
    );

/*

let somePromise = new Promise((resolve, reject) => {
   setTimeout(() => {
       //resolve('It worked');
   }, 2500);


    
    reject('It failed');
});


somePromise.then((message) => {
    console.log('Success: ', message);
}).catch((message) => {
    console.log('Error: ', message);
});

console.log('fin');
    */