import { useEffect, useState } from "react"
import {PropagateLoader} from 'react-spinners'
// components
import MosqueDetails from '../components/mosqueDetails'
import {zipcode} from '../components/zipUtility'

const Results = () => {
    const [mosques, setMosques] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
       const fetchMosques = async () => {
        setLoading(true)
       
        // const zipcode = "95035"
        const scrape = await fetch(
            '/api/mosques/scrape?zipcode=' + zipcode)
        const scrapeJSON = await scrape.json()
        console.log(scrapeJSON)
        await fetch('/api/mosques/clear', {
        method: 'POST',
      });

        
        const postResponse = await fetch('/api/mosques', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scrapeJSON)
        });

        if (!postResponse.ok) {
            throw new Error('Error posting scraped data');
        }

        const response = await fetch('/api/mosques')
        const json = await response.json()

        if (response.ok) {
            setLoading(false)
            setMosques(json)
        }
       }   
       fetchMosques()  
    }, [])

    return (
        <div className="results">
            {loading ? (
                <div className="loader">
                    <PropagateLoader color="#004225" />
                </div>
            ) : (
           <div className="mosques">
            {mosques && mosques.map((mosques) => (
                <MosqueDetails key = {mosques._id} mosque = {mosques} />
            ))}
           </div>
            )}
        </div>
    )
    }
    export default Results