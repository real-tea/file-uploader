import React,{ Fragment,useState } from 'react';
import Message from './message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {

    const [ file , setFile] = useState()
    const [ fileName , setFileName ] = useState('Choose File')
    const [ uploadedFile , setUploadedFile ] = useState({})
    const [ message , setMessage ] = useState(' ')
    const [ uploadPercentage , setUploadPercentage ] = useState(0);

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);

        try{
            const res = await axios.post('/upload',formData,{
                headers : {
                    'Content-type' : 'multipart/form-data'
                },
                onUploadProgress : progresEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progresEvent.loaded * 100)/progresEvent.total)
                        )
                    )
                }
            });
            setTimeout(() => setUploadPercentage(0), 10000);


            const { fileName , filePath } = res.data;
            setUploadedFile({ fileName,filePath });

            setMessage('File Uploaded Successfully')
        }catch(err){
        if(err.response.status === 500){
            setMessage("Server Error encountered");
        }
        else{
            setMessage(err.response.data.message);
        }
    }
    	}

   return (
        <Fragment>
            {message ? <Message msg = { message } /> : null}
            <form onSubmit = {onSubmit}>
            <div className = 'custom-file mb-4'> 	
                <input
                type = "file"
                onChange = {onChange}
                />

            <label className = 'custom-file-label'>{fileName}</label>

            </div>

            <Progress percentage = {uploadPercentage} />
            <input
            type = "submit"
            value = "upload"
            className = "btn btn-danger btn-block mt-4"/>
            </form>
            {uploadedFile ? (
                <div className = "row mt-5">
                    <div className = "col-md-6 m-auto">
                        <h3 className = "text-center" >{uploadedFile.fileName}</h3>
                        <img style = {{width : '20%'}}src = "uploadedFile.filePath" alt = " "/>
                    </div>

                </div>
            ):null}
            
        </Fragment>
    )
}
export default FileUpload;