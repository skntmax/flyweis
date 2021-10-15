const gglauth=require('express').Router() 
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-svvslnh0.us.auth0.com/.well-known/jwks.json`
    }),
  
    audience: 'tyy3xnTkM1REMyKvtQQdfHvKCH2sXtgT',
    issuer: [`https://dev-svvslnh0.us.auth0.com/`],
    algorithms: ['RS256']
  });
  var options = { customScopeKey: 'permissions'};  // This is necessary to support the direct-user permissions
  const checkScopes = jwtAuthz([ 'read:protected' ]);

  
  gglauth.get('/api/members-only', checkJwt, function(req, res){
    console.log("/api/members-only")
    res.json({
      message: 'Members Only Endpoint'
    });
  })
  
  gglauth.get('/api/protected', checkJwt, checkScopes, function(req, res) {
    console.log("/api/protected")
    res.json({
      message: 'Protected Endpoint'
    });
  });




module.exports=  {  gglauth }