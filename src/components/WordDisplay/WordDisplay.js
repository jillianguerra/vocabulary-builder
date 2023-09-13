import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function WordDisplay({ word, handleAddWord }) {
    const [newWord, setNewWord] = useState({
        word: "",
        partOfSpeech: "",
        definition: "",
        example: "",
        synonyms: []
    });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function handleUpdates(value) {
   return setNewWord((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function handleSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newVocab = { ...word };
 
   await fetch('/api/vocab/new', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(word),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", email: "", password: "" });
   navigate("/");
 }
  const loading = () => (
    <div>
      <p>Searching Dictionary</p>
    </div>
  );
  const loaded = () => (
    <div className="searched-word">
      {word.map((item) => (
        <>
          <h2>{item.word}</h2>
          <p>{item.phonetic}</p>
          <div className="meanings">
            {item.meanings.map((meaning) => (
              <>
                <h3>{meaning.partOfSpeech}:</h3>
                <ul>
                  {meaning.definitions.map((def) => (
                    <li key={def.definition}>
                      <p>Definition: {def.definition}</p>
                      <p>
                        Example: <em>{def.example}</em>
                      </p>
                      <p>
                        Synonyms:
                        {def.synonyms.map((syn) => (
                          <em> {syn} </em>
                        ))}
                      </p>
                      <input
                        type="button"
                        name="add-word"
                        value="Add Word"
                        onClick={(e) => {
                          handleAddWord(
                            item.word,
                            meaning.partOfSpeech,
                            def.definition,
                            def.example,
                            def.synonyms
                          );
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </>
            ))}
          </div>
        </>
      ))}
    </div>
  );
  return word ? loaded() : loading();
}
