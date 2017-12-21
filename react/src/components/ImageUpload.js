import React from 'react';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let imagePreviewUrl = this.props.imagePreviewUrl;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }

    return (
      <div>
        <div>Upload a Plant Picture</div>
        <form onSubmit={this.props.handleSubmit}>
          <input type="file" onChange={this.props.handleImageChange} />
          {$imagePreview}<br/>
          <button type="submit" onClick={this.props.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
 }

export default ImageUpload;
