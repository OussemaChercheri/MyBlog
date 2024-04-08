
import { useSelector } from 'react-redux';

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
    return (
        <div className='max-w-lg mx-auto p-6 w-full rounded-lg shadow-md'>
    <h1 className='my-7 text-center font-semibold text-3xl text-gray-800'>Profile</h1>
    <form action="#" className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mx-auto">
            <img src={currentUser.profilePicture} alt="user" className='rounded-full w-full h-full object-cover border-4 border-gray-200' />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-gray-600">Username</label>
            <input
                type='text'
                id='username'
                placeholder='Username'
                defaultValue={currentUser.username}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-600">Email</label>
            <input
                type='email'
                id='email'
                placeholder='Email'
                defaultValue={currentUser.email}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-600">Password</label>
            <input
                type='password'
                id='password'
                placeholder='Password'
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
        </div>
        <button type='submit' className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-md hover:opacity-90 transition duration-300 ease-in-out">
            Update
        </button>
    </form>
    <div className="flex justify-between mt-5">
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Sign Out</span>
    </div>
</div>

    )
}
