export default async function getWord(searchTerm) {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
      );
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }