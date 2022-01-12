const User = require('../models/user');
const Profile = require('../models/profile');

module.exports = {
    index,
    edit,
    updateProfile,
}

function index(req, res){
    Profile.findOne({},function(err, profileDocument){
        res.render('profile/index',{
            title:"Profile",
            profile: profileDocument,
        });
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
        