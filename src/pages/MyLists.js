import { useState, useEffect } from 'react'

export default function MyLists(props){
    const [lists, setLists] = useState([])
    useEffect(()=> {
        (
            async () => {
                try{
                    const res = await fetch('/api/lists/userlists')
                    const data = await res.json()
                    setLists(data)
                } catch (error) {
                    console.error(error)
                }
            }
        )()
    }, [])
    return(
        <>
            {
                lists.length ?
                <>
                {lists.map(list => <div key={list.title}>{list.title}</div>)}
                </> :
                <h1>You don't have any vocabulary lists yet</h1>
            }
        </>
    )
}