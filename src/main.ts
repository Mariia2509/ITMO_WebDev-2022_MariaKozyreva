import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const db = new PouchDB('http://90.156.224.65:5984/books');
const app = createApp(App);
app.provide('db', db);
app.mount('#app');
