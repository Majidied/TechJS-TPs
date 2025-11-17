console.log("Program started");

function createPromise(delayMs, message) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(message), delayMs);
  });
}

const firstPromise = createPromise(1000, "Step 1 complete");

console.log(firstPromise);
console.log("Program in progress...");

firstPromise
  .then((msg1) => {
    console.log(msg1);
    return createPromise(3000, "Step 2 complete");
  })
  .then((msg2) => {
    console.log(msg2);
  });