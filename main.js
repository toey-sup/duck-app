import  { loadHandler, beforeUnloadHandler } from './eventHandler/eventController.js';

window.addEventListener('load', () => {
  console.log('loadHandler');
  loadHandler()
})
window.addEventListener('beforeunload', (event) => {
  beforeUnloadHandler(event)
})
