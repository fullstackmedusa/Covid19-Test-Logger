const {Profile, Test} = require('../models/profile');

module.exports = {
    create,
    new: newTest,
    show,
  };

  function create(req, res){

	// What can I log to see the contents of the form?
	// req.body is the contents of the form
	// what the user filled out
	console.log(req.body, " <- req.body in the create function in my testsCtrl")

    Test.create({test_result:req.body.test_result, test_type: req.body.test_type, user_id:req.user._id}, function(err, test) {
        test.save();
        res.redirect("/profile");
	})
};


  function newTest(req, res) {
        res.render("tests/new", {
            title: "New Test",
        }
        )};

        function show(req, res) {
              Test.findById(req.params.id , function (err, test) {
                res.render('tests/show', {
                  test,
                  title: "test details"
                });
              });
            };
        
          

