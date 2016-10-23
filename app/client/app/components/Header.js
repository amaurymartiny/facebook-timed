import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AuthService from '../utils/AuthService';
import styles from './Header.css';

export default class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    auth: PropTypes.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  logout(){
    this.props.auth.logout();
    this.context.router.push('/login');
  }

  render(){
    const { profile } = this.state
    return (
      <div className={styles.app}>
        <h1>Timed</h1>
        <div>
          <Link to='/'>Home</Link>&nbsp;
          <Link to='/login'>Login</Link>
        </div>
        <p>Welcome {profile.name}!</p>
        <button onClick={this.logout.bind(this)}>Logout</button>
      </div>
    )
  }

}