<template>
  <div class="Login">
    <v-app>
      <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Acessar</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-alert :type="msg.tipo" :value="true" v-if="msg.mostrar">
                  {{msg.texto}}
                </v-alert>
                <v-form>
                  <v-text-field prepend-icon="person" label="Usuário" type="text" v-model="acesso.usuario"></v-text-field>
                  <v-text-field prepend-icon="lock" label="Senha" type="password" v-model="acesso.senha"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="acessar">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    </v-app>
  </div>
</template>

<script>
import Firebase from 'firebase'

var dbUsuario = Firebase.database().ref('usuario')
export default {
  name: 'Home',
  data () {
    return {
      drawer: false,
      acesso: {
        usuario: '',
        senha: ''
      },
      msg: {
        tipo: '',
        texto: '',
        mostrar: false
      }
    }
  },
  firebase: {
    usuario: dbUsuario
  },
  methods: {
    acessar () {
      let registro = this.usuario.filter((data) => ((data.situacao === true) && (data.usuario === this.acesso.usuario) && (data.senha === this.acesso.senha)))
      if (registro.length === 1) {
        this.$router.push('admin')
      } else {
        this.msg = {
          tipo: 'error',
          texto: 'Usuário ou Senha inválidos',
          mostrar: true
        }
      }
    }
  },
  props: {
    source: String
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
@media (min-width: 800px) {
  #content {
    width: 70%;
    margin: auto;
  }
  #footer-layout {
    width:70%!important;
    margin:auto;
  }
}
#footer-layout {
  width: 100%;
}
#subtitle {
  font-weight: 200!important;
}
#footer {
  overflow: auto;
}
.card {
  background-color: #fafafa!important;
}
footer {
  overflow: auto;
}
a {
  color: #fff !important;
  text-decoration: none;
  font-size: 3vh;
  padding-left: 1vw;
  padding-right: 1vw;
}
a:hover {
  color: #12543D !important;
  text-decoration: none;
  font-size: 3vh;
}
/* .toolbar__content {
  background-color: #017C50;
} */
.font-60 {
  font-size: 60px;
}
v-toolbar a {
  color: dimgrey
}
</style>
