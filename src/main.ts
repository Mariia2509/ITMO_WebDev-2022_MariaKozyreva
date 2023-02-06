import { createApp } from 'vue'
import AppProductList from './AppProductList.vue'
import { anu } from 'anu-vue'

// UnoCSS import
import 'uno.css'

// anu styles
import 'anu-vue/dist/style.css'

// default theme styles
import '@anu-vue/preset-theme-default/dist/styles.scss'

// Using `app.use(anu)` will register all the components globally
createApp(AppProductList)
    .use(anu)
    .mount('#app')
