import axios from 'axios';
import { useEffect, useState } from 'react';

const useProfiles = () => {


    const [allProfiles, setAllProfiles] = useState([]);
    useEffect(() => {
        const getAllProfiles = async () => {
            const { data } = await axios.get('http://localhost:5000/profiles', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setAllProfiles(data);
        }
        getAllProfiles();
    }, [])

    return [allProfiles, setAllProfiles];
};

export default useProfiles;