<template>
  <div id="app" class="container">
    <b-navbar>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Home
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/transactions' }">
          Transactions
        </b-navbar-item>
      </template>
    </b-navbar>
    <section class="section">
      <router-view />
    </section>
  </div>
</template>
