import React, { useState } from "react";

const Button = (props) => { 
   const { text, type, submitEvent } = props
   return (
    <button className="ms__button" type={type} onClick={submitEvent}>{text}</button>
   )
}

export default Button;