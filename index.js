
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/* BEGIN - create routes here */
// * GET /
app.get("/", (req, res) => {
  res.send("hello world");
});

//  * GET /users
app.get('/users', (req, res) => res.json(users));

//  * GET /users/1
app.get('/users/:id', (req, res) => {
  // returs results from id
  res.json(users.filter(users => users._id === parseInt(req.params.id)))
});

//   * POST /users
app.post('/users', (req, res) => {
	users.push({ // adds new user
		_id: users.length + 1, // create next id
		name: req.body.name, // add name
		occupation: req.body.occupation, // add occupation
		avatar: req.body.avatar // add avatar
	});
	res.json(users[users.length -1]); // confirm update
});

//   * PUT /users/1
app.put('/users/:id', function (req, res) {
  let putUser = req.body; // local variable for body
  users.forEach(user => { // loops throguh users
    // tests if the id request = this interation
    if(user._id === parseInt(req.params.id)) { 
      // update name, if entered
      user.name = putUser.name ? putUser.name : user.name;
      // update occupation, if entered
      user.occupation = putUser.occupation ? putUser.occupation  : user.occupation;
      
      res.json({msg: 'User updated', user}); //confirm update
    }
})
});

//   * DELETE /users/1
app.delete('/users/:id', (req, res) => {
  // deletes the user passedddd
  res.json(users.filter(user => user._id !== parseInt(req.params.id)))
});

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))