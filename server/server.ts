const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("server/db.json")

const middlewares = jsonServer.defaults()
server.use(middlewares)
server.use("/server", router)

server.listen(4200, () => {
  console.log("JSON Server is running")
})