import React from 'react';
import './Definitions.css';
const Definitions = ({LightMode,word,category,meanings}) => {
  return (
    <div className='meanings'>
      {meanings[0] && word && category==='en' && (
        <audio src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio} style={{backgroundColor:"#fff", borderRadius:'10px'}} controls>
          Your Browser doesnt support audio element
        </audio>
      )}
      {word===''?(<span className='subtitle'>Start by typing a word in search</span>):(
        meanings.map((mean)=>(
         mean.meanings.map((item)=>(
          item.definitions.map((def)=>(
            <div className='singleMean' style={{backgroundColor:LightMode?'#3b5360':
            'white',color: LightMode?"white":'black'}}>
              <b>{def.definition}</b>
              <hr style={{backgroundColor:'black',width:'100%'}}></hr>
              {def.example&&(
                <span>
                  <b>Example:</b>
                  {def.example}
                </span>
              )}
              {def.synonyms&&(
                <span>
                <b>Synonyms:</b>
                {def.synonyms.map((s)=>`${s},`)}
              </span>
              )}
            </div>
          ))
         ))
        ))
      )}
    </div>
  );
}

export default Definitions;
