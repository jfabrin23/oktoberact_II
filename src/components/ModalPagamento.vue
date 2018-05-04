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
              <h1>Depósito</h1>
              <p>
                <small>Agência: </small> <strong>0233</strong><br />
                <small>Conta: </small> <strong>78369-8</strong><br />
                <small>Beneficiário: </small> <strong>Fulano de Tal</strong><br />
                <small>Enviar comprovante de pagamento para: </small> <strong>pagamento@email.com</strong>
              </p>
            </v-flex>
            <v-flex xs12 sm6>
              <h1>Cartão</h1>
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

