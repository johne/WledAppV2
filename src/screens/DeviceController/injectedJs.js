export const injectedJs = `
  localStorage.setItem('locIp', '127.0.0.1');

  const fetchResolves = {};

  function wledApp2Result(key, result) {
    fetchResolves[key]({json: ()=>result});
    delete fetchResolves[key];
    return true;
  }

  window.fetch = (url, options) => {
    const key = url + '~' + options.method + '~' + Math.random();

    window.ReactNativeWebView.postMessage(JSON.stringify({url, options, key}));

    return new Promise(resolve => {
      fetchResolves[key] = resolve;
    });
  };

  class MyWebSocket extends WebSocket {
    constructor(url) {
      super(url);
    }

    send(data) {
      console.log('ws sending: ' + data);
      return super.send(data);
    }
  }

  WebSocket = MyWebSocket;

  true;
`;
