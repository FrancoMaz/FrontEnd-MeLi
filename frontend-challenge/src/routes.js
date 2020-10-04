import React from 'react';
import { Route, Switch} from 'react-router-dom';
import SearchBox from "./pages/SearchBox";
import Results from "./pages/Results";

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={SearchBox} />
                <Route exact path="/items?search=" component={Results} />
            </Switch>
        </div>
    );
};