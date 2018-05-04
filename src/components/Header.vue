<template>
  <div class="Cabecalho">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-list dense>
        <template v-for="item in menu">
          <v-layout row v-if="item.heading" align-center :key="item.heading">
            <v-flex xs6>
              <v-subheader v-if="item.heading" dark>
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="$router.push('')">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="$router.push('')" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">ADMIN</span>
        <v-spacer />
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Cabecalho',
  data () {
    return {
      drawer: true,
      menu: [
        { icon: 'create', text: 'Inscrições' },
        { icon: 'local_hospital', text: 'Alergias/Alimentação' },
        { icon: 'payment', text: 'Pagamentos' },
        { icon: 'account_circle', text: 'Usuário' },
        { icon: 'exit_to_app', text: 'Sair' }
      ]
    }
  }
}
</script>

<style>

</style>
