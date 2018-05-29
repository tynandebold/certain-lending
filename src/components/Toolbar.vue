<template>
  <v-toolbar app dense dark>
    <img src="https://www.certainlending.com/apple-touch-icon-144x144.png" alt="Certain Lending Icon" class="toolbar-icon mr-2">
    <v-text-field
      append-icon="search"
      dark
      hide-details
      single-line
      placeholder="Search another property">
    </v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat>Properties</v-btn>
      <v-btn flat>Help</v-btn>
      <v-btn flat>Account</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style>
  nav.toolbar {
    background-color: #432b59 !important;
  }

  .toolbar-icon {
    height: 30px;
  }
</style>