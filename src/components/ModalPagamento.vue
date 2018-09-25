<template>
  <div class="ModalPagamento">
    <v-dialog v-model="modal" width="80%" persistent>
      <v-card>
        <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Pagamento
          </label>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="close(false)" dark>
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <img src="../../static/img/Sicredi.png" height="50">
              <p>
                <small>Agência: </small> <strong>0718</strong><br />
                <small>Conta: </small> <strong>03696-6</strong><br />
                <small>Beneficiário: </small> <strong>Diego Rafael Fachin</strong><br />
                <small>CPF: </small> <strong>071.409.339-44</strong><br />
                <small>Enviar comprovante de pagamento para: </small> <strong>descontracao2018@gmail.com</strong>
              </p>
            </v-flex>
            <v-flex xs12 sm6 aria-disabled>
              <img src="../../static/img/pagseguro-logo-2.png" height="50"><br /><br />
              Por Favor, entre em contato com a organização.
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalPagamento',
  data () {
    return {
      msg: {
        tipo: '',
        texto: '',
        mostrar: false
      }
    }
  },
  methods: {
    close (val) {
      this.$emit('pagamento', val)
    }
  },
  props: [
    'lstClube',
    'modal'
  ]
}
</script>

<style>
</style>

