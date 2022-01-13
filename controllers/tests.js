const { Profile, Test } = require('../models/profile');

module.exports = {
    create,
    new: newTest,
    show,
    delete: deleteTest,
};

function create(req, res) {

    // What can I log to see the contents of the form?
    // req.body is the contents of the form
    // what the user filled out
    console.log(req.body, " <- req.body in the create function in my testsCtrl")

    Test.create({ test_result: req.body.test_result, test_type: req.body.test_type, user_id: req.user._id, date_tested: req.body.date_tested}, function (err, test) {
        test.save();
        res.redirect("/profile");
    })
};


function newTest(req, res) {
    const newTest = new Test();
    const dt = newTest.date_tested;
    let timezoneOffset = dt.getTimezoneOffset() * 60000;
    // subtract offset from the default date
    const testDate = new Date(dt - timezoneOffset).toISOString();
    res.render("tests/new", {
        title: "New Test",
        testDate,
    }
    )
};

function show(req, res) {
    Test.findById(req.params.id, function (err, test) {
        res.render('tests/show', {
            test,
            title: "test details"
        });
    });
};




function deleteTest(req, res, next) {
    Profile.findById(req.user._id, function (err, profileDoc) {

        profileDoc.test.pull({ user_id:profileDoc._id});
        
        console.log(profileDoc.tests, `<-- test we wanna delete`);

        profileDoc.save(function (err) {
            res.redirect("/show"); 
        });

    });
}