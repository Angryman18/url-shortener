import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useReadData from "./useReadData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:params' element={<RedirectComp />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

const Home = () => {
  const [url, setUrl] = useState("");
  const { writeData } = useReadData();
  const [{ loading, write, uniqueId }, setStatus] = useState({
    loading: false,
    write: false,
    uniqueId: "",
  });

  const validateURL = (url) => {
    const validURL = url.startsWith("https://") || url.startsWith("http://");
    if (validURL) return url;
    return `https://${url}`;
  };

  // const getALlData = () => {
  //   const starCountRef = ref(database, 'data');
  //   onValue(starCountRef, (snapshot) => {
  //     const dataExistence = snapshot.exists();
  //     console.log(snapshot.val());
  //   });
  // };

  // console.log(getALlData());

  const handleGenerate = async (e) => {
    if (!url) {
      return;
    }
    const uniqueId =
      new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
    try {
      setStatus({ loading: true, write: false });
      await writeData(uniqueId, validateURL(url));
      setStatus({ loading: false, write: true, uniqueId });
      setUrl("");
    } catch (err) {
      setStatus({ loading: false, write: false });
    }
  };

  return (
    <div className='flex items-center mt-20 text-center flex-col gap-y-4'>
      <div className=' text-4xl mx-auto text-orange-600 drop-shadow-sm font-bold'>
        URL Shortener
      </div>
      <div className=''>
        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='rounded-md outline-none border-2 text-xl py-1 px-2'
        />
      </div>
      <div>
        <button
          type='submit'
          className={`
            ${
              loading
                ? "bg-[#444444] text-white pointer-events-none"
                : "bg-[#92400e] text-white"
            }
              px-4 py-2 text-xl rounded-md
          `}
          disabled={loading}
          onClick={handleGenerate}
        >
          {loading ? "Please Wait.." : "Generate"}
        </button>
      </div>
      <ShowURL write={write} uniqueId={uniqueId} />
    </div>
  );
};

const ShowURL = ({ write, uniqueId }) => {
  if (!write) {
    return null;
  }

  const constructURL = `${window.location.origin}/${uniqueId}`;

  return (
    <div>
      <a
        className='text-blue-600 hover:underline focus:underline active:underline'
        rel='noreferrer'
        target='_blank'
        href={constructURL}
      >
        {constructURL}
      </a>
    </div>
  );
};

const RedirectComp = () => {
  const { params } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { readData } = useReadData();

  const getData = useCallback(readData, [readData]);

  useEffect(() => {
    if (params) {
      (async () => {
        try {
          setLoading(true);
          const res = await getData(params);
          window.location.href = new URL(res?.url);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [getData, params]);

  if (loading) {
    return "Loading";
  }

  if (error) {
    return error;
  }

  return "";
};

export default App;
