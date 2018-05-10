<template>
  <div class="Usuario">
    <v-app>
      <Cabecalho />

      <v-content>
        <v-container fluid fill-height>
          <v-layout row wrap>
            <v-flex xs12>
              <h1>Usuario</h1>
              <hr />
              <v-alert :type="msg.tipo" :value="true" v-if="msg.mostrar">
                {{msg.texto}}
              </v-alert>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-layout row wrap>
                  <v-flex xs3>
                    <v-text-field label="Id" v-model="usuario['.key']" disabled></v-text-field>
                  </v-flex>
                  <v-flex xs9>
                    <v-btn flat icon color="primary" @click="modalUsuario = true">
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field label="Nome" v-model="usuario.nome" :rules="regrasValidacao.nome" required></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field label="Usuario" v-model="usuario.usuario" :rules="regrasValidacao.nome" required></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field type="password" label="Senha" v-model="usuario.senha" :rules="regrasValidacao.nome" required></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-select label="Situação" v-model="usuario.situacao" :items="cbb.situacao" item-value="value" :rules="regrasValidacao.situacao" required autocomplete></v-select>
                  </v-flex>

                  <v-btn color="primary" @click="salvar" :disabled="!valid" :loading="loading">Salvar</v-btn>
                  <v-btn @click="limpar">Limpar</v-btn>
                </v-layout>
              </v-form>
              <v-alert :type="msg.tipo" :value="true" v-if="msg.mostrar">
                {{msg.texto}}
              </v-alert>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>

      <ModalUsuario :modal='modalUsuario' v-on:modalUsuario="closeUsuario" v-on:usuario="selecionarUsuario" v-if="modalUsuario"></ModalUsuario>
    </v-app>
  </div>
</template>

<script>
import Firebase from 'firebase'
import Cabecalho from '@/components/Header.vue'
import ModalUsuario from '@/components/ModalUsuario'

var dbUsuario = Firebase.database().ref('usuario')
export default {
  name: 'Usuario',
  components: {
    Cabecalho,
    ModalUsuario
  },
  data () {
    return {
      cbb: {
        situacao: [
          { value: true, text: 'Ativo' },
          { value: false, text: 'Inativo' }
        ]
      },
      loading: false,
      msg: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      modalUsuario: false,
      regrasValidacao: {
        nome: [
          v => !!v || 'Nome é obrigatório'
        ],
        usuario: [
          v => !!v || 'Nome é obrigatório'
        ],
        senha: [
          v => !!v || 'Nome é obrigatório'
        ],
        situacao: [
          v => v !== '' || 'Situação é obrigatório'
        ]
      },
      search: '',
      tbl: {
        inscricoes: {
          headers: [
            { text: 'Nome', align: 'left', value: 'nome' },
            { text: 'Clube', align: 'left', value: 'clube' },
            { text: 'Pgto', align: 'center', value: 'pgto' },
            { text: 'Situação', align: 'center', value: 'situacao' }
          ]
        }
      },
      usuario: {
        nome: '',
        senha: '',
        situacao: '',
        usuario: ''
      },
      valid: true
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
    closeUsuario (val) {
      this.modalUsuario = val
    },
    limpar () {
      this.loading = false
      this.$refs.form.reset()
    },
    salvar () {
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.usuario['.key']) {
          var registro = { ...this.usuario }
          delete registro['.key']
          dbUsuario.child(this.usuario['.key']).set(registro)
          this.limpar()
          this.msg = {
            tipo: 'success',
            texto: 'Sucesso! Usuário alterado com sucesso!',
            mostrar: true
          }
        } else {
          dbUsuario.push(this.usuario)
          this.limpar()
          this.msg = {
            tipo: 'success',
            texto: 'Sucesso! Usuário cadastrado com sucesso!',
            mostrar: true
          }
        }
      }
    },
    selecionarUsuario (item) {
      this.usuario = item
      this.modalUsuario = false
    }
  },
  watch: {
    msg: function () {
      var self = this
      setTimeout(function () {
        self.msg = {
          tipo: '',
          texto: '',
          mostrar: false
        }
      }, 3000)
    }
  }
}
</script>

<style>
.list__tile__title {
  color: #017C50
}
</style>
