import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  './assets/reset.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'


const app = createApp(App)
app.use(router)
app.use(VXETable)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
