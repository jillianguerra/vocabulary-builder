import { useEffect, useState } from 'react';
import UserForm from '../components/UserForm'
import LoginForm from '../components/LoginForm'
import WordDisplay from '../components/WordDisplay';
import WordSearch from '../components/WordSearch';
import WordListDisplay from '../components/WordListDisplay';

export default function Home(props) {
	const [wordList, setWordList] = useState([]);
	const [word, setWord] = useState(null);
	const [user, setUser] = useState(null)
	useEffect(()=> {
        (
            async () => {
                try{
                    const res = await fetch('/api/user/')
                    const data = await res.json()
                    setUser(data)
                } catch (error) {
                    console.error(error)
                }
            }
        )()
    }, [])
	const getWord = async (searchTerm) => {
		try {
			const response = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
			);
			const data = await response.json();
			setWord(data);
		} catch (error) {
			console.error(error);
		}
	};
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
		};
		try {
			await fetch('/api/vocab/new', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newWord),
			})
		} catch (error) {
			window.alert(error)
			return
		}
	};
	const handleDeleteWord = (wordId) => {
		setWordList(wordList.filter((t) => t.id !== wordId));
	};
	
	
	return (
		<div className="HomePage">
			<center>
				<h1>This is a application for building vocabulary lists!</h1>
				{user
					? (<>
						<h2>Create a User to get started!</h2>
						<UserForm createUser={createUser} />
						<LoginForm />
					</>)
					: (<>
					<h2>Hi {user.name}! Search for a word below:</h2>
						<WordSearch getWord={getWord} />
						<WordDisplay word={word} handleAddWord={handleAddWord} />
						<WordListDisplay wordList={wordList} handleDeleteWord={handleDeleteWord} />
					</>)}
			</center>
		</div>
	)
}
