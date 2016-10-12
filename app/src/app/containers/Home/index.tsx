import * as React from 'react';

class Home extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <img src={require('./barbar.png')} />
        <p>Hello!</p>
      </div>
    );
  }
}

export { Home }
