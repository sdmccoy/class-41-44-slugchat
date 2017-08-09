import React from 'react';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth-action.js';
import * as route from '../../action/route-action.js';
import Landing from '../landing';
import {connect} from 'react-redux';
import {MemoryRouter, Switch, Route} from 'react-router-dom';


class App extends React.Component{

  componentDidMount(){
    let token = util.cookieFetch('X-Slugchat-Token');
    console.log('app token?: ', token);
    console.log('app token: ', token===true);
    if(token===undefined){
      console.log('if block');
      this.props.login(token);
    }

    console.log('after token');
  }

  toggleChat(){

  }

  render(){
    console.log('App props: ', this.props);
    return(
      <div className='app'>
        <header>
          <h2>Sluuuug Chat</h2>
          <button
            onClick={this.toggleMenu}
            className='toggle-menu'
          >
          Show Menu
          </button>
          <button
            onClick={this.toggleChat}
            className='toggle-chat'
          >
          Show Slug Chat
          </button>
        </header>
        menu to show when user is logged in:
        <div className='menu'>
          <button onClick={this.props.goToChat}> CHAT </button>
          <button onClick={this.props.goToSettings}> SETTINGS </button>
          <button onClick={this.props.logout}> LOGOUT </button>
        </div>
        <main className='main'>
          <br></br>
          This is what route youre on:
          <MemoryRouter>
            <Switch location={{pathname: this.props.route}}>
              <Route path='/landing' component={Landing} />
              <Route path='/chat' component={() => <p> Chat page </p>} />
              <Route path='/signup' component={() => <p> Sign up form </p>} />
              <Route path='/login' component={() => <p> Login form </p>} />
              <Route path='/settings' component={() => <p> Settings page </p>}/>
            </Switch>
          </MemoryRouter>
        </main>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  auth: state.auth,
  route: state.route,
});

let mapDispatchToProps = (dispatch) => ({
  login: (token) => dispatch(auth.login(token)),
  logout: () => dispatch(auth.logout()),
  goToSettings: (token) => dispatch(route.switchRoute('/settings')),
  goToChat: (token) => dispatch(route.switchRoute('/chat')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);