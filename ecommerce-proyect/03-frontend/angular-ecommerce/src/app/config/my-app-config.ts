export default {
    oidc:{
        clientId:'0oaad1vyuepLmodaR5d7',
        issuer:'https://dev-51642903.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/login/callback',
        //Scopes provide access to information about a user
        scopes: ['openid', 'profile', 'email']
    }
}
