
import { selectAllSemester, addSubject, removeSubject, removeSemester, addSemester, calculateCGPA,CGPA } from '../state/cgpaSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react' 
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const Index = () => {
  
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const allSemester = useSelector(selectAllSemester)
  const cgpa = useSelector(CGPA)
  const dispatch = useDispatch()
  const cross = <svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full' width="86.93" height="86.93" viewBox="0 0 86.93 86.93">
    <defs>
      <filter id="Union_5" x="13.852" y="16.852" width="59.227" height="59.227" filterUnits="userSpaceOnUse">
        <feOffset dy="3" input="SourceAlpha" />
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood floodOpacity="0.22" />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g id="Group_2" data-name="Group 2" transform="translate(-539.374 -1833.003) rotate(45)">
      <g id="Ellipse_1" data-name="Ellipse 1" transform="translate(1708.258 884)" fill="rgba(255,255,255,0.55)" stroke="#fff" strokeWidth="1">
        <circle cx="30.734" cy="30.734" r="30.734" stroke="none" />
        <circle cx="30.734" cy="30.734" r="30.234" fill="none" />
      </g>
      <g transform="matrix(0.71, -0.71, 0.71, 0.71, 1677.52, 914.73)" filter="url(#Union_5)">
        <path id="Union_5-2" data-name="Union 5" d="M11.364,25.31V16.529H2.583a2.583,2.583,0,1,1,0-5.165h8.781V2.583a2.583,2.583,0,1,1,5.166,0v8.781h9.3a2.583,2.583,0,0,1,0,5.165h-9.3V25.31a2.583,2.583,0,1,1-5.166,0Z" transform="translate(43.28 23.56) rotate(45)" fill="rgba(141,141,141,0.56)" stroke="rgba(141,141,141,0.56)" strokeWidth="1" />
      </g>
    </g>
  </svg>

  const cardGradient = {
    1: 'from-purple-500 to-indigo-500',
    2: 'from-orange-400 to-orange-500',
    3: 'from-green-400 to-cyan-400',
    5: 'from-sky-400 to-indigo-500',
    4: 'from-fuchsia-500 to-purple-600',
    6: 'from-cyan-400 to-sky-500',
    7: 'from-pink-500 to-rose-300',
    8: 'from-emerald-500 to-lime-300',
  }

  return (
    <>

      <div className='h-screen w-screen p-10 bg-zinc-800 overflow-clip to-'>
        <div className='auto-cols-[minmax(400px,400px)] grid grid-flow-col h-5/6 no-scrollbar gap-10 overflow-auto'>
          {Object.entries(allSemester).map(item => {
            const semester = allSemester[item[0]]
            return <div
              key={item[0]}
              className={`bg-gradient-to-br ${cardGradient[item[0]]} overflow-y-auto rounded-3xl drop-shadow-2xl p-10`}><h1 className='text-center text-lg text-slate-700 font-bold mb-3'>{item[0]} SEMESTER</h1><div className='relative overflow-y-auto text-zinc-50'>{
                Object.entries(semester).map((subjects) => {
                  if (subjects[0] === 'sgpa') {
                    return
                  }
                  return <div
                    className='grid grid-cols-4'
                    key={subjects[0]} >
                    <div >{subjects[0]}</div>
                    <div className='grid justify-items-end'>{subjects[1].credit}</div>
                    <div className='grid justify-items-end'>{subjects[1].marks}</div>
                    <i className='grid justify-items-end'><button
                      className='h-7 w-7 '
                      onClick={() => dispatch(removeSubject({
                        semester: item[0],
                        subject: subjects[0]
                      }))}
                    >{cross}
                    </button></i>
                  </div>

                })}</div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()

                  dispatch(addSubject({
                    sem: item[0],
                    subData: {
                      name: e.target.subjects.value,
                      credit: e.target.credit.value,
                      marks: e.target.marks.value
                    }
                  }))
                  e.target.reset()
                }} className='grid grid-flow-row absolute w-[80%] bottom-6'>
                <label className='block text-slate-100 text-sm font-bold mb-2' htmlFor="subject">Subject Code</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" required name="subjects" />
                <label className='block text-slate-100 text-sm font-bold mb-2' htmlFor="credit">Credit </label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" required name="credit" min="1" max="8" />
                <label className='block text-slate-100 text-sm font-bold mb-2' htmlFor="marks">Marks </label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" step="0.01" required name="marks" min="0" max="100" />
                <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-[75%] mt-5">submit</button>

              </form>
              <button className='h-[4rem] w-[4rem] fixed right-5 bottom-5'
                onClick={() =>
                  dispatch(removeSemester({
                    semester: item[0]
                  }))}>{cross}</button>
            </div>
          })}
         

        

        </div>
      
          <button
            type="button"
            onClick={() => {
              dispatch(calculateCGPA())
              openModal()
            }}
              
            className="fixed  grid  right-[11.5rem]  rounded-md pt-9 pb-9 bottom-12 text-white bg-gradient-to-br from-green-400 to-blue-600 bg-opacity-20 px-4 py-2 text-sm font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Calculate
          </button>
 

       <form className='fixed grid pt-10 right-10 bottom-10'
          onSubmit={(event) => {
            event.preventDefault()
            dispatch(addSemester({
              semester: event.target.semester.value
            }))
          }}>

          <select className=' w-[8rem] bg-slate-500 rounded-lg text-slate-100 shadow-md py-2 px-3' name="semester">
            <option value="1">1 Sem</option>
            <option value="2">2 Sem</option>
            <option value="3">3 Sem</option>
            <option value="4">4 Sem</option>
            <option value="5">5 Sem</option>
            <option value="6">6 Sem</option>
            <option value="7">7 Sem</option>
            <option value="8">8 Sem</option>
          </select>
          
          <button className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4'>Add Semester</button>
        </form>

      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pb-4 pl-4"
                  >
                    SGPA
                    
                  </Dialog.Title>
                  <div className="">

                    {Object.entries(allSemester).map(item => {
                      const semester = allSemester[item[0]]
                      return <div
                        key={item[0]}
                        ><div>{
                          Object.entries(semester).map((subjects) => {
                            if(subjects[0] == 'sgpa'){
                              return <div className='grid grid-cols-3 justify-around' key={subjects[0]}>
                                <div className=' ml-10 grid justify-items-start'>{item[0]} Semester</div> <hr className='mt-[0.9rem] grid justify-items-end'></hr>
                                <div className=' ml-10 grid justify-items-center'>{parseFloat(subjects[1]).toFixed(2)} CGPA</div>
                                

                              </div>
                            }
                          
                          })}</div>           
                      </div>
                    })}

                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pb-4 pl-4 pt-4"
                  >
                    CGPA

                  </Dialog.Title>

                  <div className='grid grid-cols-3 justify-around'>
                    <div className=' ml-10 grid justify-items-start'> Over All</div> <hr className='mt-[0.9rem] grid justify-items-end'></hr>
                    <div className=' ml-10 grid justify-items-center'>{parseFloat(cgpa).toFixed(2)} CGPA</div>
                    </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default Index