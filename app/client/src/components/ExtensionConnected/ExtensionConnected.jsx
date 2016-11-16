import React from 'react'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

const ExtensionConnected = ({ isExtensionConnected }) =>
  <span>
    {isExtensionConnected &&
      <span><Glyphicon className="text-success" glyph="ok-sign" /> The Chrome extension is correctly installed.<br /></span>
    }
  </span>

ExtensionConnected.propTypes = {
  isExtensionConnected: React.PropTypes.bool.isRequired
}

export default ExtensionConnected
