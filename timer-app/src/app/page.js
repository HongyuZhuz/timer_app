import Image from 'next/image'
import styles from './page.module.css'

export default function TimerDashboard () {
  return(
    <div>
    <EditableTimerList/>
    <ToggleableTimer/>
    </div>
  )
}

const EditableTimerList=()=>{
  return(
    <EditableTimer/>
  )
}

const EditableTimer=()=>{
  return(
    <>
    <Timer/>
    <TimerForm/>
    </>
  )
}

const Timer=()=>{
  return(
    <>
    <h1>Timer</h1>
    </>
  )
}

const TimerForm=()=>{
  return(
    <>
    <h1>TimerForm</h1>
    </>
  )
}

const ToggleableTimer=()=>{
  return(
    <>
    <h1>ToggleableTimer</h1>
    <TimerForm/>
    </>
  )
}
