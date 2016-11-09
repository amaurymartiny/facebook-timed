import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { grey100, blueGrey500, grey900, blue500 } from 'material-ui/styles/colors'

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
export default getMuiTheme({
  palette: {
    primary1Color: grey100,
    primary2Color: grey100,
    primary3Color: grey100,
    accent1Color: blue500,
    accent2Color: blueGrey500,
    accent3Color: blueGrey500,
    textColor: grey900
  },
  appBar: {
    textColor: grey900
  }
})