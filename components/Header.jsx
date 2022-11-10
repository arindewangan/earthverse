import React from "react";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession , signIn, signOut } from "next-auth/react"


function Header({words}) {
    const { data: session } = useSession()
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { push } = useRouter();

    const handleAuth = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });

        const userData = { address: account, chain: chain.id, network: 'evm' };

        const { data } = await axios.post('/api/auth/request-message', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const message = data.message;

        const signature = await signMessageAsync({ message });

        // redirect user after success authentication to '/user' page
        const { url } = await signIn('credentials', { message, signature, redirect: false});
        /**
         * instead of using signIn(..., redirect: "/user")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };
    

  return (
    <>
    <div className='absolute top-0 left-0 right-0 z-[401]'>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
        <div className="container flex justify-between items-center mx-auto">
          <a href="#" className="flex items-center">
          <svg className="mr-3 h-6 sm:h-9" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} xmlSpace="preserve">
            {" "}
            <path
              style={{ fill: "#127C8D" }}
              d="M256,0l-22.505,253.654L256,512c141.385,0,256-114.615,256-256S397.385,0,256,0z"
            />{" "}
            <path
              style={{ fill: "#FFD15D" }}
              d="M256,33.758l-22.505,219.896L256,478.242c122.74,0,222.242-99.501,222.242-222.242 S378.74,33.758,256,33.758z"
            />{" "}
            <path
              style={{ fill: "#FF9E46" }}
              d="M256,93.514l-22.505,160.14L256,418.486c89.596,0,162.486-72.891,162.486-162.486 S345.596,93.514,256,93.514z"
            />{" "}
            <path
              style={{ fill: "#FF7226" }}
              d="M256,153.269l-22.505,100.384L256,358.73c56.646,0,102.731-46.085,102.731-102.731 S312.646,153.269,256,153.269z"
            />{" "}
            <path
              style={{ fill: "#BD0D38" }}
              d="M256,203.907l-22.505,49.747L256,308.093c28.77,0,52.093-23.322,52.093-52.093 C308.093,227.23,284.77,203.907,256,203.907z"
            />{" "}
            <path
              style={{ fill: "#4BBCD6" }}
              d="M183.601,10.382c-23.241,6.839-45.108,16.889-65.088,29.634c0.151-0.095,0.299-0.179,0.451-0.275 l-75.649,73.735C15.961,154.214,0,203.243,0,256c0,47.007,12.682,91.046,34.792,128.907L178.516,500.05 C202.96,507.804,228.989,512,256,512V73.143L183.601,10.382z"
            />{" "}
            <g>
              {" "}
              <path
                style={{ fill: "#127C8D" }}
                d="M170.767,369.222H145.66v-7.124c0-30.615-24.819-55.433-55.433-55.433 c-5.033,0-9.905,0.683-14.541,1.94v-30.307c9.047-3.415,15.493-12.129,15.493-22.372v-18.757c3.424,0.881,34.311,0.58,54.238,0.286 v10.967c0,4.661,3.778,8.44,8.44,8.44s8.44-3.779,8.44-8.44V120.196c11.346-4.195,19.436-15.109,19.436-27.914 c0-16.432-13.321-29.753-29.753-29.753h-5.247l-27.768-22.788c-30.039,19.076-55.834,44.232-75.649,73.745v142.44 c0,10.242,6.446,18.956,15.493,22.372v38.137c-14.503,9.998-24.014,26.716-24.014,45.664v22.809 c31.687,54.258,82.758,95.805,143.723,115.144v-56.437c17.046-3.573,29.848-18.686,29.848-36.794 C208.364,386.055,191.531,369.222,170.767,369.222z"
              />{" "}
              <path
                style={{ fill: "#127C8D" }}
                d="M127.204,261.524c-4.662,0-8.44,3.779-8.44,8.44v3.335c0,4.661,3.778,8.44,8.44,8.44 c4.662,0,8.44-3.779,8.44-8.44v-3.335C135.644,265.303,131.866,261.524,127.204,261.524z"
              />{" "}
            </g>{" "}
            <path
              style={{ fill: "#FFFFFF" }}
              d="M183.607,10.399c5.05,35.469,35.529,62.744,72.393,62.744V0C230.855,0,206.563,3.643,183.607,10.399z "
            />{" "}
            <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
            <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
          </svg>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Earthverse
            </span>
          </a>
          <div className="flex">
            <div className="hidden relative md:block w-[40rem]">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                defaultValue={words} 
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"                
              />
            </div>
          </div>
          <div className="justify-between items-center flex flex-row-reverse  md:order-1">
            {!session ? 
            (
              <div>
                <button type="button" onClick={() => handleAuth()} className=" text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                  <div className="inline-flex">
                    <span className="px-2">Login with Metamask</span>
                        <svg aria-hidden="true" className="h-4" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z"
                              fill="#E17726"
                            />
                            <path
                              d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z"
                              fill="#E27625"
                            />
                            <path
                              d="M32.1656 27.0093L39.7516 27.1537L37.1004 36.1603L27.8438 33.6116L32.1656 27.0093Z"
                              fill="#E27625"
                            />
                            <path
                              d="M7.83409 27.0093L12.1399 33.6116L2.89876 36.1604L0.263672 27.1537L7.83409 27.0093Z"
                              fill="#E27625"
                            />
                            <path
                              d="M17.5203 10.8677L17.8304 20.8807L8.55371 20.4587L11.1924 16.4778L11.2258 16.4394L17.5203 10.8677Z"
                              fill="#E27625"
                            />
                            <path
                              d="M22.3831 10.7559L28.7737 16.4397L28.8067 16.4778L31.4455 20.4586L22.1709 20.8806L22.3831 10.7559Z"
                              fill="#E27625"
                            />
                            <path
                              d="M12.4115 27.0381L17.4768 30.9848L11.5928 33.8257L12.4115 27.0381Z"
                              fill="#E27625"
                            />
                            <path
                              d="M27.5893 27.0376L28.391 33.8258L22.5234 30.9847L27.5893 27.0376Z"
                              fill="#E27625"
                            />
                            <path
                              d="M22.6523 30.6128L28.6066 33.4959L23.0679 36.1282L23.1255 34.3884L22.6523 30.6128Z"
                              fill="#D5BFB2"
                            />
                            <path
                              d="M17.3458 30.6143L16.8913 34.3601L16.9286 36.1263L11.377 33.4961L17.3458 30.6143Z"
                              fill="#D5BFB2"
                            />
                            <path
                              d="M15.6263 22.1875L17.1822 25.4575L11.8848 23.9057L15.6263 22.1875Z"
                              fill="#233447"
                            />
                            <path
                              d="M24.3739 22.1875L28.133 23.9053L22.8184 25.4567L24.3739 22.1875Z"
                              fill="#233447"
                            />
                            <path
                              d="M12.8169 27.0049L11.9606 34.0423L7.37109 27.1587L12.8169 27.0049Z"
                              fill="#CC6228"
                            />
                            <path
                              d="M27.1836 27.0049L32.6296 27.1587L28.0228 34.0425L27.1836 27.0049Z"
                              fill="#CC6228"
                            />
                            <path
                              d="M31.5799 20.0605L27.6165 24.0998L24.5608 22.7034L23.0978 25.779L22.1387 20.4901L31.5799 20.0605Z"
                              fill="#CC6228"
                            />
                            <path
                              d="M8.41797 20.0605L17.8608 20.4902L16.9017 25.779L15.4384 22.7038L12.3988 24.0999L8.41797 20.0605Z"
                              fill="#CC6228"
                            />
                            <path
                              d="M8.15039 19.2314L12.6345 23.7816L12.7899 28.2736L8.15039 19.2314Z"
                              fill="#E27525"
                            />
                            <path
                              d="M31.8538 19.2236L27.2061 28.2819L27.381 23.7819L31.8538 19.2236Z"
                              fill="#E27525"
                            />
                            <path
                              d="M17.6412 19.5088L17.8217 20.6447L18.2676 23.4745L17.9809 32.166L16.6254 25.1841L16.625 25.1119L17.6412 19.5088Z"
                              fill="#E27525"
                            />
                            <path
                              d="M22.3562 19.4932L23.3751 25.1119L23.3747 25.1841L22.0158 32.1835L21.962 30.4328L21.75 23.4231L22.3562 19.4932Z"
                              fill="#E27525"
                            />
                            <path
                              d="M27.7797 23.6011L27.628 27.5039L22.8977 31.1894L21.9414 30.5138L23.0133 24.9926L27.7797 23.6011Z"
                              fill="#F5841F"
                            />
                            <path
                              d="M12.2373 23.6011L16.9873 24.9926L18.0591 30.5137L17.1029 31.1893L12.3723 27.5035L12.2373 23.6011Z"
                              fill="#F5841F"
                            />
                            <path
                              d="M10.4717 32.6338L16.5236 35.5013L16.4979 34.2768L17.0043 33.8323H22.994L23.5187 34.2753L23.48 35.4989L29.4935 32.641L26.5673 35.0591L23.0289 37.4894H16.9558L13.4197 35.0492L10.4717 32.6338Z"
                              fill="#C0AC9D"
                            />
                            <path
                              d="M22.2191 30.231L23.0748 30.8354L23.5763 34.8361L22.8506 34.2234H17.1513L16.4395 34.8485L16.9244 30.8357L17.7804 30.231H22.2191Z"
                              fill="#161616"
                            />
                            <path
                              d="M37.9395 0.351562L39.9998 6.53242L38.7131 12.7819L39.6293 13.4887L38.3895 14.4346L39.3213 15.1542L38.0875 16.2779L38.8449 16.8264L36.8347 19.1742L28.5894 16.7735L28.5179 16.7352L22.5762 11.723L37.9395 0.351562Z"
                              fill="#763E1A"
                            />
                            <path
                              d="M2.06031 0.351562L17.4237 11.723L11.4819 16.7352L11.4105 16.7735L3.16512 19.1742L1.15488 16.8264L1.91176 16.2783L0.678517 15.1542L1.60852 14.4354L0.350209 13.4868L1.30098 12.7795L0 6.53265L2.06031 0.351562Z"
                              fill="#763E1A"
                            />
                            <path
                              d="M28.1861 16.2485L36.9226 18.7921L39.7609 27.5398L32.2728 27.5398L27.1133 27.6049L30.8655 20.2912L28.1861 16.2485Z"
                              fill="#F5841F"
                            />
                            <path
                              d="M11.8139 16.2485L9.13399 20.2912L12.8867 27.6049L7.72971 27.5398H0.254883L3.07728 18.7922L11.8139 16.2485Z"
                              fill="#F5841F"
                            />
                            <path
                              d="M25.5283 5.17383L23.0847 11.7736L22.5661 20.6894L22.3677 23.4839L22.352 30.6225H17.6471L17.6318 23.4973L17.4327 20.6869L16.9139 11.7736L14.4707 5.17383H25.5283Z"
                              fill="#F5841F"
                            />
                          </svg>
                  </div>
                </button>
              </div>
            ):(
              <button type="button" onClick={() => signOut()} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                <span className="px-2">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      
    </div>    
    </>
  )
}

export default Header
