import { Container, Switch } from '@mui/material';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Definitions from './components/Definitions';

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const App = () => {
  const [meanings,setMeanings]=useState([])
  const [word,setWord]=useState('')
  const [category,setCategory]=useState('english')
  const [LightMode,setLightMode]=useState(false)
  const dictionaryApi=async()=>{
    try {
      const data=await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);
      setMeanings(data.data);
      
    } catch (error) {
      console.log(error);
    }
    console.log(meanings);
  }
  useEffect(()=>{
    dictionaryApi();
  },[word,category]);

  return (
    <div className='App' style={{height:'100vh', backgroundColor:LightMode?"#fff":'#282c34',color:LightMode?'black':'white',transition:'all 0.5s linear',justifyContent:'space-evenly'}}>
      <Container maxWidth='md' style={{display:'flex', flexDirection:'column',height:'100vh'}}>
        <div style={{position:'absolute', top:0, right:15, paddingTop:10}}>
          <span>{LightMode?'Dark':'Light'}Mode</span>
         <PinkSwitch checked={LightMode} onChange={()=>setLightMode(!LightMode)} />
        </div>
        <Header word={word} setWord={setWord} category={category} setCategory={setCategory} LightMode={LightMode}/>
        {meanings&&(<Definitions LightMode=
        {LightMode} word={word} meanings={meanings} category={category}/>)}
      
      </Container>
    </div>
  );
}

export default App;
