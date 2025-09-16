
const loginVolunteer = (req, res) => {
  console.log('VOLUNTEER::: ', req.body)

  res.send('ok')
}

module.exports = {
  loginVolunteer
}