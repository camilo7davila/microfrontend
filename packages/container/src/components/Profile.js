import React, { useEffect } from 'react';


export default ({ user }) => {

  useEffect(() => {
    const loadWc = async () => {
      await import('profile/WebProfile');
      const element = document.getElementById('wc-react');
      // const wc = document.createElement('wc-profile');
      element.innerHTML = `<wc-profile user=${user}></wc-profile>`;
    }
    loadWc();
  });

  return (
    <div id="wc-react"></div>
  )
}
