const MosqueDetails = ({ mosque }) => {
return (
    <div className="mosque-details">
        <a href={mosque.gUrl} target="_blank">{mosque.title}</a>
        <p><strong>Address: </strong>{mosque.address}</p>
    </div>
)
}

export default MosqueDetails