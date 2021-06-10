import React, { Fragment, useState } from 'react'
import axios from 'axios';

const UploadImage = () => {

    const [File, setFile] = useState('');
    const [Filename, setFilename] = useState('Choose File');
    const [URL, setURL] = useState('null');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onChangeURL = e => {
        setURL(e.target.value)

    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', File);
        formData.append('Link', URL);
        try {
            const res = await axios.post('/upload', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                
            });
            const { fileName, filePath } = res.data;
            console.log(fileName,filePath)
            setUploadedFile({ fileName, filePath });
        } catch (err) {
            if(err.response.status === 500){
                console.log('There was a problem with the server')
            }
            else{
                console.log(err.response.data.msg)
            }
        }
    }

    return (
        <div className='container mt-4'>
            <Fragment>

                <form onSubmit={onSubmit}>
                    <div className="custom-file mb-4">
                        <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                        <label className="custom-file-label" htmlFor="customFile">{Filename}</label>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Link</span>
                        </div>
                        <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" onChange={onChangeURL} />
                    </div>

                    <input
                        type='submit'
                        value='Create'
                        className='btn btn-primary btn-block mt-4'
                    />
                </form>
            </Fragment>
        </div>
    )
}

export default UploadImage
