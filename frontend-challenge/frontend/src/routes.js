import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SearchBox from './pages/searchbox/SearchBox'
import Results from './pages/results/Results'
import Detail from './pages/detail/Detail'

export const Routes = () => (
	<div>
		<Switch>
			<Route exact path='/' component={SearchBox} />
			<Route exact path='/items' component={Results} />
			<Route exact path='/items/:id' component={Detail} />
		</Switch>
	</div>
)
