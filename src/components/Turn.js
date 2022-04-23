const Turn = ({ player }) => {
  const elemColor = player === 'white' ? 'white' : 'black'

  return (
    <div className="turn">
      <h4>Turn</h4>
      <div id="player-turn-circle" style={{ background: elemColor }}></div>
    </div>
  )
}

export default Turn