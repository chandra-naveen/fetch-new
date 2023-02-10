import React from 'react'

const ReadRow = ({d, handleEditClick}) => {
    return (
        <>
            <tr key={d.id}>
                <td>{d.first_name}</td>
                <td>{d.last_name}</td>
                <td>{d.email}</td>
                <td>{d.gender}</td>
                <td>{d.company}</td>
                <td>{d.country}</td>
                <td><button className='btn btn-primay' onClick={(event)=> handleEditClick(event, d)}>Edit</button></td>
            </tr>
        </>
    )
}

export default ReadRow