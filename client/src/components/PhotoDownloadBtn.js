import {MdFileDownload} from "react-icons/md"

const PhotoDownloadBtn = ({ photoId }) => {
    const handleDownload = async () => {
      const response = await fetch(`/photos/download/${photoId}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = response.headers.get('content-disposition').split('filename=')[1];
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <button onClick={handleDownload} className="btn btn-sm btn-active"><MdFileDownload />Download Photo</button>
    );
  };

export default PhotoDownloadBtn;