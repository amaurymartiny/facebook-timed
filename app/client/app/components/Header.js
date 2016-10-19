import React from 'react';
import { Link } from 'react-router';
import styles from './Header.css';

const Header = () =>
  <div className={styles.app}>
    <h1>Time</h1>
    <div>
      <Link to='/'>Home</Link>&nbsp;
      <Link to='/login'>Login</Link>
    </div>
  </div>;

export default Header;