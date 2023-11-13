import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const [titleResult, setTitleResult] = useState(null);
  const [sizeResult, setSizeResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: "get",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      headers: {
        "X-RapidAPI-Key": "ed297c9b17msh10c7a3602ba6ffcp12b90fjsn3db98d2f0968",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
    };
    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));

    inputUrlRef.current.value = "";

    axios(options)
      .then((nam) => setTitleResult(nam.data.title))
      .catch((err) => console.log(err));

    inputUrlRef.current.value = "";

    axios(options)
      .then((siz) => setSizeResult(siz.data.filesize))
      .catch((err) => console.log(err));

    inputUrlRef.current.value = "";
  };

  return (
    <div className="app">
      <span className="logo">MP3 downloader</span>
      <section className="content">
        <h1 className="content_title">YouTube to MP3 Downloader</h1>
        <p className="content_description">
          Transform YouTube videos into MP3s in just a few clicks!
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            placeholder="Paste a Youtube video URL link..."
            className="form_input"
            type="text"
          />
          <button type="submit" className="form_button">
            Search
          </button>
        </form>
        <p className=""></p>

        {titleResult ? (
          <p className="titleDownloaded">
            Your Video: <span className="title">{titleResult}</span>{" "}
            <span>{(sizeResult / 1024 / 1024).toFixed(2)}MB</span>
          </p>
        ) : (
          ""
        )}
        {titleResult ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={urlResult}
            className="download_btn"
          >
            Download
          </a>
        ) : (
          ""
        )}
      </section>
      <div className="">
        <span className="copyright">Nurkhan Masimzada </span>
        <a className="contact " href="https://bio.link/nurxanmasimzade">
          Contact Me
        </a>
      </div>
    </div>
  );
}

export default App;
