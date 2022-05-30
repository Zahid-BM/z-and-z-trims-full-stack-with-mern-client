import React from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useProfiles from '../../hooks/useProfiles';
import cancel from '../../images/cancel.png';

const ProfileRow = ({ profile, index }) => {
    const { email, name } = profile;
    const [allProfiles, setAllProfiles] = useProfiles();

    const handleMakeAdminBtn = () => {
        const url = `http://localhost:5000/profiles/admin/${email}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Admin Role Given !!!!');
            })

    }





    const handleRemoveBtn = id => {
        const userConfirmation = window.confirm('Once delete then it can not be restored. Are you sure to delete this Item ?')
        if (userConfirmation) {
            const url = `http://localhost:5000/profiles/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    if (result.deletedCount === 1) {
                        const remaining = allProfiles.filter(profile => profile?._id !== id);
                        setAllProfiles(remaining)
                        toast.success('User Profile removal success!!!')
                    }
                })
        }
    };
    return (

        <tr key={profile?._id}>
            <td className='bg-secondary'><small>{index + 1}</small></td>
            <td className='bg-secondary'><small>{email}</small></td>
            <td className='bg-secondary'><small>{name}</small></td>
            <td className='bg-secondary'><Button onClick={handleMakeAdminBtn} className='base-bg text-white border-0 btn-sm'>Make Admin <img src={'payment'} alt="" /></Button></td>
            <td className='bg-secondary'><img className='cancel-btn' onClick={() => handleRemoveBtn(profile?._id)} src={cancel} alt="" /></td>
        </tr>

    );
};

export default ProfileRow;