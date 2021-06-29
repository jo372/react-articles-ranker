import axios, { CancelTokenSource } from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AppConfig } from "../../app/AppConfig";

// creating an interface which holds the image properties, all url, altText, height and width are required by default.
export interface ImageProps {
    url?: string,
    altText?: string,
    width?: string,
    height?: string
}

// creating an element for the loading warning
const LoadingWarning : React.FC<{width: string, height: string}> = ({
    width = "0",
    height = "0"
}) => {
    return <div className={"loading-container centered"} style={{
        background: '#ccc',
        maxWidth: `${width}px`,
        width: "100%",
        height: `${height}px`
    }}>
        <div className={"loading-icon-container"}>
            <AiOutlineLoading3Quarters className={"loading-icon"}/>
        </div>
    </div>
}

// declaring this variable so I can change it later if needed, instead of writing AppConfig.fallbackImageURL everywhere.
const fallbackImageURL = AppConfig.fallbackImageURL;
// a variable which will hold the regex filter used later to test if the responseURL is an image or not.
const regexFilter : RegExp = new RegExp('image\/(png|jpeg|gif|bmp|vnd.microsoft.icon|tiff|svg\+xml)', 'gi');

// creating a reaction functional component
export const Image : React.FC<ImageProps> = ({
    url = "",
    altText = "",
    width = "0",
    height = "0"
}) => {
    // creating status that will allow us to know if the image is loading, get the image url (this is if the image is not a jpg, png etc).
    const [isLoading, setLoading] = useState<boolean>(false);
    const [imageURL, setImageURL] = useState<string>("");
    const [error, setError] = useState<Error | string>("");

    // creating a variable which will hold our axios cancel token, just incase it ever needs to be stubbed.
    let axiosCancelSource: CancelTokenSource;
    // this will hold track of the component mount status
    let componentMounted  = true;

    // creating a asynchronus function which will update our cancel source token and returns an Promise<AxiosResponse<any>>
    const getData = async() => {
        axiosCancelSource = axios.CancelToken.source();
        return await axios.get(url, { cancelToken: axiosCancelSource.token});
    }

    useEffect(() => {
        // setting the loading status to true
        setLoading(true);
        // getting the data asynchronously
        getData()
        .then((response) => {
            // if the component is mounted, get the content type of the url, check the filter and return either the response url or the fall back image (Error 404)
            if(componentMounted) {  
                const contentType = response.headers['content-type'];
                const responseURL = response.request.responseURL;


                // TODO: fix the regex as it's throwing false positives, currently just give back the responseURL. Otherwise we'd give a fallback image if it's of an invalid type.
                // const responseURL = regexFilter.test(contentType) ? response.request.responseURL : fallbackImageURL;
                
                // // setting the image to the image source 
                setImageURL(responseURL);
                // // the image isn't loading anymore, update the state.
                setLoading(false);
            }
        })
        .catch((err: Error) => {
            // if the component is mounted, stop the connection to the url, update the image url, set the error state and stop loading.
            if(componentMounted) {
                setError(err);
                axiosCancelSource.cancel(`Cancelling axios request an error occured: ${err}`);
                setImageURL(fallbackImageURL);
                setLoading(false);
            }
        });

        return(() => {
            componentMounted = false;
        });
    }, []);

    // creating the loaded element which will be display and the warning element. If the element is loading, we'll return the loading warning else the loaded image!
    const loadedElement = <img style={{maxWidth : `${width}px`, width: "100%"}} height={height} src={imageURL} alt={altText} className={"image-responsive centered"} loading={"lazy"}/>;
    const loadingWarningElement = <LoadingWarning width={width} height={height}/>    
    return isLoading ? loadingWarningElement : loadedElement;
}

export default Image;