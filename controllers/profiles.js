const User = require('../models/user');
const Profile = require('../models/profile');

module.exports = {
    index
}

function index(req, res){
    Profile.findOne({},function(err, profileDocument){
        res.render('profile/index',{
            title:"Profile",
            profile: profileDocument,
        });
    });
    
}