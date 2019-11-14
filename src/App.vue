<style>
@import './assets/common.css';
</style>

<template>
  <router-view id="app" @login="loginDirect" @logout="logoutDirect"></router-view>
</template>

<script>
import Vue from 'vue';
import instance from './api';
import AllRoutesData from './router/fullpath';
import * as util from './assets/util.js';
import { mapState } from 'vuex'
import store from '@/vuex/index'

export default {
  data() {
    return {
      userData: null
    }
  },
  methods: {
    signin: function(callback) {
      let vm = this;
      let localUser = {token:'roottoken'};
      
      instance.get(`/signin`, {
        params: {
          Authorization: localUser.token
        }
      }).then((res) => {
        let userPermissions = res.data;
        vm.$root.userData = userPermissions;
      })
    },
    loginDirect: function(newPath){
      this.signin(() => {
        this.$router.replace({path: newPath || '/'});
      });
    },
    logoutDirect: function(){
      util.session('token','');
      window.location.href = process.env.BASE_URL || '/'
    }
  },
  created: function() {
    this.signin();
  }
}
</script>