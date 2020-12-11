import React, { Component } from 'react'
// IMPORT HEADER
import Header from './Header'
// IMPORT ADMIN PAGES
import EditUser from './Admin/EditUser'
import Panel from './Admin/Panel'
// IMPORT PROFILE PAGES
import ViewProfile from './Profile/ViewProfile'
import UpdateProfile from './Profile/UpdateProfile'
// IMPORT AUTH PAGES
import Login from './Auth/Login'
import Registration from './Auth/Registration'
// IMPORT CHAT PAGE
import Chat from './Chat'


import {Route, Switch } from 'react-router-dom';

export class Interface extends Component {
  render() {
    return (
      <div className="main-wrap">
        <Header />
        <main>
          <Switch>
            {/* CHAT ROUTE */}
            <Route path="/" component={Chat} exact />
            {/* ADMIN ROUTES */}
            <Route path="/admin" component={Panel} />
            <Route path="/admin/edituser/:id" component={EditUser} />
            {/* PROFILE ROUTES */}
            <Route path="/profile/:id" component={ViewProfile} />
            <Route path="/profile/update/:id" component={UpdateProfile} />
            {/* AUTH ROUTES */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default Interface