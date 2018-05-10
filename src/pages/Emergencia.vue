<template>
  <div class="Inscricao">
    <v-app>
      <Cabecalho />

      <v-content>
        <v-container fluid fill-height>
          <v-layout row wrap>
            <v-flex xs12>
              <h1>Emêrgencia</h1>
              <hr />
              <v-layout row wrap mt-4>
                <v-flex xs12 sm4>
                  <center>
                    <v-badge color="cinza">
                      <h2 class="text-xs-center">Vegetarianos</h2>
                      <span slot="badge">{{ tbl.vegetarianos.items.length }}</span>
                    </v-badge>
                  </center>
                  <v-flex xs12 mx-4>
                    <v-text-field label="Buscar" v-model="searchVegetarianos"></v-text-field>
                  </v-flex>
                  <v-data-table :headers="tbl.vegetarianos.headers" :items="tbl.vegetarianos.items" hide-actions class="elevation-1 mx-3" :search="searchVegetarianos">
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.nome }}</td>
                      <td>{{ props.item.clube }}</td>
                    </template>
                  </v-data-table>
                </v-flex>

                <v-flex xs12 sm4>
                  <center>
                    <v-badge color="cinza">
                      <h2 class="text-xs-center">Alimentos</h2>
                      <span slot="badge">{{ tbl.alimentos.items.length }}</span>
                    </v-badge>
                  </center>
                  <v-flex xs12 mx-4>
                    <v-text-field label="Buscar" v-model="searchAlimentos"></v-text-field>
                  </v-flex>
                  <v-data-table :headers="tbl.alimentos.headers" :items="tbl.alimentos.items" hide-actions class="elevation-1 mx-3" :search="searchAlimentos">
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.nome }}</td>
                      <td>{{ props.item.clube }}</td>
                      <td>{{ props.item.restricao.medicamentos }}</td>
                    </template>
                  </v-data-table>
                </v-flex>

                <v-flex xs12 sm4>
                  <center>
                    <v-badge color="cinza">
                      <h2>Medicamentos</h2>
                      <span slot="badge">{{ tbl.medicamentos.items.length }}</span>
                    </v-badge>
                  </center>
                  <v-flex xs12 mx-4>
                    <v-text-field label="Buscar" v-model="searchMedicamentos"></v-text-field>
                  </v-flex>
                  <v-data-table :headers="tbl.medicamentos.headers" :items="tbl.medicamentos.items" hide-actions class="elevation-1 mx-3" :search="searchMedicamentos">
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.nome }}</td>
                      <td>{{ props.item.clube }}</td>
                      <td>{{ props.item.restricao.alimentos }}</td>
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
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

var dbParticipante = Firebase.database().ref('participante')
export default {
  name: 'Inscricao',
  components: {
    Cabecalho
  },
  data () {
    return {
      participantes: [],
      searchVegetarianos: '',
      searchMedicamentos: '',
      searchAlimentos: '',
      tbl: {
        vegetarianos: {
          headers: [
            { text: 'Nome', align: 'left', value: 'nome' },
            { text: 'Clube', align: 'left', value: 'clube' }
          ],
          items: []
        },
        alimentos: {
          headers: [
            { text: 'Nome', align: 'left', value: 'nome' },
            { text: 'Clube', align: 'left', value: 'clube' },
            { text: 'Alimentos', align: 'left', value: 'alimentos' }
          ],
          items: []
        },
        medicamentos: {
          headers: [
            { text: 'Nome', align: 'left', value: 'nome' },
            { text: 'Clube', align: 'left', value: 'clube' },
            { text: 'Medicamentos', align: 'left', value: 'medicamento' }
          ],
          items: []
        }
      }
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
  },
  watch: {
    participantes: function (dados) {
      this.tbl.vegetarianos.items = dados.filter((val) => val.restricao.vegetariano)
      this.tbl.alimentos.items = dados.filter((val) => val.restricao.alergiaalimentar)
      this.tbl.medicamentos.items = dados.filter((val) => val.restricao.alergiamedicamentos)
    }
  }
}
</script>

<style>
</style>
