import Vue from 'vue';

const ToastConstructor = Vue.extend({
  template: `<div v-if="visible" class="toast" :class="type">{{ message }}</div>`,
  data() {
    return {
      visible: false,
      message: '',
      type: ''
    };
  },
  methods: {
    show(msg, type = 'info') {
      this.message = msg;
      this.type = type;
      this.visible = true;
      setTimeout(() => { this.visible = false; }, 3000);
    }
  }
});

const toast = new ToastConstructor().$mount();
document.body.appendChild(toast.$el);

export default toast; 