import React,{FC} from 'react'
type P ={}
const About:FC<P>=()=>{
  return <div className="text-primary max-w-5xl mx-auto h-screen flex flex-col gap-4  justify-center text-center ">
    
    <h1 className='font-bold text-xl sm:text-5xl tracking-widest'>About Us</h1>
    <p className='text-xl'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa eligendi earum ab quidem dolore? Voluptate omnis natus fugiat autem labore. </p>
  
  </div>
}
export default About;