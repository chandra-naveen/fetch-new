import React from 'react'

const EditableRow = ({editFormData, handleEditFormChange}) => {
    return (
        <tr>
            <td>
                <input type='text' name='first_name' value={editFormData.first_name} required='required' placeholder='Enter Firstname' onChange={handleEditFormChange}/>
            </td>
            <td>
                <input type='text' name='last_name' value={editFormData.last_name} required='required' placeholder='Enter Lastname' onChange={handleEditFormChange}/>
            </td>
            <td>
                <input type='email' name='email' value={editFormData.email} required='required' placeholder='Enter email' onChange={handleEditFormChange}/>
            </td>
            <td>
                <input type='text' name='gender' value={editFormData.gender} required='required'  placeholder='Enter gender' onChange={handleEditFormChange} />
            </td>
            <td>
                <input type='text' name='company' value={editFormData.company} required='required' placeholder='Enter company' onChange={handleEditFormChange}/>
            </td>
            <td>
                <input type='text' name='country' value={editFormData.country} required='required' placeholder='Enter country' onChange={handleEditFormChange} />
            </td>
            <td>
                <button className='btn btn-primary' type='submit'> Save</button>
            </td>
        </tr>
    )
}

export default EditableRow;