import { useState } from 'react';

export default function addBoard(){
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
    
    return(
      <div>
        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-100 border border-gray-400 rounded-xl mb-10">
                {!showInputs && (
                  <button
                    className="w-[300px] h-[80px] p-3 text-center text-3xl font-bold font-mono text-gray-900 rounded-md hover:bg-white-900 hover:text-gray-400"
                    onClick={() => setShowInputs(true)}
                  >
                    +
                  </button>
                )}
                {showInputs && (
                  <div className="mx-3 my-3">
                    <input
                      type="text"
                      value={inputTitle}
                      onChange={(e) => setinputTitle(e.target.value)}
                      className="w-full p-2 mb-5 text-md font-mono border border-gray-400 rounded-md"
                      placeholder="Board Title"
                    />
                    <textarea
                      type="text"
                      value={inputDescription}
                      onChange={(e) => setinputDescription(e.target.value)}
                      className="w-full p-2 pb-16 text-md font-mono border border-gray-400 rounded-md"
                      placeholder="Enter a description..."
                    />
                    <div className="flex my-5">
                      <button
                        className="w-full mr-4 p-1 text-center font-mono text-gray-900 bg-gray-400 rounded-md hover:bg-gray-300
                        border border-gray-900"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-full p-2 font-mono text-center text-gray-400 bg-gray-900 rounded-md hover:bg-gray-700"
                        onClick={handleAdd}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
          {items.length > 0 && (
            <ul className="grid grid-cols-3 gap-5 mx-10">
              {items.map((item, index) => (
                <li key={index}
                  className="my-2 p-5 bg-white-400 border border-gray-900 rounded-xl"
                >
                  <div className="w-full font-bold font-mono text-lg">{item.inputTitle}</div>
                  <div>
                    <textarea 
                      disable
                      value={item.inputDescription} 
                      className="w-full my-2 font-mono text-sm bg-white-400"/></div>
                </li>
              ))}
            </ul>
          )}
      </div>
    )
}