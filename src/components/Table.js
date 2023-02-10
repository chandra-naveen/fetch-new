import React, { Fragment, useState } from 'react';
import * as XLSX from 'xlsx'
import EditableRow from './EditableRow';
import ReadRow from './ReadRow';


function Table() {

    const [items, setItems] = useState([]);
    const [state, setState] = useState('')
    const [order, setOrder] = useState('ASC');
    const [addData, setAddData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        company: '',
        country: '',
    })

    const [editFormData, setEditFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        company: '',
        country: '',
    })

    const [editRecordId, setEditRecordId] = useState(null);

    const handleAddData = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addData };
        newFormData[fieldName] = fieldValue;
        setAddData(newFormData);
    }

    const handleEditFormChange = (event) =>{
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const newRecord = {
            id: Math.floor(Math.random() * (1000 - 200 + 1) + 200),
            first_name: addData.first_name,
            last_name: addData.last_name,
            email: addData.email,
            gender: addData.gender,
            company: addData.company,
            country: addData.country
        }
        const newRecords = [...items, newRecord];
        setItems(newRecords);
    }
    const handleEditFormSubmit = (event) =>{
        event.preventDefault();

        const editedRecord ={
            id:editRecordId,
            first_name: editFormData.first_name,
            last_name: editFormData.last_name,
            email: editFormData.email,
            gender: editFormData.gender,
            company: editFormData.company,
            country: editFormData.country
        }
        const newContacts = [...items];

        const index = items.findIndex((d)=> d.id === editRecordId);

        newContacts[index] = editedRecord;
        setItems(newContacts);
        setEditRecordId(null);
    }

    const handleEditClick = (event, d)=>{
        event.preventDefault();
        setEditRecordId(d.id);

        const formValues = {
            first_name: d.first_name,
            last_name: d.last_name,
            email: d.email,
            gender: d.gender,
            company: d.company,
            country: d.country
        }
        setEditFormData(formValues);
    }

    const readExcel = (file) => {

        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: 'buffer' });

                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws)

                resolve(data);
            }
            fileReader.onerror = ((error) => {
                reject(error);
            })
        })
        promise.then((d) => {
            setItems(d);
        })
    }

    const sorting = (col) => {
        if (order === 'ASC') {
            const sorted = [...items].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setItems(sorted);
            setOrder('DSC');
        }
        if (order === 'DSC') {
            const sorted = [...items].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setItems(sorted);
            setOrder('ASC');
        }
    }

    return (
        <div>
            <input className='form-group' type="file" onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
            }} />
            
<div className='container'>
<input type='text' placeholder='Search....' className='form-control' 
style={{marginTop: 50, marginBottom: 50, width:"100%" }} onChange={(e)=>{
    setState(e.target.value);
}}/>
</div>
<h3>Add New Record</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' name='first_name' required='required' placeholder='Enter Firstname' onChange={handleAddData} />
                <input type='text' name='last_name' required='required' placeholder='Enter Lastname' onChange={handleAddData} />
                <input type='email' name='email' required='required' placeholder='Enter email' onChange={handleAddData} />
                <input type='text' name='gender' required='required' placeholder='Enter gender' onChange={handleAddData} />
                <input type='text' name='company' required='required' placeholder='Enter company' onChange={handleAddData} />
                <input type='text' name='country' required='required' placeholder='Enter country' onChange={handleAddData} />
                <button className='btn btn-secondary' type='submit'> Add </button>
            </form>
            {items.length > 1 && (
                <form onSubmit={handleEditFormSubmit}>
                <table className="table container" >
                    <thead>
                        <tr>
                            <th scope="col" >FirstName <br/> <button className='btn btn-secondary' onClick={() => sorting('first_name')}>Sort</button></th>
                            <th scope="col" >LastName <br/> <button className='btn btn-secondary' onClick={() => sorting('last_name')}>Sort</button></th>
                            <th scope="col" >Email <br/> <button className='btn btn-secondary' onClick={() => sorting('email')}>Sort</button></th>
                            <th scope="col" >Gender <br/> <button className='btn btn-secondary' onClick={() => sorting('gender')}>Sort</button></th>
                            <th scope="col" >Company <br/><button className='btn btn-secondary' onClick={() => sorting('company')}>Sort</button></th>
                            <th scope="col" >Country <br/> <button className='btn btn-secondary' onClick={() => sorting('country')}>Sort</button></th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.filter((val)=>{
                            if(state===''){
                                return val;
                            }else if(val.first_name.toLowerCase().includes(state.toLocaleLowerCase())||
                            val.last_name.toLowerCase().includes(state.toLocaleLowerCase())||
                            val.gender.toLowerCase().includes(state.toLocaleLowerCase()) ||
                            val.email.toLowerCase().includes(state.toLocaleLowerCase())||
                            val.company.toLowerCase().includes(state.toLocaleLowerCase())||
                            val.country.toLowerCase().includes(state.toLocaleLowerCase())){
                                return val
                            }
                        }).map((d) => (
                            <Fragment key={d.id}>
                                {editRecordId === d.id ? (<EditableRow  editFormData={editFormData} handleEditFormChange={handleEditFormChange}/>) : (
                                    <ReadRow d={d} handleEditClick={handleEditClick}/>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
                </form>
            )
            }
        </div>
    )
}

export default Table