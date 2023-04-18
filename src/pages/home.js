import Link from 'next/link';
import ABoard from './addboard';
import { useState } from 'react';
import { app } from './firebaseConfig';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home(){
    let router = useRouter()
    useEffect(()=>{
        let token= sessionStorage.getItem('Token')
        if(!token){
            router.push('/login')
        }
    },[])

    const [showInputs, setShowInputs] = useState(false);
  const [inputTitle, setinputTitle] = useState('');
  const [inputDescription, setinputDescription] = useState('');
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    if (inputTitle && inputDescription) {
      setItems((prevItems) => [...prevItems,{ inputTitle, inputDescription },]);
      setinputTitle('');
      setinputDescription('');
      setShowInputs(false);
    }
  };

    const handleCancel = () => {
        setShowInputs(false);
        setinputTitle('');
        setinputDescription('');
    };
    const logout = () => {
        sessionStorage.removeItem('Token')
        router.push('/login')
      }
    return(
        <div>
            <div className="bg-white pb-16 border-b-2 border-gray-900">
                <div className="p-5 ml-10 float-left text-xl text-gray-900 font-mono font-semibold">
                    <h1 className="">Home</h1>
                </div>
                <div className="p-5 mr-10 float-right ">
                    <Link className="p-1 text-lg text-gray-900 font-mono 
                    hover:bg-gray-900 hover:text-gray-400 rounded" href="./login"
                    onClick={logout}>Logout</Link>
                </div>
            </div>
            <div>
                <div className="p-5 pt-16 ml-10">
                    <h1 className="text-2xl font-mono font-extrabold text-gray-900">Boards</h1>
                </div>
            </div>
            <div>
                <ABoard/>
            </div>
        </div>   
    )
}