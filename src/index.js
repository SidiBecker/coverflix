import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';

import CadastroVideo from './pages/cadastro/Video';
import CadastroCategoria from './pages/cadastro/Categoria';
import Pagina404 from './pages/404';
import SimpleSlider from './components/Slider';
import ListaVideo from './pages/lista/Video';

ReactDOM.render(

  <Router>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/home" component={Home} exact />
      <Route path="/slider" component={SimpleSlider} exact />
      <Route path="/cadastro/video" component={CadastroVideo} exact />
      <Route path="/cadastro/video/:id" component={CadastroVideo} exact />
      <Route path="/cadastro/categoria" component={CadastroCategoria} exact />
      <Route path="/lista/video" component={ListaVideo} exact />
      <Route component={Pagina404} />
    </Switch>
  </Router>,

  document.getElementById('root'),
);
