import {userType} from "src/server/dataType/users";

const { models } = require('../db/index.ts');
const {users} = models;

function getAll() {
    return users.findAll();
}

function createUser(body: { address: string; createTime: string; updateTime: string }) {
    return models.users.create(body);
}

function getUserList (where:{address: string}) {
    return users.findAll({where});
}

function remove(address: string) {
    return models.users.destroy({
        where: {
            address: address
        }
    });
}

module.exports = {
    getAll,
    createUser,
    getUserList,
};
