import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#fbdc35',
        error: '#FF5252',
        success: '#4CAF50'
      }
    }
  },
  icons: {
    iconfont: 'md',
  },
});
