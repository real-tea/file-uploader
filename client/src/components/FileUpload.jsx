import React,{ Fragment,useState } from 'react'
import axios from 'axios';

const FileUpload = () => {

    const [ file , setFile] = useState()
    const [ fileName , setFileName ] = useState('Choose File')

    const onChange = (e) =>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);

        try{
            const axios = await axios.post('/upload',formData,{
                headers : {
                    'Content-type' : 'multipart/form-data'
                }
            })
        }catch(err){}

    	}

   return (
        <Fragment>
            
            <form onSubmit = {onSubmit}>
            <div> 	
                <input
                type = "file"
                onChange = {onChange}
                />

            <label className = 'custom-file-label'>{fileName}</label>

            </div>
            <input
            type = "submit"
            value = "upload"
            className = "btn btn-danger btn-block mt-4"/>
            </form>

            
        </Fragment>
    )
}
export default FileUpload;