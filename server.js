const net = require("net");
const fs = require("fs");

const server = net.createServer();

server.listen(7000, () => {
  console.log("Server listening on port 7000.");
});

let fileRequest = "";
let writePath = "";

const makeFilePath = function(filename) {
  let filepath = `./data-files-server/${filename}`;
  return filepath;
};

//You have to specify a file to write to, even if it doesn't exist, it will just create it.
server.on("connection", (client) => {
  
  console.log("New client connected.");
  client.write("Connection established.");
  client.setEncoding("utf8");
  
  client.on("data", (data) => {
    
    let dataArray = data.split(", ");
    fileRequest = dataArray[0];
    writePath = dataArray[1] + fileRequest;

    fs.copyFile(makeFilePath(fileRequest),writePath, (error) => {
  
      if (error) {
        console.log("Error:",error);
      } else {
        console.log("File written to:",writePath);
        client.write("File written.");
      }
    });
  });
});

//It looks like all of the below needs to be in the above ".on" method call. Otherwise due to asynchrony and probably syntax and usage errors, it won't work.

/* server.on("data", (data) => {
  let dataArray = data.split(", ");
  fileRequest = dataArray[0];
  writePath = dataArray[1];
}); */



/* fs.copyFile(makeFilePath(fileRequest),writePath, (error) => {
  
  if (error) {
    console.log("Error:",error);
  } else {
    console.log("File written to:", writePath);
  }
}); */