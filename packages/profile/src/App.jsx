import React, { useState } from 'react'

export const App = ({user}) => {

  // const [user, setUser] = useState('');

  // window.addEventListener('userLoginChild', (event) => {
  //   setUser(event.detail.message.user);
  // });

  return (
    <div>
      La Persona que esta logeada es {user}
    </div>
  )
}
