const Profile = require("../models/profile");
const Test = require("../models/profile");

module.exports = {
    create,
    new: newTest,
  };

  function create(req, res){

	// What can I log to see the contents of the form?
	// req.body is the contents of the form
	// what the user filled out
	console.log(req.body, " <- req.body in the create function in my testsCtrl")

    Test.create(req.params.id, req.body, {new: true}, function(err, test) {
        test.save();
        res.redirect(`/profile`);
	})
};

  function newTest(req, res) {
        res.render("/tests/new", {
            title: "New Test",
        }
        )};


