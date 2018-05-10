<template>
  <div class="ModalUsuario">
    <v-dialog v-model="modal" width="80%" persistent>
      <v-card>
        <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Lista de Usuário
          </label>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="close(false)" dark>
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>

        <v-container grid-list-sm class="pa-4">
          <v-flex xs12 mx-4>
            <v-text-field label="Buscar" v-model="searchUsuario"></v-text-field>
          </v-flex>
          <v-data-table :headers="tbl.usuario.headers" :items="usuarios" hide-actions class="elevation-1 mx-3" :search="searchUsuario">
            <template slot="items" slot-scope="props">
              <tr @click="selecionar(props.item)">
                <td>{{ props.item.nome }}</td>
                <td>{{ props.item.usuario }}</td>
                <td><v-icon>{{ props.item.situacao | alternativa }}</v-icon></td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Firebase from 'firebase'

var dbUsuario = Firebase.database().ref('usuario')
export default {
  name: 'ModalUsuario',
  data () {
    return {
      searchUsuario: '',
      tbl: {
        usuario: {
          headers: [
            { text: 'Nome', align: 'left', value: 'nome' },
            { text: 'usuario', align: 'left', value: 'usuario' },
            { text: 'situacao', align: 'left', value: 'situacao' }
          ]
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
    usuarios: dbUsuario
  },
  methods: {
    close (val) {
      this.$emit('modalUsuario', val)
    },
    selecionar (item) {
      this.$emit('usuario', item)
    }
  },
  props: [
    'modal'
  ]
}
</script>

<style>
.list__tile__title {
  color: #017C50
}
</style>

