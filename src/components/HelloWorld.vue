<template>
  <div id="app">
  <v-app id="inspire">
    <v-icon medium @click="home">home</v-icon>
    <div>
      <v-toolbar flat color="white">
        <v-toolbar-title>Single Data Table CRUD</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ modalTitle }}</span>
            </v-card-title>
  
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="selectedItem.time" label="Time"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="selectedItem.shiftType" label="Shift Type"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="selectedItem.monday" label="Monday"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="selectedItem.tuesday" label="Thuesday"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="selectedItem.wednesday" label="Wednesday"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="selectedItem.thursday" label="Thursday"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="selectedItem.friday" label="Friday"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="selectedItem.saturday" label="Saturday"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="selectedItem.sunday" label="Sunday"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="schedules"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.time }}</td>
          <td class="text-xs-right">{{ props.item.shiftType }}</td>
          <td class="text-xs-right">{{ props.item.monday }}</td>
          <td class="text-xs-right">{{ props.item.tuesday }}</td>
          <td class="text-xs-right">{{ props.item.wednesday }}</td>
          <td class="text-xs-right">{{ props.item.thursday }}</td>
          <td class="text-xs-right">{{ props.item.friday }}</td>
          <td class="text-xs-right">{{ props.item.saturday }}</td>
          <td class="text-xs-right">{{ props.item.sunday }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </v-app>
</div>
</template>

<script>
import { db, scheduleCollection } from '../firebaseConfig'
import router from '../router'

export default {
  name: 'HelloWorld',
  
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Shift', align: 'left', sortable: false, value: 'time' },
      { text: 'Shift Type', value: 'shiftType' },
      { text: 'Monday', sortable: false, value: 'monday' },
      { text: 'Tuesday', sortable: false, value: 'tuesday' },
      { text: 'Wednesday', sortable: false, value: 'wednesday' },
      { text: 'Thursday', sortable: false, value: 'thursday' },
      { text: 'Friday', sortable: false, value: 'friday' },
      { text: 'Saturday', sortable: false, value: 'saturday' },
      { text: 'Sunday', sortable: false, value: 'sunday' },
      { text: 'Actions', value: 'id', sortable: false }
    ],
    schedules: [],
    selectedIndex: -1,
    selectedItem: {
      id: -1,
      time: '',
      shiftType: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
    defaultItem: {
      id: 0,
      time: '',
      shiftType: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    }
  }),

  computed: {
    modalTitle () {
      return this.selectedIndex === -1 ? 'New Shift' : 'Edit Shift'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    scheduleCollection.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.schedules.push({
          id: doc.id,
          time: doc.data().time,
          shiftType: doc.data().shiftType,
          monday: doc.data().monday,
          tuesday: doc.data().tuesday,
          wednesday: doc.data().wednesday,
          thursday: doc.data().thursday,
          friday: doc.data().friday,
          saturday: doc.data().saturday,
          sunday: doc.data().sunday
        })
      })
    })
  },

  methods: {
    initialize () {
      
    },

    editItem (item) {
      this.selectedIndex = this.schedules.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.schedules.indexOf(item)
      if(confirm('Are you sure you want to delete this item?')) {
        this.schedules.splice(index, 1)
        scheduleCollection.doc(item.id)
          .delete()
          .then(() =>{
            
          })
          .catch(error => {
            alert("Error occured while trying to delete the schedule.")
            console.log(error)
          })
      }
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.selectedItem = Object.assign({}, this.defaultItem)
        this.selectedIndex = -1
      }, 300)
    },

    save () {
      if (this.selectedIndex > -1) {
        Object.assign(this.schedules[this.selectedIndex], this.selectedItem)
        scheduleCollection.doc(this.selectedItem.id)
          .set(this.selectedItem)
          .then(docRef => {
            this.close()
          })
          .catch(error => {
              alert("Error occured while updating the schedule")
              console.log(error)
          })
      } else {
        const time = Date.now()
        this.selectedItem.id = String(time)
        this.schedules.push(this.selectedItem)
        scheduleCollection
          .doc(this.selectedItem.id)
          .set(this.selectedItem).then(docRef => {
          this.close
        }).catch(error => {
          alert("Error occured while adding into schedule")
          console.log(error)
        })
      }
      this.close()
    },

    home() {
      router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style>

</style>
