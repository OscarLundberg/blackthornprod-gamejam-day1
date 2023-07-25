import App from './dom/App.svelte'
import E from "express";


const app = new App({
  target: document.getElementById('app'),
})
export default app


