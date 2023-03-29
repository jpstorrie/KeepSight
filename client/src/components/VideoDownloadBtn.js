const VideoDownloadBtn = ({ videoId }) => {
    const handleDownload = async () => {
        const response = await fetch(`/videos/download/${videoId}`);
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
        <button onClick={handleDownload}>Download Video</button>
    );
};

export default VideoDownloadBtn;