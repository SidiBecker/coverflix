import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Home from './pages/Home';

import CadastroVideo from './pages/cadastro/Video';
import CadastroCategoria from './pages/cadastro/Categoria';
import Pagina404 from './pages/404';
import SimpleSlider from './components/Slider';
import ListaVideo from './pages/lista/Video';
import ListaCategoria from './pages/lista/Categoria';
import MetaTags from 'react-meta-tags';

ReactDOM.render(
  <ToastProvider>
    <MetaTags>
      <meta name="description" content="Some description." />
      <meta property="og:title" content="MyApp" />
      <meta property="og:image" content="../screenshots/2.png" />
    </MetaTags>
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/slider" component={SimpleSlider} exact />
        <Route path="/cadastro/video" component={CadastroVideo} exact />
        <Route path="/cadastro/video/:id" component={CadastroVideo} exact />
        <Route path="/cadastro/categoria" component={CadastroCategoria} exact />
        <Route path="/cadastro/categoria/:id" component={CadastroCategoria} exact />
        <Route path="/lista/video" component={ListaVideo} exact />
        <Route path="/lista/categoria" component={ListaCategoria} exact />
        <Route component={Pagina404} />
      </Switch>
    </Router>
  </ToastProvider>,
  document.getElementById('root'),
);
