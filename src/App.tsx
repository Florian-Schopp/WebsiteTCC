
import React from 'react';

import './App.css';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/pages/Home';
import Simulation from './components/pages/Simulation';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#99d066',
        main: '#689f38',
        dark: '#387002',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });
  //<Route path='/Docu' exact render={(props) => { window.location.href = "normal_redirect.html" }} />
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <NavigationBar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/Simulation' exact component={Simulation} />

          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>

    </>
  );
}

export default App;
