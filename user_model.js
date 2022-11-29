const {readFileSync} = require('fs');
let loadUser = () => {
    let users = JSON.parse(readFileSync('data.json'));
    // console.log(users);
    return users;
}

// loadUser();
module.exports = {loadUser};