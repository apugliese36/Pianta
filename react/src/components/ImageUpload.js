import React from 'react';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let imagePreviewUrl = this.props.imagePreviewUrl;
    let currentImage = this.props.currentImage;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className='img-preview' src={imagePreviewUrl}/>);
    } else if (currentImage) {
      $imagePreview = (<img className='img-preview' src={currentImage}/>);
    }

    return (
      <div>
        <div className='label-text upload-label'>Upload a Plant Picture</div>

        <form onSubmit={this.props.handleSubmit}>
          <input type="file" onChange={this.props.handleImageChange} />
          <br/>
          {$imagePreview}
          <br/>
          <br/>
          <span className='button-right'>
            <span><button className='white-button' onClick={this.props.closeModal}>CANCEL</button></span>
            <button className='pianta-button button-right' type="submit" onClick={this.props.handleSubmit}>SUBMIT</button>
          </span>
        </form>
      </div>
    )
  }
 }

export default ImageUpload;
