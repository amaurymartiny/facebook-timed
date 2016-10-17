import * as React from 'react';
import { Link } from 'react-router';

class Header extends React.Component<any, any> {
  public render() {

    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="about">Absout</Link></li>
          <li><Link to="counter">Counter</Link></li>
        </ul>
      </nav>
    );
  }
}

export { Header }
