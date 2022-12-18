export const injectedJs = `
  localStorage.setItem('locIp', '127.0.0.1');

  const fetchResolves = {};

  function wledApp2Result(key, result, ok, error) {
    const resolveReject = fetchResolves[key];
  
    if (error) {
      resolveReject.reject(error);
    } else {
      resolveReject.resolve({json: () => result, ok});
    }
  
    delete fetchResolves[key];
    return true;
  }

  window.fetch = (url, options) => {
    const key = url + '~' + options.method + '~' + Math.random();
  
    window.ReactNativeWebView.postMessage(JSON.stringify({url, options, key}));
  
    return new Promise((resolve, reject) => {
      fetchResolves[key] = {resolve, reject};
    });
  };
  
  class MyWebSocket {
    constructor(url) {
      // ignore... not really connecting
      this.readyState === WebSocket.OPEN;
    }
  
    close() {
      // ignore
    }
  
    send(data) {
      fetch('http://127.0.0.1/json/state', {
        body: data,
        isWs: true,
        method: 'post',
      });
    }
  }
    
  WebSocket = MyWebSocket;
  
  function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  }

  addStyle(
    ' \
    button#buttonCfg { \
      display: none; \
    } \
    .top button { \
      width: 20%; \
    } \
    ',
  );
  
  true;
`;
