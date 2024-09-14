import {useSelector, useDispatch} from 'react-redux';
import slice from './slice';
import {axisListAll, removeAxis, updateAxis, createAxis} from './api'
import {axisBaseType, axisType} from "src/server/dataType/axis";
const {setAxisList} = slice.actions;
const getAxis = (state) => state.axis;

export default function useAxisStore() {
    const axis = useSelector(getAxis);
    const dispatch = useDispatch();
    const getAll = async() => {
        const data = await axisListAll();
        dispatch(setAxisList(data));
    }
    const create = async (param: axisBaseType) => {
        await createAxis(param);
        const data = await axisListAll();
        dispatch(setAxisList(data));
    }
    const update = async (param: axisType) => {
        await updateAxis(param);
        const data = await axisListAll();
        dispatch(setAxisList(data));
    }
    const remove = async (id: number) => {
        await removeAxis(id);
        const data = await axisListAll();
        dispatch(setAxisList(data));
    }
    return {
        ...axis,
        getAll,
        create,
        update,
        remove
    }
}
