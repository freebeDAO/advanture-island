import React, {useEffect, useState} from 'react';
import AxisModal from '../axisModal';
import useAxisStore from "src/store/axis/use";

const AxisTable = () => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedAxis, setSelectedAxis] = useState(null);

    const handleEdit = (axis) => {
        setSelectedAxis(axis);
        setIsEditOpen(true);
    };
    const {
        axisList,
        getAll,
        create,
        update,
        remove
    } = useAxisStore()
    useEffect(() => {
        getAll()
    }, [])
    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        x
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        y
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Options
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {axisList.length ? (
                    axisList.map((value) => (
                        <tr key={value.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{value.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{value.x}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{value.y}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => remove(value.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                                >
                                    删除
                                </button>
                                <button
                                    onClick={() => handleEdit(value)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    修改
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="px-6 py-4 text-center">
                            No data available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* 编辑弹框 */}
            {isEditOpen && selectedAxis && (
                <AxisModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    axis={selectedAxis}
                />
            )}
        </div>
    );
};

export default AxisTable;
