import db from "../models/index"
import bcrypt from 'bcryptjs';
let handleUserLogin = (email,password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUserEmail(email);
            let userData = {};
            console.log(password);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleid','password'],
                    where: { email: email },
                    raw: true,
                    // exclude: [];
                })
                console.log(user.password)
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    console.log(check);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `OK`;
                        console.log(user);
                        console.log('1');
                       delete user.password;
                        userData.data = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`,
                        userData.data = user
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `user not found`; 
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `your's Email is not  exits`
            } 
            resolve(userData);
        } catch(e) {
            reject(e);
        }
    })
}   

// let compareUserPassword = () => {
//     return new Promise((resolve, reject => {
//         try {
            
//         } catch (e) {
//             reject(e);
//         }
//     }))
// }

let checkUserEmail = (email) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: email
                }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin
}