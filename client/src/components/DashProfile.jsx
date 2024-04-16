
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useSelector } from 'react-redux';
import { app } from '../firebase';

export default function DashProfile() {
    const {currentUser, error, loading} = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
        setImageFile(e.target.files[0]);

    };
    useEffect(()=>{
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        /* service firebase.storage {
            match /b/{bucket}/o {
                match /{allPaths=**} {
                    allow read;
                    allow write: if
                    request.resource.size < 2* 1024 *1024 &&
                    request.resource.contentType.matches('image/.*')
                }
            }
        }
        */
        setImageFileUploadError(null);
        setImageFile(null);
        setImageFileUrl(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) =>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Could not upload image (File must be less than 2MB)');
                setImageFileUploadProgress
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((dowonloadURL) => {
                    setImageFileUrl(dowonloadURL);
                }
            );
            }
        );
    };
    console.log(imageFile, imageFileUrl);
    return (
    <div className='max-w-lg mx-auto p-6 w-full rounded-lg shadow-md'>
        <h1 className='my-7 text-center font-semibold text-3xl text-gray-800'>Profile</h1>
        <form action="#" className="flex flex-col gap-4">
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mx-auto" onClick={()=> filePickerRef.current.click()}>
            {imageFileUploadProgress && (
                <CircularProgressbar value={imageFileUploadProgress || 0}  text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                    root:{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    },
                    path: {
                        stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                    
                    }
                }}
                />
            )}
            <img src={imageFileUrl || currentUser.profilePicture} alt="user"
            className={`rounded-full w-full h-full object-cover border-4 border-gray-200
            ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
        </div>
        {imageFileUploadError && (
            <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
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
