import VueRouter from 'vue-router'

import Home from './components/Home'
import ShiftList from './components/ShiftList'
import AddShift from './components/AddShift'
import EditShifts from './components/EditShifts'
import ShowShifts from './components/ShowShifts'
import HelloWorld from './components/HelloWorld'

export default new VueRouter({
  routes: [
  {
    path: '/',
    name: 'Home',
    component: Home

  },
  {
    path: '/awesome',
    name: 'awesome',
    component: HelloWorld
  },
  {
    path: '/shiftlist',
    name: 'ShiftList',
    component: ShiftList
  },
  {
    path: '/showshifts/:id',
    name: 'ShowShifts',
    component: ShowShifts
  },
  {
    path: '/addshift',
    name: 'AddShift',
    component: AddShift
  },
  {
    path: '/editshifts/:id',
    name: 'EditShifts',
    component: EditShifts
  },
  // {
  //   path: '/shiftlist2',
  //   name: 'ShiftList2',
  //   component: ShiftList2
  // },
  // {
  //   path: '/showshifts2/:id',
  //   name: 'ShowShifts2',
  //   component: ShowShifts2
  // },
  // {
  //   path: '/addshift2',
  //   name: 'AddShift2',
  //   component: AddShift2
  // },
  // {
  //   path: '/editshifts2/:id',
  //   name: 'EditShifts2',
  //   component: EditShifts2
  // }
  ]
})
