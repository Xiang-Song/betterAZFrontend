import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from './components/Login'
import Home from './components/Home'
import News from './components/News'
import SingleNews from './components/SingleNews'
import Events from "./components/Events"
import Locations from './components/Locations'
import Bill from './components/Bill'
import { BAProvider } from './context/BAcontext'

import './App.css'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <BAProvider>
      <Switch>
      <Route path="/admin" component={Login} />
      <Route exact path="/" component={Home} />
      <Route path="/bills" component={Bill} />
      <Route path="/news" component={News} />
      <Route path="/newsdetails/:id" component={SingleNews} />
      <Route path="/events" component={Events} />
      <Route path="/locations" component={Locations} />
      </Switch>
      </BAProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
