const jsonServer = require("json-server")
const server = jsonServer.create()

const middlewares = jsonServer.defaults();

server.use(middlewares)

server.use(
 jsonServer.rewriter({
  "/api/*": "/$1",
 })
)

server.listen(4200, () => {
 console.log("JSON Server is running")
})