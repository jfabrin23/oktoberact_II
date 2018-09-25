<template>
  <div class="Inscricao">
    <v-app>
      <Cabecalho />

      <v-content>
        <v-container fluid fill-height>
          <v-layout row wrap>
            <v-flex xs12>
              <h1 class="text-xs-center">Inscrições</h1>
              <v-flex xs12 mx-4>
                <v-text-field label="Buscar" v-model="search"></v-text-field>
              </v-flex>
              <v-data-table :headers="tbl.inscricoes.headers" :items="participantes" hide-actions item-key="nome" class="elevation-1 mx-3" :search="search">
                <template slot="items" slot-scope="props">
                  <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.numerador }}</td>
                    <td>{{ props.item.nome }}</td>
                    <td>{{ props.item.clube }}</td>
                    <td><center><v-icon>{{ props.item.pagamento | alternativa }}</v-icon></center></td>
                    <td><center><v-icon>{{ props.item.situacao | alternativa }}</v-icon></center></td>
                  </tr>
                </template>
                <template slot="expand" slot-scope="props">
                  <v-layout row wrap>
                    <v-flex xs12 sm12 class="my-3">
                      <h4>Contatos</h4>
                      <v-icon>phone</v-icon> {{ props.item.telefone }} <br />
                      <v-icon>mail</v-icon> {{ props.item.email }} <br />
                    </v-flex>
                    <v-flex xs6 sm6>
                      <h4>Emergência</h4>
                      {{ props.item.contato.nome }} ({{ props.item.contato.parentesco }})<br />
                      <v-icon>phone</v-icon> {{ props.item.contato.telefone }} <br />
                    </v-flex>
                    <v-flex xs6 sm6>
                      <h4>Alergias/Alimentação</h4>
                      <div v-show="props.item.restricao.alergiamedicamentos">
                        <v-icon>local_hospital</v-icon> {{ props.item.restricao.medicamentos }}
                      </div> <br />
                      <div v-show="props.item.restricao.alergiaalimentar">
                        <v-icon>fastfood</v-icon> {{ props.item.restricao.alimentos }}
                      </div> <br />
                      <div v-show="props.item.restricao.vegetariano">
                        <v-icon>spa</v-icon> Vegetáriano / Vegano
                      </div> <br />
                    </v-flex>
                    <v-flex xs12 sm12 text-xs-right>
                      <v-card dark color="cinza">
                        <v-tooltip top v-if="!props.item.pagamento">
                          <v-btn flat icon color="primary" slot="activator" @click="confirmarInscricao(props.item, true)"><v-icon>check</v-icon></v-btn>
                          <span>Confirmar Inscrição</span>
                        </v-tooltip>
                        <v-tooltip top v-else>
                          <v-btn flat icon color="primary" slot="activator" @click="confirmarInscricao(props.item, false)"><v-icon>cancel</v-icon></v-btn>
                          <span>Desconfirmar Inscrição</span>
                        </v-tooltip>
                        <!-- <v-tooltip top>
                          <v-btn flat icon color="primary" slot="activator"><v-icon>transfer_within_a_station</v-icon></v-btn>
                          <span>Transferir Inscrição</span>
                        </v-tooltip> -->
                        <v-tooltip top>
                          <v-btn flat icon color="primary" slot="activator" @click="cancelarInscricao(props.item)"><v-icon>clear</v-icon></v-btn>
                          <span>Cancelar Inscrição</span>
                        </v-tooltip>
                      </v-card>
                    </v-flex>
                  </v-layout>
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

let dbParticipante = Firebase.database().ref('participante')
export default {
  name: 'Inscricao',
  components: {
    Cabecalho
  },
  data () {
    return {
      search: '',
      tbl: {
        inscricoes: {
          headers: [
            { text: '#', align: 'left', value: 'numerador' },
            { text: 'Nome', align: 'left', value: 'nome' },
            { text: 'Clube', align: 'left', value: 'clube' },
            { text: 'Pgto', align: 'center', value: 'pgto' },
            { text: 'Situação', align: 'center', value: 'situacao' }
          ]
        }
      },
      participantes: [],
      teste: []
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
    participantes: dbParticipante
  },
  methods: {
    cancelarInscricao (inscricao) {
      dbParticipante.child(inscricao['.key']).delete()
    },
    confirmarInscricao (inscricao, pag) {
      inscricao.pagamento = pag
      var key = inscricao['.key']
      delete inscricao['.key']
      dbParticipante.child(key).set(inscricao)
    }
  },
  watch: {
    participantes: function (dados) {
      for (var reg in dados) {
        dados[reg].numerador = parseInt(reg) + 1
      }
      return dados
    }
  }
}
</script>

<style>
</style>
