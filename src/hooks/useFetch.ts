import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";

type fetchFuctions = (
  url: any | null,
  options?: {
    method: string,
    headers: {
      Accept: 'application/json' | 'application/xml' | 'text/plain' | 'text/html' | '*/*',
      'Content-Type': 'application/json',
    },
    body: object;
  }) => any;

let signal:any = null
export const useFetch: fetchFuctions = (url, options) => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState<any>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const doFetch: fetchFuctions = async (url, options) : Promise<any> => {
    // console.log("Hacer fetch de ", url);
    setError(false);
    setLoading(true);
    try {
      // const token = getCookie("token") || null;
      // if(!token) throw 'token no encontrado';

      const bodyOpts = options?.method === 'POST' || options?.method === 'PUT' ? {
        body: JSON.stringify(options?.body)
      } : {}
      console.log("bodyOpts", bodyOpts);


      const res = await fetch(url, {
        method: options?.method || 'GET',
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
          // "Accept": "text/plain"
          // 'Authorization': `Bearer ${token}`,
        },
        ...bodyOpts
      })
      const json = await res.json();
      console.log("json", json)
      if (!signal.aborted) {
        setResponse(json);
        console.log("return", json)
        return json;
      }
    } catch (e) {
      if (!signal.aborted) {
        setError(e);
        return e;
      }

    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }

  useEffect(()=>{
    const abortController = new AbortController();
    signal = abortController.signal;

    if(url) doFetch(url, options);
    return () => abortController.abort();

  }, []);

  return { response, error, loading, doFetch };
}
