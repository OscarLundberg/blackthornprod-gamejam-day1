const Express = require("express");

const [port = 8080, ...rest] = process.argv.slice(2)
const app = Express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const counts = {};
app.get("/hit/:key", (req, res) => {
  const value = counts?.[req.params.key] != null ? counts[req.params.key] + 1 : 1;
  counts[req.params.key] = value;
  res.send(200);
});

app.get("/list", (req, res) => {
  res.send(counts);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});