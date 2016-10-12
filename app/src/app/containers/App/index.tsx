import * as React from 'react';
import { Header } from '../../components';

class App extends React.Component<any, any> {
  public render() {
    return (
      <section>
        <Header />
        {this.props.children}
      </section>
    );
  }
}

export { App }
