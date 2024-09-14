import {axisCreateType, axisUpdateType} from "src/server/dataType/axis";

const {models} = require('../db/index.ts');
const {axis} = models;

function getAxisAll() {
    return axis.findAll();
}

function createAxis(body: axisCreateType) {
    return axis.create(body);
}

function getAxisList(where: { id: number, x: number, y: number }) {
    return axis.findAll({where});
}

function removeAxis(id: number) {
    return axis.destroy({
        where: {
            id
        }
    });
}

const updateAxis = (params: axisUpdateType, where: {id: string}) => {
    return axis.update(
        {...params},
        {where});
}
const getAxisById = async (id: number) => {
    return await axis.findByPk(id);
}
module.exports = {
    getAxisAll,
    createAxis,
    getAxisList,
    removeAxis,
    updateAxis,
    getAxisById
};
