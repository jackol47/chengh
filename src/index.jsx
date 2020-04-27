import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router, Route, Switch,
} from 'react-router-dom';
import './common/utils/Common';
import './common/style/_reset.less';
import styles from './style.less';
import GlobalConst from './common/globalConst';
import App from './pages/Index';

// 初始化webview高度
common.webViewHeight = window.document.body.offsetHeight;
common.GlobalConst = GlobalConst;

const MainApp = (
  <Router>
    <Route
      path="/"
      component={() => (
        <Switch>
          <Route exact path="/" component={App} />
        </Switch>
      )}
    />
  </Router>
);

ReactDOM.render(
  <div className={styles.container}>
    {MainApp}
  </div>,
  document.getElementById('container'),
);
