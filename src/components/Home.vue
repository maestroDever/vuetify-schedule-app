<template>
  <div id="home">
    <v-flex display-3>Hello</v-flex>
    <p>This is the schedule app using vuetify</p>
    <router-link :to="{ name: 'ShiftList' }">
      <p>Show Schedule List</p>
    </router-link>
  </div>
</template>

<script>
import { db } from '../firebaseConfig'
import router from '../router'
const scheduleCollection = db.collection('schedule')

export default {
  name: 'Home',

  data () {
    return {
      schedules: [],
    }
  },
  
  created() {
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
  }
}
</script>

<style>

</style>
