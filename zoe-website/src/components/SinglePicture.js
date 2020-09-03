import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import WunderContext from '../contexts/WunderContext';
import axios from "axios";
import Button from '@material-ui/core/Button';

function SinglePicture(props) {

    const {id, name, title, descript} = props.pList;

    const user_id = props.match.params.id

    const image_id = props.picId.toString()
    

    const image_url = `https://zoe-backend.herokuapp.com/profile/${name}`
    // const image_url = `http://localhost:5000/profile/${name}`

    const {mainForm, setMainForm, url, setUrl, imageId, setImageId} = useContext(WunderContext);

    const deleteList = e => {
        e.preventDefault();
        // axiosWithAuth()
        axiosWithAuth()
        .delete(`https://zoe-backend.herokuapp.com/upload/${id}`,
        // .delete(`http://localhost:5000/upload/${id}`,
            //sending image file name
            {params: {file_name: name}}
             )
          .then(res => {
            console.log(res);
  
            axiosWithAuth()
            .get('https://zoe-backend.herokuapp.com/upload/', {
            // .get('http://localhost:5000/upload/', {
                //sending users id
                params: {
                  user_id: user_id
                }
              })
            .then(response => {
              console.log(response);
              setUrl(response.data)
            });
              props.history.push(`/lists/${user_id}`);
          })
          .catch(error => console.log(error));
      }

    return (

        <div>

            <img src = {image_url}/>
            <h2>{title}</h2>
            <h3>{descript}</h3>

            <Button variant="contained" color="primary" onClick={
               () =>  props.history.push(`/lists/${image_id}/update`,{fileName:name})
            }>Edit</Button>

            <Button variant="contained" color="primary" onClick={deleteList}>Delete</Button>

        </div>    
    )
}

export default SinglePicture