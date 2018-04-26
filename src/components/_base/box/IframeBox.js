import React from 'react';

const IframeBox = ({ src, height = 780, width = '100%' }) => (
    <div>
      <iframe width={width} height={height} src={src}></iframe>
    </div>
);
IframeBox.propTypes = { src: React.PropTypes.string.isRequired };

export default IframeBox;
