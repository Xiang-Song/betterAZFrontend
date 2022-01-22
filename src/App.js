import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from './components/Login'
import Home from './components/Home'
import News from './components/News'
import SingleNews from './components/SingleNews'
import Events from "./components/Events"
import Locations from './components/Locations'
import Provision from './components/Provision'
import Initiative from "./components/Initiative"
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
      <Route path="/provisions" component={Provision} />
      <Route path="/initiative" component={Initiative} />
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
