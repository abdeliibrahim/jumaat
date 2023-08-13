const MosqueDetails = ({ mosque }) => {
return (
    <div className="mosque-details">
        <h4>{mosque.title}</h4>
        <p><strong>Address: </strong>{mosque.address}</p>
    </div>
)
}

export default MosqueDetails