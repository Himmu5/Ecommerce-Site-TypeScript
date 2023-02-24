import React,{FC} from 'react'
import { ImMap } from 'react-icons/im'
import { MdOutlineMailOutline ,MdPhoneEnabled } from 'react-icons/md'
import Button from './Button/Button'
import Input from './Input/Input'

type P ={}
const Contact:FC<P>=()=>{
  return <div className='text-primary my-10 sm:flex  max-w-6xl gap-5 mx-auto'>
    <div className='sm:w-1/2 flex flex-col gap-5 justify-center p-4'>
        <h1 className='text-xl font-bold sm:text-5xl  '>Say Hello.</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
        <div className='pt-1 bg-red-500 '></div>
        <div className='flex gap-2'>
            <ImMap size={25}/>
            <p>212 7th St SE, Washington, DC 20003, USA</p>
        </div>
        <div className='flex gap-2'>
            <MdOutlineMailOutline size={25}/>
            <p>info@example.com</p>
        </div>
        <div className='flex gap-2'>
            <MdPhoneEnabled size={25}/>
            <p>123-456-7890/91</p>
        </div>
    </div>

    <div className='w-full '>

        <form action="" className='flex flex-col gap-4 p-5 border rounded-md bg-white m-4'>
            <h1 className='text-xl sm:text-4xl font-bold '>Ask Your Queries</h1>
            <Input type="text" placeholder="Your Email" />
            <Input type={"text"} placeholder={"Subject"} />
            <textarea  className='border px-3 py-2' placeholder='Message' cols={30} rows={8}  ></textarea>
            <Button extraClass='self-start'>SEND MESSAGE</Button>
        </form>

    </div>


  </div>
}
export default Contact;