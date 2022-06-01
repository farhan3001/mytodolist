import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import {firestorePlugin} from 'vuefire';

Vue.use(firestorePlugin);
Vue.use(Vuetify);

export default new Vuetify({
});
