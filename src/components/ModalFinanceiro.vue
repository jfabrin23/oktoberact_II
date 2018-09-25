<template>
  <div class="ModalFinanceiro">
    <v-dialog v-model="modal" width="80%" persistent>
      <v-card>
        <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Lançar Financeiro
          </label>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="close(false)" dark>
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container grid-list-sm class="pa-4">
          <v-alert :type="msg.tipo" :value="true" v-if="msg.mostrar">
            {{msg.texto}}
          </v-alert>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Descrição" v-model="financeiro.descricao" :rules="regrasValidacao.descricao" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-select label="Tipo" v-model="financeiro.tipo" :items="cbb.tipo" item-value="value" :rules="regrasValidacao.tipo" required autocomplete></v-select>
              </v-flex>

              <v-flex xs12>
                <v-select label="Situação" v-model="situacao" :items="cbb.situacao" item-value="value" :rules="regrasValidacao.situacao" required autocomplete></v-select>
              </v-flex>

              <v-flex xs12 sm6 pr-1>
                <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="pagamento" lazy transition="scale-transition" offset-y full-width min-width="290px" location="pt-br" :disabled="desabilita.pagamento">
                  <v-text-field label="Data Pagamento" slot="activator" v-model="financeiro.pagamento.data" :rules="regrasValidacao.data" :disabled="desabilita.pagamento"></v-text-field>
                  <v-date-picker v-model="pagamento" @input="$refs.menu.save(pagamento)" locale="pt-br"></v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12 sm6 pl-1>
                <v-select label="Forma de Pagamento" v-model="financeiro.pagamento.formapgt" :items="cbb.formapgt" item-value="value" :rules="regrasValidacao.formapgt" :disabled="desabilita.pagamento" autocomplete></v-select>
              </v-flex>

              <v-flex xs12 sm6 pr-1>
                <v-text-field label="Valor" v-model="financeiro.valor" v-money="money" :rules="regrasValidacao.valor" required></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 pl-1>
                <v-menu ref="menu" :close-on-content-click="false" v-model="menu2" :nudge-right="40" :return-value.sync="vencimento" lazy transition="scale-transition" offset-y full-width min-width="290px"  location="pt-br">
                  <v-text-field label="Vencimento" slot="activator" v-model="financeiro.vencimento" :rules="regrasValidacao.valor" readonly></v-text-field>
                  <v-date-picker v-model="vencimento" @input="$refs.menu.save(vencimento)" locale="pt-br"></v-date-picker>
                </v-menu>
              </v-flex>

              <v-btn color="primary" @click="salvar" :disabled="!valid" :loading="loading">Salvar</v-btn>
              <v-btn @click="limpar">Limpar</v-btn>

            </v-layout>
          </v-form>
          <v-alert :type="msg.tipo" :value="true" v-if="msg.mostrar">
            {{msg.texto}}
          </v-alert>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Firebase from 'firebase'

var dbUsuario = Firebase.database().ref('usuario')
var dbParticipante = Firebase.database().ref('participante')
var dbFinanceiro = Firebase.database().ref('financeiro')
export default {
  name: 'ModalFinanceiro',
  data () {
    return {
      cbb: {
        formapgt: [
          { value: 'P', text: 'PagSeguro' },
          { value: 'D', text: 'Dinheiro' },
          { value: 'C', text: 'Cartão' }
        ],
        situacao: [
          { value: true, text: 'Recebido / Pago' },
          { value: false, text: 'Em Aberto' }
        ],
        tipo: [
          { value: 'E', text: 'Entrada' },
          { value: 'S', text: 'Saída' }
        ],
        participante: []
      },
      desabilita: {
        pagamento: true
      },
      financeiro: {
        descricao: '',
        inscricao: false,
        pagamento: {
          data: '',
          formapgt: ''
        },
        tipo: this.lancamento.tipo,
        situacao: false,
        valor: 0.00,
        vencimento: ''
      },
      loading: false,
      menu: false,
      menu2: false,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: true
      },
      msg: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      pagamento: '',
      regrasValidacao: {
        descricao: [
          v => !!v || 'Descricao é obrigatório'
        ],
        tipo: [
          v => !!v || 'Tipo é obrigatório'
        ],
        situacao: [
          v => v !== '' || 'Situação é obrigatório'
        ]
      },
      situacao: false,
      valid: true,
      vencimento: ''
    }
  },
  filters: {
    alternativa (val) {
      var alternativa
      if (val) {
        alternativa = 'check'
      } else {
        alternativa = 'clear'
      }
      return alternativa
    }
  },
  firebase: {
    usuarios: dbUsuario,
    participantes: dbParticipante,
    financeiros: dbFinanceiro
  },
  methods: {
    close (val) {
      this.$emit('modalFinanceiros', val)
    },
    formatDate (date) {
      if (!date) return null
      date = date.split('T')[0]
      const [year, month, day] = date.split('-')
      return day + '/' + month + '/' + year
    },
    limpar () {
      this.loading = false
      this.$refs.form.reset()
    },
    salvar () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.financeiro.valor = parseFloat(this.financeiro.valor.replace('R$ ', '').replace('.', '').replace(',', '.'))
        dbFinanceiro.push(this.financeiro)
        this.limpar()
        this.msg = {
          tipo: 'success',
          texto: 'Sucesso! Nos vemos na Oktoberact... Cuida bem, cuida bem da sua marreca!',
          mostrar: true
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.financeiro = this.fin
    })
  },
  props: [
    'modal',
    'lancamento',
    'fin'
  ],
  watch: {
    situacao: function (dados) {
      if (dados) {
        this.desabilita.pagamento = false
      } else {
        this.desabilita.pagamento = true
      }
      this.financeiro.situacao = dados
    },
    vencimento: function (dados) {
      if (dados !== '') {
        this.financeiro.vencimento = this.formatDate(dados)
      }
    },
    pagamento: function (dados) {
      if (dados !== '') {
        this.financeiro.pagamento.data = this.formatDate(dados)
      }
    },
    financeiro: function (dados) {
      console.log('Aqui', dados)
      if (dados !== '') {
        dados.vencimento = this.formatDate(dados.vencimento)
      }
    }
  }
}
</script>

<style>
.list__tile__title {
  color: #017C50
}
</style>

