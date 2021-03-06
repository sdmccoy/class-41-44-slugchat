import React from 'react';
import {connect} from 'react-redux';
import * as route from '../../action/route-action.js';
import * as querystring from 'querystring';

export class Landing extends React.Component {
  render(){
    let googleLoginBaseURL='https://accounts.google.com/o/oauth2/v2/auth';
    let googleLoginQuery = querystring.stringify({
      client_id: __GOOGLE_CLIENT_ID__,
      response_type: 'code',
      redirect_uri:`${__API_URL__}/oauth/google/code`,
      scope: 'openid profile email',
      prompt: __DEBUG__ ? 'consent' : undefined,
    });

    let googleLoginURL = `${googleLoginBaseURL}?${googleLoginQuery}`;

    return (
      <div className='landing-container'>
        Landing
        <br></br>
        <button onClick={this.props.goToLogin}> Login </button>
        <button onClick={this.props.goToSignup}> Signup </button>
        Login with: <a href={googleLoginURL} ><button>Google</button></a>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
});

export const mapDispatchToProps = (dispatch) => ({
  goToLogin: () => dispatch(route.routeSwitch('/login')),
  goToSignup: () => dispatch(route.routeSwitch('/signup')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
