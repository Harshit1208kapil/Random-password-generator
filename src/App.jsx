import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number){
      str += "0123456789"
    }
    if(character){
      str += "!@#$%^&*(){}:;'[]-=_+<>,./`~"
    }

    for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random()*str.length +1)
     pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, number, character, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, number, character, passwordGenerator])
  
  return (
    <>
      {/* Parent container to make it responsive */}
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-4 text-orange-500 bg-gray-800 sm:px-6 md:px-8 lg:px-10'>
        <h1 className='text-4xl text-center text-white my-5'>Password Generator</h1>
        
        {/* Input and button wrapper */}
        <div className='flex flex-col sm:flex-row shadow-lg rounded-lg overflow-hidden mb-4'>
          <input 
            type="text" 
            value={password} 
            className='outline-none w-full py-2 px-3 text-sm sm:text-base' 
            placeholder='Password' 
            ref={passwordRef} 
            readOnly 
          />
          <button 
            className='outline-none bg-blue-700 text-white px-3 py-2 shrink-0 mt-2 sm:mt-0 sm:ml-2' 
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        
        {/* Controls for length, numbers, characters */}
        <div className='flex flex-col gap-4 sm:flex-row sm:gap-x-2 text-sm'>
          
          {/* Length slider */}
          <div className='flex items-center gap-x-2 sm:gap-x-1'>
            <input 
              type="range" 
              min={6} 
              max={100} 
              value={length} 
              className='cursor-pointer' 
              onChange={(e) => {setLength(e.target.value)}} 
            />
            <label>Length: {length}</label>
          </div>
          
          {/* Checkbox for Numbers */}
          <div className="flex items-center gap-x-2 sm:gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          
          {/* Checkbox for Special Characters */}
          <div className="flex items-center gap-x-2 sm:gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                setCharacter((prev) => !prev )
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App;
