<template>
  <div class="Home">
    <v-app>
      <!-- Menu Mobile -->
      <v-navigation-drawer :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer" class="hidden-sm-and-up">
        <v-layout justify-center mt-3 mb-3>
          <img src="../../static/oktoberact2.png" width="240" height="148.183">
        </v-layout>
        <hr />
        <v-btn block flat @click="drawer = false, $vuetify.goTo(430, {duration: 1000, offset: 15, easing: 'easeInOutCubic'})">Sobre</v-btn>
        <v-btn block flat @click="drawer = false, $vuetify.goTo(1320, {duration: 1000, offset: 15, easing: 'easeInOutCubic'})">Inscrição</v-btn>
        <v-btn block flat @click="drawer = false, $vuetify.goTo(2650, {duration: 1000, offset: 15, easing: 'easeInOutCubic'})">Local</v-btn>
        <v-btn block flat @click="drawer = false, $vuetify.goTo(2190, {duration: 1000, offset: 15, easing: 'easeInOutCubic'})">CCO</v-btn>
      </v-navigation-drawer>

      <!-- Header -->
      <v-toolbar color="primary">
        <v-toolbar-side-icon class="hidden-sm-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>
          <img src="../../static/oktoberact.png" height="40" class="mt-2">
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn color="white" flat @click="$vuetify.goTo(430, {duration: 1000, offset: 15, easing: 'easeInOutCubic'})">Sobre</v-btn>
          <v-btn color="white" flat @click="$vuetify.goTo(800, {duration: 1000, offset: 15, easing: 'easeInOutCubic'})">Inscrição</v-btn>
          <v-btn color="white" flat @click="$vuetify.goTo(1450, {duration: 1000, offset: 15, easing: 'easeInOutCubic'})">Local</v-btn>
          <v-btn color="white" flat @click="$vuetify.goTo(2200, {duration: 1000, offset: 15, easing: 'easeInOutCubic'})">CCO</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!-- Conteudo -->
      <main>
        <!-- Imagem 1 e informações -->
        <section>
          <!-- Imagem 1 -->
          <v-parallax src="../../static/img/imagem1.jpg" height="380">
            <v-layout column align-center justify-center>
              <h2 class="mb-2">Já rolou uma vez...</h2>
              <div class="headline mb-3 text-xs-center">...E FOI ÉPICO</div>
            </v-layout>
          </v-parallax>

          <!-- Informações do Evento -->
          <div id="content">
            <v-layout row wrap class="my-5" >
              <!-- Data -->
              <v-flex xs12 sm4>
                <v-card class="elevation-0">
                  <center>
                    <v-icon x-large color="green darken-3">date_range</v-icon>
                  </center>
                  <v-card-text class="text-xs-center">
                    <p class="font-60">
                      16<small>*</small> a 18<br />
                      <small>Novembro</small>
                    </p>
                    <label> * - Dia 16 somente a partir das 19:00 </label>
                  </v-card-text>
                </v-card>
              </v-flex>
              <!-- Local -->
              <v-flex xs12 sm4>
                <v-card class="elevation-0">
                  <center>
                    <v-icon x-large color="green darken-3">location_on</v-icon>
                  </center>
                  <v-card-text class="text-xs-center">
                    <p class="font-60">
                      Cianorte<br />
                      <small>Paraná</small>
                    </p>
                  </v-card-text>
                </v-card>
              </v-flex>
              <!-- participantes -->
              <v-flex xs12 sm4>
                <v-card class="elevation-0">
                  <center>
                    <v-icon x-large color="green darken-3">tag_faces</v-icon>
                  </center>
                  <v-card-text class="text-xs-center">
                    <p class="font-60">
                      100<br />
                      <small><small><small>Vagas</small></small></small>
                    </p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
        </section>

        <!-- Imagem 2 e inscrições / lotes -->
        <section>
          <!-- Imagem 2 -->
          <v-parallax src="../../static/img/imagem2.jpg" height="380">
            <v-layout column align-center justify-center>
              <div class="headline white--text text-xs-center">Coloca aquela roupa típica alemã, e só pra constar #chupaAlemanha #hexabilidade</div>
            </v-layout>
          </v-parallax>

          <!-- inscrições / lotes -->
          <div id="content">
            <v-layout row wrap class="my-5" >
              <!-- Lote Ativo -->
              <v-flex xs12 sm4>
                <v-card class="elevation-0">
                  <v-card-title primary-title>
                    <div class="headline text-xs-center" style="width:100%">Lote Ativo</div>
                  </v-card-title>
                  <v-card-text>
                    2º Lote<br />
                    25 inscrições<br />
                    2 Dias: R$ <strong>65,00*</strong> <br />
                    3 Dias: R$ <strong>80,00*</strong> <br />
                  </v-card-text>
                </v-card>
              </v-flex>
              <!-- Demais Lotes -->
              <v-flex xs12 sm4>
                <v-card class="elevation-0">
                  <v-card-title primary-title>
                    <div class="headline text-xs-center" style="width:100%">Próximos Lotes</div>
                  </v-card-title>
                  <v-card-text>
                    <strike>
                      <small>Lote Promocional (15 Vagas)</small><br />
                      <small>2 Dias:</small> <strong>45,00*</strong> | <small>3 Dias:</small> <strong>60,00*</strong><br />
                    </strike>
                    <hr />
                    <small>3º Lote (30 Vagas)</small><br />
                    <small>2 Dias:</small> <strong>70,00*</strong> | <small>3 Dias:</small> <strong>85,00*</strong><br />
                    <hr />
                    <small>4º Lote (30 Vagas)</small><br />
                    <small>2 Dias:</small> <strong>75,00*</strong> | <small>3 Dias:</small> <strong>90,00*</strong><br />
                  </v-card-text>
                </v-card>
              </v-flex>
              <!-- inscrições -->
              <v-flex xs12 sm4 v-show="inscricaoAberta">
                <v-card class="elevation-0">
                  <v-card-title primary-title>
                    <div class="headline text-xs-center" style="width:100%"></div>
                  </v-card-title>
                  <v-card-text>
                    <v-btn large block color="success" @click="inscricao = true" :disabled="!loteAberto || loteEsgotado">Inscreva-se</v-btn>
                    <v-btn large block color="default" @click="pagamento = true">Pagamento</v-btn>
                    <small>* - Taxa adicional de R$ 5,00 para cartão de crédito.</small>
                    <div class="regimento">
                      <a href="../../static/regimento.pdf" target="_blank">Regimento do Evento</a>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </div>

          <!-- Lista de Inscritos -->
          <hr />
          <div id="content">
            <v-layout row wrap class="my-5" >
              <v-flex xs12>
                <center><h2 class="my-3">Lista de Inscritos</h2></center>
                <v-data-table :headers="tbl.inscricoes.headers" :items="participantes" hide-actions item-key="nome" class="elevation-1 mx-3">
                  <template slot="items" slot-scope="props">
                    <tr>
                      <td>{{ props.item.numerador }}</td>
                      <td>{{ props.item.nome }}</td>
                      <td>{{ props.item.clube }}</td>
                      <td>{{ props.item.distrito }}</td>
                      <td><center><v-icon>{{ props.item.pagamento | alternativa }}</v-icon></center></td>
                    </tr>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </div>
        </section>

        <!-- Imagem 3 / Fotos lugar-->
        <section>
          <!-- Imagem 3 -->
          <v-parallax src="../../static/img/imagem3.jpg" height="380">
            <v-layout column align-center justify-center>
              <div class="headline white--text text-xs-center">Companheirismo e novas amizades</div>
            </v-layout>
          </v-parallax>

          <!-- Fotos -->
          <div id="content">
            <v-layout row wrap class="my-5 display-scroll" >
              <v-flex xs12>
                <div class="headline text-xs-center ml-3">Fotos Local</div>
                <lightbox :images="local"></lightbox>
              </v-flex>
            </v-layout>
          </div>

          <!-- Mapa -->
          <v-parallax height="380">
            <v-layout column align-center justify-center>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.9146661318073!2d-52.587945185509746!3d-23.643226870504613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ed5a777bbc2a0d%3A0x377c5a2834711d97!2sChacara+Viola+de+Ouro+Eventos!5e0!3m2!1spt-BR!2sbr!4v1535122142979" width="100%" height="380" frameborder="0" style="border:0" allowfullscreen></iframe>
            </v-layout>
          </v-parallax>
        </section>

        <!-- Imagem 4 / Contatos -->
        <section>
          <v-parallax src="../../static/img/imagem4.jpg" height="380">
            <v-layout column align-center justify-center>
              <div class="headline white--text text-xs-center">E se é pra comemorar, chopp não vai faltar</div>
            </v-layout>
          </v-parallax>

          <!-- CCO -->
          <div id="content">
            <v-layout row wrap class="my-5" >
              <v-flex xs12 sm12>
                <div class="headline text-xs-center mb-3">CCO</div>
              </v-flex>
              <v-flex xs12 sm3 text-xs-center class="mb-3">
                <v-avatar :tile="false" :size="200" class="mb-3">
                  <img src="../../static/img/presidente.jpg">
                </v-avatar>
                <h3>Nicole Chiochetta</h3>
                <small>
                  Presidente do Evento<br />
                  +55 44 99162 - 5487
                </small>
              </v-flex>
              <v-flex xs12 sm3 text-xs-center class="mb-3">
                <v-avatar :tile="false" :size="200" class="mb-3">
                  <img class="avatar" src="../../static/img/secretario.jpg">
                </v-avatar>
                <h3>Eduardo Bayer</h3>
                <small>
                  Secretário do Evento<br />
                  +55 44 99154 - 0775
                </small>
              </v-flex>
              <v-flex xs12 sm3 text-xs-center class="mb-3">
                <v-avatar :tile="false" :size="200" class="mb-3">
                  <img class="avatar" src="../../static/img/tesoureiro.jpg">
                </v-avatar>
                <h3>Rafael Ornelas</h3>
                <small>
                  Tesoureiro do Evento<br />
                  +55 44 99148 - 7861
                </small>
              </v-flex>
              <v-flex xs12 sm3 text-xs-center>
                <v-avatar :tile="false" :size="200" class="mb-3">
                  <img class="avatar" src="../../static/img/clube.jpg">
                </v-avatar>
                <h3>Diego Fachin</h3>
                <small>
                  Presidente do Clube<br />
                  +55 44 99989 - 1340
                </small>
              </v-flex>
            </v-layout>
          </div>
        </section>

        <!-- Rodapé -->
        <div id="footer" style="background-color: #017C50">
          <v-layout row wrap id="footer-layout" class="my-3">
            <v-flex xs12 sm4>
              <div class="headline white--text ml-3">Organização</div>
              <div class="white--text my-3 ml-3">
                <img src="../../static/img/rtc_cianorte.png" width="120vh" class="mr-3">
              </div>
            </v-flex>
            <v-flex xs12 sm5>
              <div class="headline white--text ml-3">Apoio</div>
              <div class="white--text my-3 ml-3">
              </div>
            </v-flex>
            <v-flex xs12 sm3>
              <div class="headline white--text ml-3">Redes Sociais</div>
                <v-layout row wrap id="footer-layout" class="my-3 text-dark-collor">
                  <v-flex xs12 align-content-center>
                    <img src="../../static/img/facebook.png"> / RotaractCianorte
                  </v-flex>

                  <v-flex xs12 align-content-center>
                    <img src="../../static/img/instagram.png"> / rtc.cianorte
                  </v-flex>
                </v-layout>
              <div class="white--text my-3 ml-3">
              </div>
            </v-flex>
          </v-layout>
        </div>
        <footer style="background-color: #12543D">
          <v-layout row wrap style class="my-2" id="footer-layout">
            <v-flex xs12>
              <div class="white--text text-xs-center ml-3">
                Todos os direitos reservados
              </div>
            </v-flex>
          </v-layout>
        </footer>
      </main>

      <!-- Modal Clubes -->
      <ModalInscricao :lstClube='lstClube' :modal='inscricao' v-on:inscricao="closeInscricao" v-if="inscricao"></ModalInscricao>
      <ModalPagamento :modal='pagamento' v-on:pagamento="closePagamento" v-if="pagamento"></ModalPagamento>
    </v-app>
  </div>
</template>

<script>
import Firebase from 'firebase'
import ModalInscricao from '@/components/ModalInscricao'
import ModalPagamento from '@/components/ModalPagamento'

var dbClube = Firebase.database().ref('clube')
var dbParticipante = Firebase.database().ref('participante')
export default {
  name: 'Home',
  components: {
    ModalInscricao,
    ModalPagamento
  },
  data () {
    return {
      drawer: false,
      inscricao: false,
      inscricaoAberta: true,
      pagamento: false,
      tbl: {
        inscricoes: {
          headers: [
            { text: '#', align: 'left', value: 'numerador' },
            { text: 'Nome', align: 'left', value: 'nome' },
            { text: 'Clube', align: 'left', value: 'clube' },
            { text: 'Distrito', align: 'left', value: 'distrito' },
            { text: 'Pgto', align: 'center', value: 'pgto' }
          ]
        }
      },
      participantes: [],
      local: [
        {
          src: '../../static/img/local/viola_de_ouro (1).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (2).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (3).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (4).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (5).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (6).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (7).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (8).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (9).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (10).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (11).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (12).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (13).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (14).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (15).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (16).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (17).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (18).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (19).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (20).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (21).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (22).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (23).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (24).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (25).jpeg'
        },
        {
          src: '../../static/img/local/viola_de_ouro (26).jpeg'
        }
      ],
      loteAberto: false,
      loteEsgotado: true
    }
  },
  firebase: {
    lstClube: dbClube,
    participantes: dbParticipante
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
  methods: {
    closeInscricao (val) {
      this.inscricao = val
    },
    closePagamento (val) {
      this.pagamento = val
    },
    validaAberturaLote () {
      let dataAbertura = new Date('2018-09-13 20:00:00')
      if (new Date() >= dataAbertura) {
        this.loteAberto = true
      } else {
        this.loteAberto = false
      }
    },
    validaLoteEsgotado () {
      if ((this.participantes.length > 0) && (this.participantes.length < 40)) {
        this.loteEsgotado = false
      } else {
        this.loteEsgotado = true
      }
    }
  },
  mounted () {
    this.validaAberturaLote()
  },
  watch: {
    participantes: function (dados) {
      for (var reg in dados) {
        dados[reg].numerador = parseInt(reg) + 1
      }
      const self = this
      setInterval(() => {
        self.validaLoteEsgotado()
      }, 3000)

      return dados
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
.regimento a {
  color: #12543D !important;
  text-decoration: none;
  font-size: 3vh;
  padding-left: 1vw;
  padding-right: 1vw;
}
.regimento a:hover {
  color: dimgray !important;
  text-decoration: none;
  font-size: 3vh;
  padding-left: 1vw;
  padding-right: 1vw;
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
.display-scroll {
  height: 50vh;
  display: block;
  overflow-y: scroll;
}

.text-dark-collor {
  color: #12543D !important
}
</style>
