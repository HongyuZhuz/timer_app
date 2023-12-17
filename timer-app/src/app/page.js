import Image from 'next/image'
import styles from './page.module.css'
import { v4 as uuidv4 } from 'uuid';


const timers=[
  {
    title:'Practice squat',
    project:'Gym Chores',
    id:uuidv4(),
    elapsed:5456099,
    runningSince:Date.now(),
    editOpen:true
  },
  {
    title:'Bake squash',
    project:'Kichen Chores',
    id:uuidv4(),
    elapsed:1273998,
    runningSince:null,
    editOpen:false
  }
]

export default function TimerDashboard () {
  return(
    <div>
    <EditableTimerList timers={timers}/>
    <ToggleableTimer/>
    </div>
  )
}

const EditableTimerList=({timers})=>{
  return(
    <div>
    {timers.map((timer)=>(
      <EditableTimer
        title={timer.title}
        project={timer.project}
        id={timer.id}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        editOpen={timer.editOpen}
      />
    ))}
    
    </div>
  )
}

const EditableTimer=({title,project,id,elapsed,runningSince,editOpen})=>{
  console.log(editOpen)
  if (editOpen===true){
    return(
      <Timer 
      title={title}
      project={project}
      id={id}
      elapsed={elapsed}
      runningSince={runningSince}
      />
    )
  }else return(
    <TimerForm
      title={title}
      project={project}
      id={id}
      elapsed={elapsed}
      runningSince={runningSince}
    />
  )
  
}

const Timer=({title,project,id,elapsed,runningSince})=>{
  return(
    <>
    <h1 style={{color:'red'}}>{title},{project}</h1>
    </>
  )
}

const TimerForm=({title,project,id,elapsed,runningSince})=>{
  return(
    <>
    <h1>{title}</h1>
    </>
  )
}

const ToggleableTimer=()=>{
  return(
    <>
    <h1>+</h1>
    <TimerForm/>
    </>
  )
}
