<!-- 1. Connect Todo with database (Firebase/PostgreSQL) -->
<!-- 2. Make a web version of this software -->
<!-- 3. Make a mobile version of this software -->
<!-- 4. Make it online -->

<!-- change database to real time database -->
<template>
  <div class="home">
    <div class="pa-4">
      <header
      :value="computedDateFormattedMomentjs"
      class="list-group-item" 
      v-show="fulldatetime"
      > 
        {{ fulldatetime }}
        <v-icon
          @click="dateReset"
        >mdi-reload</v-icon>
      </header>
    </div>
    
    <div class="px-4">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="computedDateFormattedMomentjs"
            label="Pick a date"
            prepend-icon="mdi-calendar"
            v-bind="attrs"
            v-on="on"
            clearable
            @click:clear="date = null"
          >
            <template v-slot:append>
              <v-icon
              :disabled="date == '' || date == null"
              @click="addDate"
              >
                mdi-checkbox-marked
              </v-icon>
            </template>  
          </v-text-field>  
        </template>
        <v-date-picker
          v-model="date"
          :events="arrayEvents"
          event-color="green lighten-1"
          @change="menu = false"
        ></v-date-picker>
      </v-menu>
    </div>
    
    <v-text-field
      v-model="newTaskTitle"
      @keyup.enter="addTask"
      :disabled="fulldatetime !== currentDate"
      class="px-4"
      outlined
      label="Add a Task"
      clearable
    >
      <template v-slot:append>
        <v-icon
        :disabled="newTaskTitle == '' || newTaskTitle == null"
        @click="addTask" 
        >
          mdi-plus
        </v-icon>
      </template>  
    </v-text-field>
    
    <v-list
      class="px-4"
      flat
    >
      <div
        v-for="task in tasks"
        :key="task.id"
      >
        <v-list-item
          @click="doneTask(task.id)"
          :class="{'blue lighten-5': task.done}"
        >
          <template 
            v-slot:default
            >
            <v-list-item-action>
              <v-checkbox
                :input-value="task.done"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>
          
            <v-list-item-content>
              <!-- Change task.title to value function called that gets task based on date stored -->
              <v-list-item-title
                :class="{'text-decoration-line-through':task.done}"
              >{{task.title}}</v-list-item-title>
              
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                @click.stop="deleteTask(task.id)"
                icon
              >
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      
    </v-list>
  </div>  
</template>

<script>
import moment from 'moment'
import {db} from '../firebase/db'
  export default {
    name: 'Home',
    data() {
      return {
        fulldatetime: '',
        disabled: true,
        newTaskTitle: '',
        tasks:[],
        countTask: 0,
        activePicker: null,
        date: '',
        menu: false,
        currentDateVal: '',
        currentDateVal2: '',
        arrayEvents: null,
      }
    },
    firestore:{
      tasks: db.collection("TodoTask")               
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
      },
      currentDate(){
        var dateForCurrentDateVal = new Date()
        this.currentDateVal = dateForCurrentDateVal ? moment(dateForCurrentDateVal).format('dddd, MMMM Do YYYY') : ''
        var currentDateNow = this.currentDateVal
        return currentDateNow 
      },
    },
    
    methods: {
      dateReset(){
        // return all the task data for today
        var d = new Date()
        this.currentdateVal2 = d ? moment(d).format('dddd, MMMM Do YYYY') : ''
        this.fulldatetime=d ? moment(d).format('dddd, MMMM Do YYYY') : ''
      },
      addDate(){
        var dateNowForID = new Date()
        this.currentdateVal2 = dateNowForID ? moment(dateNowForID).format('dddd, MMMM Do YYYY') : ''
        // return all the task data for this day
        this.fulldatetime=this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
      },
      addTask() {
        var dateNowForID = new Date()
        let newTask = {
          id: dateNowForID,
          title: this.newTaskTitle,
          done: false
        }
        //put value to database
        //this.tasks.push(newTask)
        this.countTask++
        this.newTaskTitle = ''
        this.currentdateVal2 = dateNowForID ? moment(dateNowForID).format('dddd, MMMM Do YYYY') : ''
        db.collection("TodoTask").add(newTask) 
      },
      doneTask(id){
        var dateNowForID = new Date()
        this.currentdateVal2 = dateNowForID ? moment(dateNowForID).format('dddd, MMMM Do YYYY') : ''

        var todateNow1 = this.fulldatetime
        var todateNow2 = this.currentDateVal2 
        if (todateNow1 == todateNow2){
          let task = this.tasks.filter(task => task.id === id)[0]
          task.done = !task.done
          db.collection("TodoTask").doc(id).set({id: task.id, done: task.done, title: task.title});
        }
        
      },
      deleteTask(id){
        //make a deletion in database
        var dateNowForID = new Date()
        this.currentdateVal2 = dateNowForID ? moment(dateNowForID).format('dddd, MMMM Do YYYY') : ''

        var todateNow1 = this.fulldatetime
        var todateNow2 = this.currentDateVal2 
        if (todateNow1 == todateNow2){
          db.collection("TodoTask").doc(id).delete();        
        }
      },
      printFullDate: function () {
        //put value to database
        var d = new Date()
        this.currentdateVal2 = d ? moment(d).format('dddd, MMMM Do YYYY') : ''

        var date = d ? moment(d).format('dddd, MMMM Do YYYY') : ''
        return date
      },
     
    },
    mounted: function () {
      this.fulldatetime = this.printFullDate();
    },
  }
</script>

<style>
   .list-group-item{
     font-size:25px;
     font-weight:bold;
     font-family: "Calibri";
   }
</style>
