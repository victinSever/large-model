import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => {
    return {
      token: '',
    };
  },
  getters: {},
  actions: {
    updateToken(token: string) {
      this.token = token;
    },
  },
});
