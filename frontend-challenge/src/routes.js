import React from 'react';
import { Route, Switch} from 'react-router-dom';
import SearchBox from "./pages/SearchBox";
import Results from "./pages/Results";
import Detail from "./pages/Detail";

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={SearchBox} />
                <Route exact path="/items?search=" component={Results} />
                <Route exact path="/items/:id" component={Detail} />
            </Switch>
        </div>
    );
};