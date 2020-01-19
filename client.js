const net = require("net");


//here we define a new funciton conn, that is equal to the call if the createConnection method of net with an object as an in-line argument.
const conn = net.createConnection({
  host: "localhost",
  port: 7000
});

conn.setEncoding("utf8"); //Interpret the received data as text


let requestedFile = "textFile.txt";
let writePath = "./data-files-client/";

conn.on("data", (data) => {
  console.log(data);
});

conn.on("connect",() => {
  conn.write(`${requestedFile}, ${writePath}`);
});
