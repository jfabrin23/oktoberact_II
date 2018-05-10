<template>
  <div class="admin">
    <v-app>
      <Cabecalho />

      <v-content>
        <v-container fluid fill-height>
          <v-layout row wrap>
            <v-flex xs12 sm5>
              <h1 class="text-xs-center">Ultimas Inscrições</h1>
              <v-data-table :headers="tbl.ultInscricoes.headers" :items="participantes" hide-actions class="elevation-1 mx-3">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.nome }}</td>
                  <td>{{ props.item.clube }}</td>
                </template>
              </v-data-table>
            </v-flex>

            <v-flex xs12 sm7>
              <h1 class="text-xs-center">Fluxo de Caixa</h1>
              <v-data-table :headers="tbl.fluxoCaixa.headers" :items="financeiros" hide-actions class="elevation-1 mx-3">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.descricao }}</td>
                  <td>{{ props.item.tipo | tipo }}</td>
                  <td>{{ props.item.valor | grana }}</td>
                </template>
                <template slot="footer">
                  <td></td>
                  <td class="text-xs-right"><strong>Total:</strong></td>
                  <td><strong>{{ tbl.fluxoCaixa.totalizador.valor | grana }}</strong></td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Firebase from 'firebase'
import Cabecalho from '@/components/Header.vue'

var dbFinanceiro = Firebase.database().ref('financeiro')
var dbParticipante = Firebase.database().ref('participante').orderByChild('when').limitToLast(10)
export default {
  name: 'Admin',
  components: {
    Cabecalho
  },
  data () {
    return {
      tbl: {
        ultInscricoes: {
          headers: [
            { text: 'Nome', align: 'left', value: 'nome' },
            { text: 'Clube', align: 'left', value: 'clube' }
          ],
          items: []
        },
        fluxoCaixa: {
          headers: [
            { text: 'Descrição', align: 'left', value: 'descricao' },
            { text: 'Tipo', align: 'left', value: 'tipo' },
            { text: 'Valor', align: 'left', value: 'valor' }
          ],
          items: [],
          totalizador: {
            valor: 0
          }
        }
      },
      financeiros: []
    }
  },
  filters: {
    tipo (val) {
      let tipo
      if (val === 'S') {
        tipo = 'Saída'
      } else {
        tipo = 'Entrada'
      }
      return tipo
    },
    grana (val) {
      var money
      money = 'R$ ' + String(val.toFixed(2)).replace('.', ',')
      return money
    }
  },
  firebase: {
    participantes: dbParticipante,
    financeiros: dbFinanceiro
  },
  methods: {
  },
  watch: {
    financeiros: function (dados) {
      this.tbl.fluxoCaixa.totalizador.valor = dados.reduce(function (valorTotal, item) {
        return valorTotal + parseFloat(item.valor)
      }, 0)
    }
  }
}
</script>

<style>
</style>
