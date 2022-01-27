<template>
  <v-card color="light-blue lighten-5" max-width="450" class="mx-auto my-12 pa-6">
    <v-container class="pa-0" elevation="3">
      <v-text-field outlined color="light-blue darken-3" class="teal-darken-4-input text-lg-h6" id="result" type="text" v-model="value" @keypress="isNumber($event)" placeholder="0"></v-text-field>
      <v-row align="center" justify="space-around" class="mb-3">
        <v-btn color="teal darken-2 white--text" elevation="5" width="100%" max-width="385px" v-on:click="equals()"><v-icon>mdi-equal</v-icon></v-btn>
      </v-row>
    </v-container>
    <v-card-text v-if="isFormulaError" class="red--text">Ошибка ввода</v-card-text>
  </v-card>
</template>
<script>
import { Evaluate } from '../services/BCMathService';
export default {
  data() {
    return {
      value: '',
      isFormulaError: false,
    };
  },
  methods: {
    equals: function () {
      try {
        if (this.value.includes('+')) {
          let values = this.value.split('+');
          Evaluate('add', values[0], values[1]).then((response) => {
            this.value = response.result;
          });
        }

        if (this.value.includes('-')) {
          let values = this.value.split('-');
          Evaluate('subtract', values[0], values[1]).then((response) => {
            this.value = response.result;
          });
        }

        if (this.value.includes('/')) {
          let values = this.value.split('/');
          Evaluate('divide', values[0], values[1]).then((response) => {
            this.value = response.result;
          });
        }

        if (this.value.includes('*')) {
          let values = this.value.split('*');
          Evaluate('multiply', values[0], values[1]).then((response) => {
            this.value = response.result;
          });
        }
      } catch {
        this.isFormulaError = true;
        this.value = 'Error';
      }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (this.inputType == 0) {
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
          evt.preventDefault();
        } else {
          return true;
        }
      } else {
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46 && charCode !== 42 && charCode !== 43 && charCode !== 45 && charCode !== 47) {
          evt.preventDefault();
        } else {
          return true;
        }
      }
    },
  },
  created() {
    window.addEventListener('keydown', () => {
      this.isFormulaError = false;
    });
  },
};
</script>
