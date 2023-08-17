import { useEffect, useState } from "react"

// components
import MosqueDetails from '../components/mosqueDetails'
const Results = () => {
    const [mosques, setMosques] = useState(null)

    useEffect(() => {
       const fetchMosques = async () => {
        const response = await fetch('/api/mosques')
        const scrape = await fetch(
            '/api/mosques/scrape?zipcode=95035')
        const scrapeJSON = await scrape.json()
        console.log(scrapeJSON)
        const json = await response.json()

        if (response.ok) {
            setMosques(json)
        }
       }   
       fetchMosques()  
    }, [])

    return (
        <div className="results">
           <div className="mosques">
            {mosques && mosques.map((mosques) => (
                <MosqueDetails key = {mosques._id} mosque = {mosques} />
            ))}
           </div>

        </div>
    )
    }
    export default Results