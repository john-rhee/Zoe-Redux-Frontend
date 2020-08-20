import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";
import WunderContext from '../contexts/WunderContext';

const PictureUpdate = props => {

    const {mainForm, setMainForm, url, setUrl, imageId, setImageId, uId, setUId} = useContext(WunderContext);

    const upFileName = props.location.state.fileName

    const initialItem = {

      title: "",
      description: "",
      user_id: uId,
      image_id: props.match.params.id,
      prev_file: upFileName

    };

    console.log(uId)
    console.log(mainForm)
    console.log(props)
    console.log("file name:", props.location.state.fileName)
    console.log(props.match.params.id)
    console.log("image id", imageId)

    //uploaded picture//
    const [item, setItem] = useState(initialItem)
    console.log("initialItem", initialItem)

    //picture//
    const [selectedFile, setSelectedFile] = useState(null);
    
    //picture//
    const fileSelectHandler = event => {
        setSelectedFile(event.target.files[0])
    }
    //picture//
    const fileUploadHandler = event => {
        console.log("upload started")

        console.log("before json", item)

        //json the items//
        var jsonItem = JSON.stringify(item)

        console.log("title, description, user id uploaded", jsonItem)
        console.log("jsonItem file type", item.type)
         
        const fd = new FormData() 
        fd.append("uimage", selectedFile, jsonItem)
        
        axios
            .put(`http://localhost:5000/upload/${uId}`, fd)
            .then(response => {
                console.log(response);
                
                setUrl(response.data)
            })

            props.history.push(`/lists/${uId}`);
            window.location.reload()

        //resetting Item form
        setItem({ 
            title: "",
            description: "",
            user_id: null,
            image_id: ""
        });    
    }

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;

        setItem({
            ...item,
            [e.target.name]: value,
            user_id: uId
            });
    };    

return (

    <div>

    <h2>Update</h2>
    <h6>*Upload only jpeg, jpg, png, gif file under size 5MB</h6>
            
            <input type="file" onChange={fileSelectHandler}/>

            {/* for title */}
            <h6>Title</h6>
            <input type="text" name="title" onChange={changeHandler} placeholder="title" value={item.title} />
            {/* for title */}

            {/* for description */}
            <h6>Description</h6>
            <input type="text" name="description" onChange={changeHandler} placeholder="description" value={item.description} />
            {/* for description */}

            <button onClick={fileUploadHandler}>Update</button>

    </div>
  );
};

export default PictureUpdate;