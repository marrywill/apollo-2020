import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
// import Home from '../routes/Home'
import Detail from '../routes/Detail'
import Header from '../routes/Header'
import NowPlaying from '../routes/NowPlaying'
import PoPular from '../routes/Popular'
import TopRated from '../routes/TopRated'
import UpComing from '../routes/UpComing'

function App() {
	let name = 'nowPlaying'
	return (
		<div className='App'>
			<Router>
				<Header />
				<Route exact path='/' component={NowPlaying} />
				<Route path='/popular' component={PoPular} />
				<Route path='/topRated' component={TopRated} />
				<Route path='/upComing' component={UpComing} />
				<Route path='/movies/:id' component={Detail} />
			</Router>
		</div>
	)
}

export default App
