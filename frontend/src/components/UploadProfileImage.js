import React, {Component, useState, setState} from 'react'
import 'rsuite/dist/styles/rsuite-default.css';
import { Uploader, Loader, Icon } from 'rsuite';
import previewFile from '../utils/preview_file';
import user from  "../utils/user";
import auth from '../utils/auth';

const styles = {
    width: 250,
    height:300,

  };

class UploadProfileImage extends React.Component {
    state = {
      uploading:false,
      fileInfo:null
    }
    
    componentDidMount(){
      user.getProfileImage(0).then(data => {
        if (data){
          data = "data:image/jpeg;base64," + data;
          this.setState({fileInfo:data});
        }
        else{
          this.setState({fileInfo:null});
        }
      })
    }
  
    render(){

      return (
        <Uploader
          fileListVisible={false}
          listType="picture"
          action={user.uploadProfileImage()}
          data={{
              token:auth.getAuthenticationToken() 
          }}
          onUpload={file => {
            this.setState({uploading:true});
            previewFile(file.blobFile, value => {
              this.setState({fileInfo:value});
            });
          }}
          onSuccess={(response: Object, file: FileType) => {
            this.setState({uploading:false})
            console.log(response);
          }}
          onError={() => {
            this.setState({fileInfo:null});
            this.setState({uploading:false});
          }}
        >
            <button style={styles}>
              {this.state.uploading && <Loader backdrop center />}
              {
                this.state.fileInfo ? 
                (<img src={this.state.fileInfo} style={styles}/>)
                : 
                (<Icon icon="avatar" size="5x" />)
              }
              <div>Upload Image</div>
            </button>

          
        </Uploader>
      );
    }

  };

export default UploadProfileImage;