<template>
  <div >
    <form v-if="!isRequestSent" @submit.prevent="submit">
      <datepicker
        :value="date"
        @input="updateDate"
        min="2018-6-1"
        max="2030-01-01"
        :dayStr="dayStr"
      />
      <timepicker
        type="minute"
        :value="time"
        @input="updateTime"
        :timeStr="timeStr"
        :btnStr="'OK'"
      />
      <select v-model="location">
        <option :value="woods">Woods</option>
        <option :value="shoreline">Shoreline</option>
        <option :value="customs">Customs</option>
        <option :value="lighthouse">Lighthouse</option>
      </select>
      <input :disabled="isSubmitDisabled" type="submit" value="submit" />
    </form>
    <div v-if="isRequestSent">
      Thank you for your feedback!
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { WOODS, SHORELINE, CUSTOMS, LIGHTHOUSE } from '../constants'
import { Datepicker, Timepicker } from '@livelybone/vue-datepicker'
import '@livelybone/vue-datepicker/lib/css/index.css'

export default Vue.extend({
  components: { 
    Datepicker,
    Timepicker
  },
  data() {
    return {
      location: null,
      isSubmitDisabled: false,
      isRequestSent: false,
      woods: WOODS,
      shoreline: SHORELINE,
      customs: CUSTOMS,
      lighthouse: LIGHTHOUSE,
      // datepicker
      dayStr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      date: '2018-06-01',
      // timepicker
      timeStr: ['hour', 'min', 'sec'],
      time: '00:00',
    }
  },
  methods: {
    submit(){
      if(this.isRequestValid()) {
        fetch('/api/add-goons', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            location: this.location,
            time: new Date(`${this.date} ${this.time}`),
          })
        })
        this.isSubmitDisabled = true
        this.isRequestSent = true
      }
    },
    isRequestValid() {
      return this.location !== null;
    },
    updateDate(value) {
      this.date = value
    },
    updateTime(value) {
      this.time = value
    }
  } 
})
</script>
