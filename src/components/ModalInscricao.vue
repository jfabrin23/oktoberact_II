<template>
  <div class="ModalInscricao">
    <v-dialog v-model="modal" width="80%" persistent>
      <v-card>
        <v-card-title class="modal dark">
          <label class="title" style="color: #FFFFFF">
            Inscrição
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
                <v-text-field label="Nome" v-model="participante.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>

              <v-flex xs8>
                <v-select label="Clube" v-model="participante.clube" :items="lstClube" item-value="text" :rules="regrasValidacao.clube" required autocomplete :disabled="outroClube"></v-select>
                <v-checkbox label="Meu Clube não tá na lista!" v-model="outroClube"></v-checkbox>
              </v-flex>

              <v-flex xs4 pl-3>
                <v-text-field label="Distrito" v-model="participante.distrito" :rules="regrasValidacao.distrito" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Outro Clube" v-model="participante.clube" :rules="regrasValidacao.clube" :disabled="!outroClube"></v-text-field>
              </v-flex>

              <v-flex xs4>
                <v-text-field type="tel" label="Data de Nasc." :mask="nascimento" v-model="participante.nascimento" :rules="regrasValidacao.nascimento" required></v-text-field>
              </v-flex>

              <v-flex xs4 pl-4>
                <v-select label="Estado Civil" v-model="participante.estadocivil" :items="lstEstadocivil" item-value="text" :rules="regrasValidacao.estadocivil" required autocomplete></v-select>
              </v-flex>

              <v-flex xs4 pl-4>
                <v-select label="Sexo" v-model="participante.sexo" :items="lstSexo" item-value="text" :rules="regrasValidacao.sexo" required autocomplete></v-select>
              </v-flex>

              <v-flex xs6>
                <v-text-field type="tel" label="Telefone" :mask="telefone" v-model="participante.telefone" :rules="regrasValidacao.telefone" required></v-text-field>
              </v-flex>

              <v-flex xs6 pl-4>
                <v-text-field label="E-Mail" type="mail" v-model="participante.email" :rules="regrasValidacao.email" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-select label="Passaporte" v-model="participante.passaporte" :items="lstPassaporte" item-value="text" :rules="regrasValidacao.passaporte" required autocomplete></v-select>
              </v-flex>

              <v-flex xs12>
                <v-checkbox label="Vegetariano / Vegano?" v-model="participante.restricao.vegetariano"></v-checkbox>
              </v-flex>

              <v-flex xs12>
                <v-checkbox label="Restição alimentar?" v-model="participante.restricao.alergiaalimentar"></v-checkbox>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Restrição Alimentar" v-model="participante.restricao.alimentos" textarea v-show="participante.restricao.alergiaalimentar"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-checkbox label="Restrição medicamentos?" v-model="participante.restricao.alergiamedicamentos"></v-checkbox>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Restrição Medicamentos" v-model="participante.restricao.medicamentos" textarea v-show="participante.restricao.alergiamedicamentos"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <h3>Em caso de emergência avisar:</h3>
                <small>Preferencialmente alguém fora do evento</small>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Nome" v-model="participante.contato.nome" :rules="regrasValidacao.nome" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field type="tel" label="Telefone" :mask="telefone" v-model="participante.contato.telefone" :rules="regrasValidacao.telefone" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Parentesco" v-model="participante.contato.parentesco" :rules="regrasValidacao.parentesco" required></v-text-field>
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

var dbParticipante = Firebase.database().ref('participante')
var dbFinanceiro = Firebase.database().ref('financeiro')
export default {
  name: 'ModalInscricao',
  data () {
    return {
      participante: {
        nome: '',
        clube: '',
        distrito: '',
        email: '',
        sexo: '',
        estadocivil: '',
        nascimento: '',
        dataNascimento: '',
        telefone: '',
        restricao: {
          vegetariano: false,
          alergiaalimentar: false,
          alergiaremedio: false
        },
        contato: {
          nome: '',
          telefone: '',
          parentesco: ''
        },
        pagamento: false,
        situacao: true
      },
      financeiro: {
        descricao: 'Inscrição de ',
        inscricao: true,
        pagamento: {
          data: '',
          formapgt: ''
        },
        situacao: false,
        tipo: 'E',
        valor: '',
        vencimento: ''
      },
      msg: {
        tipo: '',
        texto: '',
        mostrar: false
      },
      loading: false,
      outroClube: false,
      teste: {},
      regrasValidacao: {
        nome: [
          v => !!v || 'Nome é obrigatório'
        ],
        clube: [
          v => !!v || 'Clube é obrigatório'
        ],
        passaporte: [
          v => !!v || 'Passaporte é obrigatório'
        ],
        distrito: [
          v => !!v || 'Distrito é obrigatório'
        ],
        sexo: [
          v => !!v || 'Sexo é obrigatório'
        ],
        estadocivil: [
          v => !!v || 'Estado Civil é obrigatório'
        ],
        telefone: [
          v => !!v || 'Telefone é obrigatório'
        ],
        nascimento: [
          v => !!v || 'Data de Nasc. é obrigatório'
        ],
        email: [
          v => !!v || 'E-Mail é obrigatório'
        ],
        parentesco: [
          v => !!v || 'Parentesco é obrigatório'
        ]
      },
      lstPassaporte: ['2 Dias', '3 Dias'],
      lstSexo: ['Gaudério (Masculino)', 'Guria (Feminino)', 'Pra que padrões, tchê!? (Indefinido)'],
      lstEstadocivil: ['Borracho y Loco! (Solteiro)', 'Acertei... o pulo quando te encontrei! (Namorando)', 'Você é o segredo que eu quero desvendar! (Casado)'],
      telefone: '## ##### - ####',
      nascimento: '##/##/####',
      valid: true
    }
  },
  firebase: {
    participantes: dbParticipante,
    financeiros: dbFinanceiro
  },
  methods: {
    close (val) {
      this.$emit('inscricao', val)
    },
    gravarFinanceiro () {
      var hoje = new Date()
      var vencimento = new Date()
      vencimento.setDate(hoje.getDate() + 3)
      this.financeiro.descricao += this.participante.nome
      if (this.participantes.length <= 15) {
        this.financeiro.valor = (this.participante.passaporte === '2 Dias' ? 45.00 : 60.00)
      } else if (this.participantes.length <= 40) {
        this.financeiro.valor = (this.participante.passaporte === '2 Dias' ? 65.00 : 80.00)
      } else if (this.participantes.length <= 70) {
        this.financeiro.valor = (this.participante.passaporte === '2 Dias' ? 70.00 : 85.00)
      } else if (this.participantes.length <= 100) {
        this.financeiro.valor = (this.participante.passaporte === '2 Dias' ? 75.00 : 90.00)
      } else {
        this.financeiro.valor = (this.participante.passaporte === '2 Dias' ? 80.00 : 95.00)
      }
      this.financeiro.vencimento = vencimento.toISOString()
      console.log(this.financeiro)
      var retorno = false
      if (dbFinanceiro.push(this.financeiro)) retorno = true
      return retorno
    },
    limpar () {
      this.loading = false
      this.$refs.form.reset()
    },
    salvar () {
      if (this.$refs.form.validate()) {
        this.loading = true
        // if (this.participantes.filter((val) => val.email !== this.participante.email)) {
        var inFinanceiro = this.gravarFinanceiro()
        if (inFinanceiro) {
          dbParticipante.push(this.participante)
          this.limpar()
          this.msg = {
            tipo: 'success',
            texto: 'Sucesso! Nos vemos na Oktoberact... Cuida bem, cuida bem da sua marreca!',
            mostrar: true
          }
        }
        /* } else {
          this.loading = false
          this.msg = {
            tipo: 'error',
            texto: 'E-mail já cadastrado!',
            mostrar: true
          }
        } */
      }
    }
  },
  props: [
    'lstClube',
    'modal'
  ]
}
</script>

<style>
.list__tile__title {
  color: #017C50
}
</style>

