import React from "react";

// creating an interface which holds the image properties, all url, altText, height and width are required by default.
interface ImageProps {
    url: string,
    altText: string,
    height: string,
    width: string
}

// creating an image interface which holds state data, is loading and url (considering the url is meant to return a random image but because how react renders all images were the same before with the normal src{this.props.url})
interface ImageState {
    isLoading: boolean,
    url: string
}

// the image class for our react component
export class Image extends React.Component<ImageProps, ImageState> {
    // setting default properties for our react object, blank url, blank alt text, no height or width.
    static defaultProps = {
        url: "",
        altText: "",
        height: "0",
        width: "0"
    }

    constructor(props: ImageProps) {
        super(props);
        // setting the default state, I wanted to have the url outside of the state considering it's nothing to do with the state of the object, but I haven't figure that out yet.
        this.state = {
            isLoading: false,
            url : ""
        }
    }

    // if the component did mount, we're loading the image! woo. 
    componentDidMount() {
        this.setState({
            isLoading: true
        });

        // attempting to fetch the ur, checking if the response is okay other we have an error. oh no :(. We'll provide a backup image like error 404 image not found.
        fetch(this.props.url)
        // TODO: catch HTTP 404 errors
        .then(response => {
            if(response.ok) {
                this.setState({
                    url: response.url,
                    isLoading: false
                });
            } else {
                // provide a backup image
            }
        })
    }

    // returning the image back to the user!
    render() {
        const { width, height, altText } = this.props;
        const { url } = this.state;
        // if the image is loading we need to create a div width, height and add a loading image 
        return <img width={width} height={height} src={url} alt={altText} className={"image-responsive"}/>;
    }
}

export default Image;