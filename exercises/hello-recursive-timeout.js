function sayHello() {
    console.log("Hello");
    setTimeout(sayHello, 1000);
}

sayHello();