const app = require('./app');
const appWs = require('./app-ws');
 
const server = app.listen(3334, () => {
    console.log(`App Express is running! 3334`);
})
 
appWs(server);