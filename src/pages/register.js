import Link from 'next/link';
import { app } from './firebaseConfig';
import { useState } from 'react';
import{getAuth,createUserWithEmailAndPassword,} from 'firebase/auth'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Register(){
    const auth= getAuth();
    const router =useRouter();
    const[email,setEmail] =useState('');
    const[password,setPassword] = useState('');

    const signUp =() =>{
        createUserWithEmailAndPassword(auth, email,password)
        .then((response)=>{
            console.log(response.user)
            sessionStorage.setItem('Token',response.user.accessToken)
            router.push('/home')
        })
        
    }
 
    useEffect(()=>{
        let token= sessionStorage.getItem('Token')
        if(token){
            router.push('/home')
        }
    },[])

    return(
        <div className="w-full min-h-screen flex justify-center items-center bg-white-900">
            <div>
                <div className="flex justify-center items-center pb-10">
                    <h1 className="font-mono font-bold text-4xl text-gray-900">Register</h1>
                </div>
                <div className="relative w-[380px] h-[480px] bg-transparent-400 rounded-lg z-10 p-5">
                    <form>
                        <h2 className="text-2xl font-bold font-mono text-gray-900 text-center mt-3 mb-5">Sign up</h2>
        
                    <div className="relative flex flex-col mb-2 mt-8">
                        <input type="email" 
                            id="email" 
                            placeholder="          Enter your email"
                            className="relative z-10 border-0 border-b-2 border-gray-900 h-10 bg-transparent
                          text-gray-400 font-mono outline-none px-2 peer" 
                          onChange={(event) =>setEmail(event.target.value)} 
                          value={email}

                        />
                        <i className="bg-white-900 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom
                        transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]"
                        />
                        <label className="peer-focus:font-medium absolute text-base font-mono duration-500 transform 
                        -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-700
                        text-gray-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-placeholder-shown:text-gray-900 peer-focus:scale-75 peer-focus:-translate-y-8">Email</label>
                    </div>
                    <div className="relative flex flex-col mb-2 mt-8">
                        <input type="password" 
                            id="password" 
                            placeholder="          Create a Password "
                            className="relative z-10 border-0 border-b-2 border-gray-900 h-10 bg-transparent
                          text-gray-400 font-mono outline-none px-2 peer" 
                          onChange={(event) =>setPassword(event.target.value)}
                          value={password}
                        />
                        <i className="bg-white-900 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom
                        transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]"
                        />
                        <label className="peer-focus:font-medium absolute text-base font-mono duration-500 transform 
                        -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-700
                        text-gray-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-placeholder-shown:text-gray-900 peer-focus:scale-75 peer-focus:-translate-y-8">Password</label>
                    </div>
                    <p className="font-mono text-gray-900 text-xs">Must be at least 8 characters.</p>

                    <button type="submit" 
                        className="py-3 mt-10 font-mono text-white bg-gray-900 w-full 
                        rounded hover:bg-gray-700 hover-scale-105 duration-300"
                        onClick={signUp}
                        >Register</button>
                    
                    <h2 className="flex justify-center items-center mt-10 text-sm text-gray-900 font-mono">
                        Already have an account? 
                        <Link 
                        className="text-blue-900 pl-1" 
                        href="./login">Log in</Link>
                    </h2>
                 
                    </form>
                </div>
            </div>
                
            
        </div>
    )
}