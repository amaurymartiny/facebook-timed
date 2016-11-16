const config = 
  process.env.NODE_ENV === 'production' ?
    {
      API_ROOT: 'http://localhost:8080/api',
      WEBAPP: 'http://localhost:3000'
    }
  :
    {
      'API_ROOT': 'http://localhost:8080/api',
      'WEBAPP': 'http://localhost:3000'
    }
;

export default config
