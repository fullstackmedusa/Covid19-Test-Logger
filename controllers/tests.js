const profile = require('../models/profile');
const { Profile, Test } = require('../models/profile');

module.exports = {
    create,
    new: newTest,
    show,
    delete: deleteTest,
};

// function create(req, res) {

//     // What can I log to see the contents of the form?
//     // req.body is the contents of the form
//     // what the user filled out
//     console.log(req.body, " <- req.body in the create function in my testsCtrl")

//     Test.create({ test_result: req.body.test_result,
//         test_type: req.body.test_type,
//         user_id: req.user._id,
//         date_tested: req.body.date_tested}, function (err, test) {
//             console.log(test._id, "<--test._id");
//         Profile.findOne({user_id:req.user._id}, function(err, profileDoc){
//             profileDoc.tests.push(test);
//             profileDoc.save();
//         });
//         res.redirect("/profile");
//     })
// };

function create(req, res){
	Profile.findById(req.params.id, function(err, profileDocument){
        
        console.log(req.body,"<--- req.body :D) ");
		profileDocument.tests.push(req.body);
	
		profileDocument.save(function(err, doc){

			res.redirect("/profile")
		})
	
	})
}


function newTest(req, res) {
    const newTest = new Test();
    const dt = newTest.date_tested;
    let timezoneOffset = dt.getTimezoneOffset() * 60000;
    // subtract offset from the default date
    const testDate = new Date(dt - timezoneOffset).toISOString();
    Profile.findById(req.params.id, function(err, profileDocu){
        res.render("tests/new", {
            title: "New Test",
            testDate,
            profile: profileDocu,
        })
    })
};

function show(req, res) {
    Profile.findOne({'tests._id':req.params.id,user_id: req.user._id}, function (err, profile) {
        profile.tests.find(function(test){
            test._id === req.params.id;
        res.render('tests/show', {
            test,
            title: "test details"
        });
    });
});
}



function deleteTest(req, res, next) {
    console.log("testing delete fctn")
    Profile.findOne({"tests._id":req.params.id, user_id: req.user._id}, function (err, profileDoc) {
        console.log(profileDoc, "<--- profileDoc");
        profileDoc.tests.pull({_id:req.params.id});
        
        console.log(profileDoc.tests, `<-- test we wanna delete`);

        profileDoc.save(function (err) {
            res.redirect("/profile"); 
        });

    });
}