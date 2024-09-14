import React, {useState} from 'react';
import useAxisStore from "src/store/axis/use";
import {axisType} from "src/server/dataType/axis";

const AxisModal = ({ isOpen, onClose, axis }: {isOpen: boolean, onClose: ()=>void, axis: axisType}) => {
    const [x, setX] = useState<string>(axis.x.toString());
    const [y, setY] = useState<string>(axis.y.toString());
    const {
        update,
    } = useAxisStore()
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Edit Axis</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">x</label>
                    <input
                        value={x}
                        type="number"
                        onChange={(e) => {
                            if (e.target.value === '' || !isNaN(Number(e.target.value))) setX(e.target.value);
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">y</label>
                    <input
                        value={y}
                        type="number"
                        onChange={(e) => {
                            if (e.target.value === '' || !isNaN(Number(e.target.value))) setY(e.target.value);
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            update({x, y, id: axis.id});
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AxisModal;
