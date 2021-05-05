// backend.js
/**
 * Add any customization here like db, port, routes, middlewares, etc...
 * For further information: https://github.com/typicode/json-server
 */
const jsonServer = require('json-server')
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const path = require('path');

const server = jsonServer.create()
// Change the database file here 
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
const commander = require('commander');
commander
  .usage('[OPTIONS]...')
  .option('--no-auth', 'Disable authorization globally')
  .parse(process.argv);

const opts = commander.opts();


const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://ermes-test.eu.auth0.com/.well-known/jwks.json'
}),
audience: 'https://api.amazing.ermes',
issuer: 'https://ermes-test.eu.auth0.com/',
algorithms: ['RS256']
});


if (opts.auth){
  // jwt authorization used globally, all the routes are protected
  console.log('Authorizaton ENABLED globally')
  server.use(jwtCheck);
} else {
  // you want a finer route protection
  console.log('Authorizaton DISABLED globally')
}
server.use(middlewares);

// If you want to customize the route protection,
// please enable the protection on specific routes only.
// For further details: https://expressjs.com/en/guide/routing.html
// server.get('/protected', jwtCheck, (req, res) => {
//   res.jsonp({"msg": "Secured Resource"})
// })
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})