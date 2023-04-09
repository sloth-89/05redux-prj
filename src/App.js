// 1. 리덕스를 사용하지 않을 때 예제 - 불편함

// App 컴포넌트
import React, { useState } from "react";
import "./style.css";

export default function App(){
  const [number, setNumber] = useState(123);

  return(
    <div id="container">
      <h1 style={{color: "red"}}>Start : {number}</h1>
      <div id="grid">
        <Left1 number={number}/>
        <Right1/>
      </div>
      
    </div>
  )
}

// 하위 컴포넌트
function Left1(props){
  return(
    <div>
      <h1>Left1 : {props.number}</h1>
      <Left2 number={props.number}/>
    </div>
  )
}

function Left2(props){
  return(
    <div>
        <h1>Left2 : {props.number}</h1>
        <Left3 number={props.number}/>
    </div>
  )
}

function Left3(props){
  return(
    <div>
        <h1>Left3 : {props.number}</h1>
    </div>
  )
}

function Right1(props){
  return(
    <div>
      <h1>Right1 : </h1>
    </div>
  )
}

function Right2(props){
  return(
    <div>
      <h1>Right2 : </h1>
      <Right3 onIncrease={() => {props.onIncrease()}}></Right3>
    </div>
  )
}

function Right3(props){
  return(
    <div>
      <h1>Right3 : </h1>
      <input type="button" value="number+1" onClick={() => {props.onIncrease()}}></input>
    </div>
  )
}

