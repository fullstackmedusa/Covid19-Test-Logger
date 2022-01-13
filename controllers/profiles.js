const User = require('../models/user');
const {Profile, Test} = require('../models/profile');


module.exports = {
    index,
    edit,
    updateProfile,
    create: createProfile,
    show,
}

function index(req, res){
    console.log(req.user);
    Profile.findById(req.user._id,function(err, profileDocument){
        console.log(profileDocument, "<---- profile document");
        if (!profileDocument){
            Profile.create({name:req.user.name, _id:req.user._id},function(err, profileDoc){
                console.log(profileDoc, "<--profile doc in create")
                res.render("profile/index", {
                    title: "Tests",
                    tests: [],
                    profile: profileDoc,
                })
            })  
            return 
        }
        Test.find({user_id:profileDocument._id}, function(err, testDocuments){
            res.render("profile/index", {
                title: "Tests",
                tests: testDocuments,
                profile: profileDocument,
            })
        })
    });
}

function edit(req, res){
    Profile.findById(req.params.id, function(err, profileDocument) {
        res.render("profile/edit",{
            title: "Edit Profile",
            profile: profileDocument,
        });
    });
}

function updateProfile(req,res){
        Profile.findByIdAndUpdate(req.params.id, {vaccination_status:req.body.vaccination_status, vaccine:req.body.vaccine}, function(){
            res.redirect("/profile")
        });
    }

    function createProfile(req,res){
        Profile.create(req.body, function(err, ProfileDocument){ 
            console.log(ProfileDocument, " <profileDocument");
    })
}

function show(req, res) {
    // console.log(req.params, " < -req.params in the show route")
    const newTest = new Test();
    //   obtain the default date
    const dt = newTest.date_tested;
    // format the date for the value attribute of the input
    // timezone offset of default date
    let timezoneOffset = dt.getTimezoneOffset() * 60000;
    // subtract offset from the default date
    const dateTested = new Date(dt - timezoneOffset).toISOString();
    // render local departure date
      Test.find({ profile: profile._id }, function (err, test) {
        res.render('profile/show', {
          profile,
          test,
          dateTested,
          title: "test details"
        });
      });
    };

  