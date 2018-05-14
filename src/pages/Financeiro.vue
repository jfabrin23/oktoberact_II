<template>
  <div class="Financeiro">
    <v-app>
      <Cabecalho />

      <v-content>
        <v-container fluid fill-height>
          <v-layout row wrap>
            <v-flex xs12>
              <h1>Financeiro</h1>
              <hr />
              <v-layout row wrap mt-4>
                <v-flex xs12>
                  <h2 class="text-xs-center">Saidas</h2>
                  <v-data-table :headers="tbl.saida.headers" :items="tbl.saida.items" item-key="descricao"  hide-actions class="elevation-1 mx-3">
                    <template slot="items" slot-scope="props">
                      <tr @click="props.expanded = !props.expanded">
                        <td>{{ props.item.vencimento }}</td>
                        <td>{{ props.item.descricao }}</td>
                        <td>{{ props.item.situacao | saida }}</td>
                        <td>{{ props.item.valor | grana }}</td>
                        <td>
                          <v-tooltip top v-if="!props.item.situacao">
                            <v-btn flat icon color="primary" slot="activator"><v-icon>check</v-icon></v-btn>
                            <span>Pagar</span>
                          </v-tooltip>
                          <v-tooltip top>
                            <v-btn flat icon color="primary" slot="activator"><v-icon>clear</v-icon></v-btn>
                            <span>Remover</span>
                          </v-tooltip>
                        </td>
                      </tr>
                    </template>
                    <template slot="footer">
                      <tr>
                        <td></td>
                        <td></td>
                        <td class="text-xs-right"><strong>Total:</strong></td>
                        <td><strong>{{ tbl.saida.totalizador.valor | grana }}</strong></td>
                      </tr>
                    </template>
                  </v-data-table>
                  <v-fab-transition>
                    <v-btn dark bottom left small fab color="primary" pt-5 @click="lancamento.tipo = 'S', modalFinanceiros = true">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-fab-transition>
                </v-flex>

                <v-flex xs12>
                  <h2 class="text-xs-center">Entradas</h2>
                  <v-data-table :headers="tbl.entrada.headers" :items="tbl.entrada.items" item-key="descricao"  hide-actions class="elevation-1 mx-3">
                    <template slot="items" slot-scope="props">
                      <tr @click="props.expanded = !props.expanded">
                        <td>{{ props.item.descricao }}</td>
                        <td>{{ props.item.situacao | entrada }}</td>
                        <td>{{ props.item.valor | grana }}</td>
                        <td>
                          <v-tooltip top v-if="!props.item.situacao">
                            <v-btn flat icon color="primary" slot="activator" @click="lancamento.tipo = 'E', lancamento.participante = props.item['.key'], modalFinanceiros = true"><v-icon>check</v-icon></v-btn>
                            <span>Receber</span>
                          </v-tooltip>
                          <v-tooltip top>
                            <v-btn flat icon color="primary" slot="activator"><v-icon>clear</v-icon></v-btn>
                            <span>Remover</span>
                          </v-tooltip>
                        </td>
                      </tr>
                    </template>
                    <template slot="footer">
                      <td></td>
                      <td class="text-xs-right"><strong>Total:</strong></td>
                      <td><strong>{{ tbl.entrada.totalizador.valor | grana }}</strong></td>
                    </template>
                  </v-data-table>
                  <v-fab-transition>
                    <v-btn dark bottom left small fab color="primary" pt-5 @click="lancamento.tipo = 'E', modalFinanceiros = true">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-fab-transition>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>

      <ModalFinanceiro :modal='modalFinanceiros' :tipo="lancamento.tipo" :lancamento="lancamento" v-on:modalFinanceiros="closeFinanceiro" v-if="modalFinanceiros"></ModalFinanceiro>
    </v-app>
  </div>
</template>

<script>
import Firebase from 'firebase'
import Cabecalho from '@/components/Header'
import ModalFinanceiro from '@/components/ModalFinanceiro'

var dbFinanceiro = Firebase.database().ref('financeiro')
export default {
  name: 'Financeiro',
  components: {
    Cabecalho,
    ModalFinanceiro
  },
  data () {
    return {
      financeiros: [],
      lancamento: {
        tipo: 'S'
      },
      modalFinanceiros: false,
      searchFinanceiro: '',
      tbl: {
        saida: {
          headers: [
            { text: 'Vencimento', align: 'left', value: 'vencimento' },
            { text: 'Descricao', align: 'left', value: 'descricao' },
            { text: 'Situacao', align: 'left', value: 'situacao' },
            { text: 'Valor', align: 'left', value: 'valor' },
            { text: 'Opções', align: 'left', value: 'option' }
          ],
          items: [],
          totalizador: {
            valor: 0
          }
        },
        entrada: {
          headers: [
            { text: 'Descricao', align: 'left', value: 'descricao' },
            { text: 'Situacao', align: 'left', value: 'situacao' },
            { text: 'Valor', align: 'left', value: 'valor' },
            { text: 'Opções', align: 'left', value: 'option' }
          ],
          items: [],
          totalizador: {
            valor: 0
          }
        }
      }
    }
  },
  filters: {
    entrada (val) {
      var alternativa
      if (val) {
        alternativa = 'Recebido / Pago'
      } else {
        alternativa = 'Aberto'
      }
      return alternativa
    },
    grana (val) {
      var money
      money = 'R$ ' + String(val.toFixed(2)).replace('.', ',')
      return money
    },
    saida (val) {
      var alternativa
      if (val) {
        alternativa = 'Pago'
      } else {
        alternativa = 'Aberto'
      }
      return alternativa
    }
  },
  firebase: {
    financeiros: dbFinanceiro
  },
  methods: {
    closeFinanceiro (val) {
      this.modalFinanceiros = val
    }
  },
  watch: {
    financeiros: function (dados) {
      this.tbl.saida.items = dados.filter((val) => val.tipo === 'S')
      this.tbl.saida.totalizador.valor = this.tbl.saida.items.reduce(function (valorTotal, item) {
        return valorTotal + parseFloat(item.valor)
      }, 0)
      this.tbl.entrada.items = dados.filter((val) => val.tipo === 'E')
      this.tbl.entrada.totalizador.valor = this.tbl.entrada.items.reduce(function (valorTotal, item) {
        return valorTotal + parseFloat(item.valor)
      }, 0)
    }
  }
}
</script>

<style>
</style>
