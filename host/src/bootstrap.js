import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';

const dynamicFederation = async (scope, module) => {
  await __webpack_init_sharing__('default');
  const container = window[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  return container.get(module).then(factory => {
    const Module = factory();
    return Module;
  });
};

const RemoteApp = React.lazy(() => dynamicFederation('remote', './RemoteApp'));

const App = () => {
  return (
    <Provider store={store}>
      <div>
        Welcome to Host App
        {/* <App/> */}
        <div>
          <Suspense fallback="Loading...">
            <RemoteApp store={store} />
          </Suspense>
        </div>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
