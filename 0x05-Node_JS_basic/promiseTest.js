#!/usr/bin/node

function counter(time) {
	return new Promise((resolve, reject) => {
	    setTimeout(() => {
		resolve();
	    }, time * 1000);
	});
    }
    
  function main() {
	console.log('Start 5 seconds counter');
	counter(5) // Waits for 5 seconds
	.then((res) => {
		console.log('5 seconds elapsed');

	})	
	console.log('Start 7 seconds counter');
	counter(7) // Waits for 7 seconds
  .then((res) => {
    console.log('7 seconds elapsed');
  })
    }
    
    main();
    