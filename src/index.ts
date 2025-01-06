import server from "./server";

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log('Rest API puerto 4000')
})