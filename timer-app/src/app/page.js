'use client'

import { v4 as uuidv4 } from 'uuid';
import { newTimer, findById, renderElapsedString } from './helpers.js';
import 'semantic-ui-css/semantic.min.css';
import React, { useEffect, useState } from 'react';

const initialTimers=[
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
  const [timers,setTimers] = useState(initialTimers);

  const isSubmit = (timer)=>{
    createTimer(timer);
  }
  const createTimer =(timer)=>{
    const t= newTimer(timer);
    setTimers(prevTimers=>([...prevTimers,t]))
  }
  const handleUpdate = (attr)=>{
    setTimers(prevTimers=>prevTimers.map((t)=>{
      if(t.id === attr.id){
        return {...t,...attr}
      }else{
        return(t)
      };
    }))
  }

  return(
    <div>
    <EditableTimerList timers={timers} onFormUpdate={handleUpdate}/>
    <ToggleableTimer createOpen={false} handleSubmit = {isSubmit}/>
    </div>
  )
}

const EditableTimerList=({timers,onFormUpdate})=>{
  return(
    <div>
    {timers.map((timer)=>(
      <EditableTimer
        {...timer}
        handleUpdate = {onFormUpdate}
      />
    ))}
    
    </div>
  )
}

const EditableTimer=({title,project,id,elapsed,runningSince,editOpen=true,handleUpdate})=>{
  const [isEdit,setIsEdit] = useState(editOpen);

  const handleEdit =()=>{
    setIsEdit(false);
  }
  const closeForm = ()=>{
    setIsEdit(true);
  }
  const onFormUpdate = (timer)=>{
    handleUpdate(timer)
    closeForm();
  }

  if (isEdit===true){
    return(
      <Timer 
      title={title}
      project={project}
      id={id}
      elapsed={elapsed}
      runningSince={runningSince}
      isOnEdit = {handleEdit}
      />
    )
  }else return(
    <TimerForm
      title={title}
      project={project}
      id={id}
      elapsed={elapsed}
      runningSince={runningSince}
      onFormClose = {closeForm}
      handleUpdate = {onFormUpdate}
    />
  )
  
}

const Timer=({title,project,id,elapsed,runningSince,isOnEdit})=>{
  const elapsedString = renderElapsedString(elapsed);
  return(
    <div className='ui centered card'>
      <div className='content'>
        <div className='header'>
          {title}
        </div>
        <div className='meta'>
          {project}
        </div>
        <div className='center aligned description'>
          <h2>
            {elapsedString}
          </h2>
        </div>
        <div className='extracontent'>
          <span className='right floated edit icon'>
            <i className='edit icon' onClick={isOnEdit}/>
          </span>
          <span className='right floated trash icon'>
            <i className='trash icon'/>
          </span>
        </div>
      </div>
      <div className = 'ui bottom attached blue basic button'>
        Start
      </div>
    </div>
  )
}

const TimerForm=({title,project,id,elapsed,runningSince,handleSubmit,onFormClose,handleUpdate})=>{
  const [timer,setTimer] = useState({
    title:title,
    project:project
  })
  const handleTitleChange =(event)=>{
    setTimer(prevTimer=>({...prevTimer,title:event.target.value}));
  }
  const handleProjectChange =(event)=>{
    setTimer(prevTimer=>({...prevTimer,project:event.target.value}))
  }
  const onFormSubmit=()=>{
    handleSubmit(timer);
  }
  const onFormUpdate=()=>{
    handleUpdate({...timer,id});
  }
  
  const submitText = title? 'Update':'Create'
  return(
    <div className='ui centered card'>
      <div className='content'>
        <div className='ui form'>
          <div className = 'field'>
            <label>Title</label>
            <input type = 'text' value = {timer.title} onChange={handleTitleChange}/>
          </div>
          <div className = 'field'>
            <label>Project</label>
            <input type = 'text' value = {timer.project} onChange={handleProjectChange}/>
          </div>
          <div className = 'ui two bottom attached buttons'>
            <button className = 'ui basic blue button' onClick={title?onFormUpdate:onFormSubmit}>
              {submitText}
            </button>
            <button className = 'ui basic red button' onClick = {onFormClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ToggleableTimer=({createOpen,handleSubmit})=>{
  const [isCreate, setIsCreat] = useState(createOpen);
  const openForm =()=>{
    setIsCreat(true)
  }
  const isSubmit = (timer)=>{
    handleSubmit(timer);
    closeForm();
  }
  const closeForm = () =>{
    setIsCreat(false)
  }
 
  if(isCreate){
    return(<TimerForm handleSubmit={isSubmit} onFormClose = {closeForm}/>)
  }else{
    return(
      <div className = 'ui basic content center aligned segment'>
        <button className = 'ui basic button icon' onClick={openForm}>
          <i className = 'plus icon' />
        </button>
      </div>
    )
  }
}
