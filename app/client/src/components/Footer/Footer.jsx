import React from 'react'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import './Footer.less'

const Footer = () =>
  <footer className="text-center">
    Made with <Glyphicon glyph="heart" /> by Amaury Martiny.
    Send <a href="mailto:amaury.martiny@gmail.com">an email</a> to say hi.
    View <a href="https://github.com/amaurymartiny/timed"> source code</a>.
  </footer>

export default Footer
