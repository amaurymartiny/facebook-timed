import Auth0Lock from 'auth0-lock'
// import LogoImg from 'images/test-icon.png';

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/callback',
        responseType: 'token'
      }
      // theme: {
      //   logo: LogoImg,
      //   primaryColor: "#b81b1c"
      // },
      // languageDictionary: {
      //   title: "My Company"
      // }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  setOnAuthenticated(callback) {
    this.onAuthenticated = callback;
  }

  _doAuthentication(authResult) {
    console.log('_doAuthentication')
    // Saves the user token
    this.setToken(authResult.idToken)
    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.setProfile(profile)
      }
    })
  }

  _authorizationError(error){
    // Unexpected authentication error
    console.error('Authentication Error', error)
  }

  parseHash(hash){
    // // uses auth0 parseHash method to extract data from url hash
    // console.log(this.lock)
    // const authResult = this.lock.parseHash(hash);
    // if (authResult && authResult.idToken) {
    //   this.setToken(authResult.idToken)
    // }
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token// && !isTokenExpired(token)
  }

  setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
  }

  getProfile(){
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}