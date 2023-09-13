export default function WordListDisplay({ wordList, handleDeleteWord }) {
    const loading = () => (
      <div>
        <p>Add words to list...</p>
      </div>
    );
    const showList = () => (
      <>
        <h1>Vocabulary List</h1>
        <ul className="word-list-parent">
          {wordList.map((word) => (
            <li className="word-list" key={`word.id`}>
              <div>
                <b>{word.word}:</b> <em>{word.partOfSpeech}</em>{" "}
              </div>
              <div>
                <p>Definiton: {word.definition}</p>
                <p>Example: {word.example}</p>
                <p>
                  {" "}
                  Synonyms:
                  {word.synonyms.map((syn) => (
                    <em> {syn} </em>
                  ))}
                </p>
              </div>
              <button onClick={handleDeleteWord(word.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </>
    );
    return wordList && wordList.length ? showList() : loading();
  }
  