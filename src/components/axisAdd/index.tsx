import React, {useState} from "react";
import useAxisStore from "src/store/axis/use";

const AxisAdd = () => {
    const {
        create,
    } = useAxisStore()
    const [x, setX] = useState<String>();
    const [y, setY] = useState<String>();
    const handleAddAxis = () => {
        if (x && y)
            create({
                x: Number(x),
                y: Number(y)
            })
        setX('');
        setY('');
    }
    return (
        <div className="mb-6 p-4 shadow-md rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">x</label>
                    <input
                        value={x}
                        type="number"
                        onChange={(e) => {
                            if (e.target.value === '' || !isNaN(Number(e.target.value)))
                                setX(e.target.value);
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">y</label>
                    <input
                        value={y}
                        type="number"
                        onChange={(e) => {
                            if (e.target.value === '' || !isNaN(Number(e.target.value)))
                                setY(e.target.value);
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <button
                onClick={handleAddAxis}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                添加
            </button>
        </div>
    )
}
export default AxisAdd
