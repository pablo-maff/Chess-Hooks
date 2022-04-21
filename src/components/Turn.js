const Turn = ({ player }) => {
  const color = player === 'white' ? 'white' : 'black'

  return (
    <>
      <h3>Turn</h3>
      <div id="player-turn-box" style={{ background: color }} />
    </>
  )
}

export default Turn