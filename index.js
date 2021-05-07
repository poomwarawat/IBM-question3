const args = require("yargs").argv;
let request = require("request");
const cheerio = require("cheerio");

const argv = args._[0];
request = request.defaults({ jar: true });

console.log("Key :", argv);
const cookies = request.cookie("hasCookie=true");
const options = {
  method: "GET",
  url: "https://codequiz.azurewebsites.net/",
  headers: {
    Cookie: cookies,
  },
};
request(options, function (error, response, body) {
  if (!error) {
    let $ = cheerio.load(body);
    const tr = $("tr").text();
    const result = tr.split(argv)[1].substring(0, 7);
    console.log("result :", result);
  } else {
    console.log(error);
  }
});
