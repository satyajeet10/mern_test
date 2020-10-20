import React,{Suspense} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
const Navbar = React.lazy(() => import('./components/navbar/container/navbar'));
const Home = React.lazy(() => import('./components/home/container/home'));
const Login = React.lazy(() => import('./components/login/container/login'));
const Signup = React.lazy(() => import('./components/signup/container/signup'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <Navbar />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
