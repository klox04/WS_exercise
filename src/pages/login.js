import Link from 'next/link';
import { app } from './firebaseConfig';
import { useState } from 'react';
import{getAuth,signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Register(){
    const auth= getAuth();
    const googleProvider = new GoogleAuthProvider();
    const router =useRouter();
    const[email,setEmail] =useState('');
    const[password,setPassword] = useState('');

    const signUp = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log(response.user)
                sessionStorage.setItem('Token', response.user.accessToken);
                router.push('/home')
            })
    }
    const sigUpWithGoogle =()=>{
        signInWithPopup(auth,googleProvider)
        .then((response)=>{
            console.log(response.user)
            sessionStorage.setItem('Token',response.user.accessToken)
            router.push('/home')
        })
        .catch(function (error) {
            console.error(error);
          })

    }
    useEffect(()=>{
        let token= sessionStorage.getItem('Token')
        if(token){
            router.push('/home')
        }
    },[])


    

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-white-900">
            <div>
                <div className="flex justify-center items-center pb-10">
                    <h1 className="font-mono font-bold text-5xl text-gray-900">Scrum Board</h1>
                </div>
                <div className="relative w-[380px] h-[420px] bg-transparent-400 rounded-lg z-10 p-5">
                <form >
                    <h2 className="text-2xl font-bold font-mono text-gray-900 text-center mt-3 mb-5">Login</h2>
                    <div className="relative flex flex-col mb-2">
                        <input type="text" 
                            id="username"
                            placeholder=" "
                            onChange={(event) =>setEmail(event.target.value)} 
                            value={email}
                            className="relative z-10 border-0 border-b-2 
                          border-gray-900 h-10 bg-transparent text-gray-400 font-mono outline-none px-2 peer 
                            border-red-500: border-gray-300"
                        />
                        <i className="bg-white-900 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom
                        transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]"
                        />
                        <label className="peer-focus:font-medium absolute text-base font-mono duration-500 transform 
                        -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-700
                        text-gray-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-placeholder-shown:text-gray-900 peer-focus:scale-75 peer-focus:-translate-y-8">Username</label>
                    </div>
                    
                    <div className="relative flex flex-col mt-10 mb-2">
                        <input type="password"
                            id="password"
                            placeholder=" "
                            onChange={(event) =>setPassword(event.target.value)} 
                          value={password}
                            className="relative z-10 border-0 border-b-2 
                          border-gray-900 h-10 bg-transparent text-gray-400 font-mono outline-none px-2 peer
                           border-red-500: border-gray-300"
                        />
                        <i className="bg-white-900 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom
                        transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]"
                        />
                        <label className="peer-focus:font-medium absolute text-base font-mono duration-500 transform 
                        -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-700
                        text-gray-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-placeholder-shown:text-gray-900 peer-focus:scale-75 peer-focus:-translate-y-8">Password</label>
                    </div>
                  
                    
                    <button type="submit"
                        className="py-3 mt-10 font-mono text-white bg-gray-900 w-full rounded hover:bg-white-700
                        hover-scale-105 duration-300"
                        onClick={signUp}>LOGIN</button>
                    
                    <h2 className="flex justify-center items-center mt-10 text-sm text-gray-900 font-mono">
                        Don't have an account?
                        <Link 
                            className="text-blue-900 ml-1" 
                            href="./register">Sign up</Link>
                    </h2>

                    <button type="button" class="py-2 px-4 flex justify-center items-center  bg-gray-900 hover:bg-gray-900 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    onClick={sigUpWithGoogle}>
              <svg width="20" height="20" fill="currentColor" class="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
             </path>
              </svg>
            Sign in with Google
              </button>
                </form>
            </div>
            </div>
        </div>
    )
}