import React from 'react';
import {Switch} from 'react-router-dom';
import SingIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Route from './Route';

const Routes: React.FC = () =>(

    <Switch>
        <Route path="/" exact component={SingIn}/>
        <Route path="/dashboard"  component={Dashboard} isPrivate/>
    </Switch>
);

export default Routes;