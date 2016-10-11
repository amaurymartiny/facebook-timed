import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface IAppProps {
  name: string;
}

export default class App extends React.Component<IAppProps, any> {
  render() {
    return (
      <h1>Hello, {this.props.name}!</h1>
    );
  }
}

// import {Footer} from '../Footer/Footer';

// ReactDOM.render(
//     <Footer compiler="TypeScript" framework="React" />,
//     document.getElementById("example")
// );