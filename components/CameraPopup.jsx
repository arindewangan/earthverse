import React, { useRef, useState } from 'react'
import { Camera } from 'react-camera-pro'
import { getSession } from 'next-auth/react';
import Image from 'next/image';

const errorMessages = {
    noCameraAccessible:
        'No camera device accessible. Please connect your camera or try a different browser.',
    permissionDenied:
        'Permission denied. Please refresh and give camera permission.',
    switchCamera:
        'It is not possible to switch camera to different one because there is only one video device accessible.',
    canvas: 'Canvas is not supported.',
}



function CameraPopup({ popupOpened, setPopupOpened, chosenSquares, user }) {
    const [imageURL, setImageURL] = useState(null)
    const [isTaking, setIsTaking] = useState(false)
    const [isSendingData, setIsSendingData] = useState(false)
    const [price, setPrice] = useState(0)
    const camera = useRef(null)

    const capture = () => {
        if (!camera.current) return
        setImageURL(camera.current.takePhoto())
    }

    const sendData = async (context) => {
        setIsSendingData(true)
        // SEND DATA HERE
        const session = await getSession(context);
        let user = session.user;
        let data = {user:user,chosenSquares:chosenSquares,imageURL:imageURL,price:price};
        fetch('/api/getData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        // CLEANING AFTER SENDING
        setIsSendingData(false)
        setImageURL(null)
        setPrice(0)
        setPopupOpened(false)
    }



    return (
        popupOpened ? (
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setPopupOpened(false)}></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <a href="#" className="relative block overflow-hidden rounded-lg border border-gray-100 p-8">
                      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
                      <div className="justify-between sm:flex">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            Please take a picture & set the Rate to confirm.
                          </h3>
                        </div>
                      </div>
                      <div className="mt-4 sm:pr-8">
                      {isTaking ? 
                      (
                        <div>
                          <div>
                            <Camera ref={camera} errorMessages={errorMessages} aspectRatio={16 / 9}/>
                          </div>
                          <div>
                            <button aria-label="take a photo" onClick={() => { capture() , setIsTaking(false)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                                  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>

                            </button>
                          </div>
                        </div>
                      ):
                      (
                        <div>

                          <div className="flex py-2 px-3">
                            <h1 className="pl-2 pr-10 py-2">Rate:</h1>
                            <label htmlFor="UserEmail" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                              <input 
                              value={price  <= 0 ? '' : price}
                              onChange={(e) => {
                                if (!isNaN(+e.target.value)) {
                                    setPrice(+e.target.value)
                                }
                              }}
                              type="number" placeholder="Rate" 
                              className="peer h-8 w-[7rem] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
                              <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                                Price
                              </span>
                            </label>
                          </div>
                        
                          <div className="flex py-2 px-2">
                            <h1 className="pl-2 pr-10 py-2">Photo:</h1>
                            {imageURL != null ?
                              (
                                <div className="ml-3 flex-shrink-0">
                                  <Image src={imageURL} alt="claimed land picture" width={64} height={64} className="h-16 w-16 rounded-lg object-cover shadow-sm"/>
                                </div>
                              ):
                              (
                                <button onClick={() => setIsTaking(true)} className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500">
                                  <span className="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                  </span>
                                  <span className="text-sm font-medium transition-all group-hover:mr-4">Take Photo</span>
                                </button>
                              )}
                          </div>
                        
                          <div className="flex py-3 px-3">
                            <button onClick={sendData} disabled={!imageURL || !price || isSendingData } className="inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75" >
                              <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent">
                                Submit
                              </span>
                            </button>
                          </div>

                        </div>
                      )}
                    </div>
                    </a>

                    </div>
                </div>
            </div>
        ) : ''
        
    )
}


export default CameraPopup
