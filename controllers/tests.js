const profile = require('../models/profile');
const { Profile, Test } = require('../models/profile');

module.exports = {
    create,
    new: newTest,
    show,
    delete: deleteTest,
};

function create(req, res) {
    Profile.findById(req.params.id, function (err, profileDocument) {
        profileDocument.tests.push(req.body);
        profileDocument.save(function (err, doc) {
            res.redirect("/profile")
        })
    })
}


function newTest(req, res) {
    const newTest = new Test();
    const dt = newTest.date_tested;
    let timezoneOffset = dt.getTimezoneOffset() * 60000;
    const testDate = new Date(dt - timezoneOffset).toISOString();
    Profile.findById(req.params.id, function (err, profileDocu) {
        res.render("tests/new", {
            title: "New Test",
            testDate,
            profile: profileDocu,
        })
    })
};

function show(req, res) {
    Profile.findOne({ 'tests._id': req.params.id, user_id: req.user._id }, function (err, profile) {
        profile.tests.find(function (test) {
            test._id === req.params.id;
            res.render('tests/show', {
                test,
                title: "test details"
            });
        });
    });
}



function deleteTest(req, res, next) {
    Profile.findOne({ "tests._id": req.params.id, user_id: req.user._id }, function (err, profileDoc) {
        profileDoc.tests.pull({ _id: req.params.id });
        profileDoc.save(function (err) {
            res.redirect("/profile");
        });
    });
}