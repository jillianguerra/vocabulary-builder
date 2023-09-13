import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './WordSearchPage.module.scss'
import * as getWord from '../../utilities/dictionary-api'
import * as vocabAPI from '../../utilities/vocab-api'
import * as listAPI from '../../utilities/list-api'
import WordDisplay from "../../components/WordDisplay/WordDisplay"
import WordFinder from "../../components/WordFinder/WordFinder"
import WordListDisplay from "../../components/WordListDisplay/WordListDisplay"

export default function SearchWord() {
  const [wordList, setWordList] = useState([]);
  const [word, setWord] = useState(null);

  useEffect(function () {
    async function getList() {
      const data = listAPI.getCurrentList()
      setWordList(data)
    }
    getList()
  }, []);

  const handleAddWord = async (
    word,
    partOfSpeech,
    definition,
    example,
    synonyms
  ) => {
    const newWord = {
      word: word,
      partOfSpeech: partOfSpeech,
      definition: definition,
      example: example,
      synonyms: synonyms
    }
    vocabAPI.createVocab(newWord)
    const data = listAPI.getCurrentList()
    setWordList(data)
  };
  const handleDeleteWord = (wordId) => {
    vocabAPI.deleteVocab(wordId)
    const data = listAPI.getCurrentList
    setWordList(data)
  }
  const findWord = async (searchTerm) => {
    const data = getWord(searchTerm)
    setWord(data)
  };
  return (
    <>
      <nav>
        <WordFinder findWord={findWord} />
      </nav>
      <main>
        <WordDisplay word={word} handleAddWord={handleAddWord} />
      </main>
      <aside>
        <WordListDisplay
            wordList={wordList}
            handleDeleteWord={handleDeleteWord}
        />
      </aside>
    </>
  );
}