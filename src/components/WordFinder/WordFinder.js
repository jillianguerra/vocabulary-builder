import { useState } from "react"
import styles from './WordFinder.module.scss'
export default function ({ findWord }) {
  const [formData, setFormData] = useState({
    searchTerm: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getWord(formData.searchTerm);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="searchTerm"
          type="search"
          onChange={handleChange}
          value={formData.searchTerm}
        />
        <input className="button" type="submit" value="Submit" />
      </form>
    </>
  );
}