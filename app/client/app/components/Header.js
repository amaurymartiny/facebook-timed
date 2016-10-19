import React from 'react';
import styles from './Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.app}>
        <h1>Timed</h1>
      </div>
    );
  }
}
