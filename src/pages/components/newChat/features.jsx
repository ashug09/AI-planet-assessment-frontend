import React from 'react'
import answers from "../../assets/images/answers.png"
import chatbot from "../../assets/images/chatbot.png"
import pdf from "../../assets/images/pdf.png"
import Image from 'next/image'
export default function Features() {
  return (
    <div className='flex justify-between h-8 px-20'>
       <div>
        <Image src={pdf} className="" height={200} width={200} />
        <p className='w-36 m-2 capitalize text-gray-400 text-center'>import and upload your document to AI Planet</p>
       </div>

       <div>
        <Image src={chatbot} className="" height={200} width={200} />
        <p className='capitalize m-2 text-gray-400 text-center'>Chat with AI Planet</p>
       </div>

       <div>    
        <Image src={answers} className="" height={200} width={200} />
        <p className='capitalize m-2 text-gray-400 text-center'>Get answers from AI Planet</p>       
       </div>

    </div>
  )
}
