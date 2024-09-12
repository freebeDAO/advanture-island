"use client";
import React, { useRef, useState } from 'react';

function TalkableComponent() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [tetxVal, setTextVal] = useState("");

  const clickHandler = () => {
    if (tetxVal === "") return
    dialog.current?.showModal();
  }

  const onChange = (event: any) => {
    setTextVal(event.target.value);
  }

  const closeModal = () => {
    dialog.current?.close();
  }

  return (
    <div onClick={clickHandler}>
      <div>This is a TalkableComponent</div>
      <input type="text" className='border-2 border-solid border-gray-500 rounded m-4' onChange={onChange} />
      <dialog id='modal' ref={dialog} style={{ backgroundColor: "transparent" }} onClose={closeModal}>
        <div className='w-[360px] h-[240px] rounded-lg bg-white p-[16px] flex justify-between flex-col'>
          <div className='header h-[48px]'>Dialog Header</div>
          <div className='my-[12px] flex-1'>
            {tetxVal}
          </div>
          <div className='flex justify-end'>
            <button className='h-[40px]' onClick={closeModal}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default TalkableComponent;