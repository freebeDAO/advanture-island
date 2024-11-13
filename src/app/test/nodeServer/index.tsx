"use client"
import axios from "axios"
import qs from "qs"

/**
 * weixin: 天蚕土豆丝，任务： 创建一个放大缩小的组件，使目标对象可以放大缩小
 */
export default function Home() {
  function get() {
    axios
      .get("http://127.0.0.1:8888/api/getPoint/1")
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function add() {
    axios({
      method: "post",
      url: "http://127.0.0.1:8888/api/addPoint",
      data: qs.stringify({ x: 16, y: 18 }),
    })
  }

  function edit() {
    axios({
      method: "put",
      url: "http://127.0.0.1:8888/api/editPoint",
      data: qs.stringify({ x: 16, y: 19, id: 1 }),
    })
  }

  function deletePoint(id) {
    axios({
      method: "delete",
      url: "http://127.0.0.1:8888/api/deletePoint/" + id,
    })
  }
  return (
    <div className="min-h-screen p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div
        className="cursor-pointer text-blue-600 text-[16px]"
        onClick={() => {
          get()
        }}
      >
        get
      </div>
      <div
        className="cursor-pointer text-blue-600 text-[16px]"
        onClick={() => {
          add()
        }}
      >
        add
      </div>
      <div
        className="cursor-pointer text-blue-600 text-[16px]"
        onClick={() => {
          edit(1)
        }}
      >
        edit
      </div>
      <div
        className="cursor-pointer text-blue-600 text-[16px]"
        onClick={() => {
          deletePoint(7)
        }}
      >
        deletePoint
      </div>
    </div>
  )
}
