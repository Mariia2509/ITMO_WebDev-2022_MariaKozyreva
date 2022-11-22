const delay = (time) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });

function wrapDebugConsole() {
  const debug = console.log;
  console.log = (...args) => {
    if (import.meta.env.DEV === false) debug(...args);
  };
}

const $ = document.getElementById.bind(document);

export { delay, wrapDebugConsole, $ };
