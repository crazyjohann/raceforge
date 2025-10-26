import { useState, useEffect } from 'react';

export default function useInput() {
  const [state, setState] = useState({ forward:false, back:false, left:false, right:false });
  useEffect(() => {
    function keydown(e){
      if (e.code === 'KeyW') setState(s => ({...s, forward:true}));
      if (e.code === 'KeyS') setState(s => ({...s, back:true}));
      if (e.code === 'KeyA') setState(s => ({...s, left:true}));
      if (e.code === 'KeyD') setState(s => ({...s, right:true}));
    }
    function keyup(e){
      if (e.code === 'KeyW') setState(s => ({...s, forward:false}));
      if (e.code === 'KeyS') setState(s => ({...s, back:false}));
      if (e.code === 'KeyA') setState(s => ({...s, left:false}));
      if (e.code === 'KeyD') setState(s => ({...s, right:false}));
    }
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    return () => {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
    };
  },[]);
  return state;
}
