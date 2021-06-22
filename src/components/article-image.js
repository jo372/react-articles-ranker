import React from "react";

export class ArticleImage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            url: ""
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        fetch(this.props.model.url)
        // TODO: catch HTTP 404 errors
        .then(response => {
            if(response.ok) {
                this.setState({
                    url: response.url
                });
            } else {
                // provide a backup image
            }
        })
    }

    render() {
        const model = this.props.model;
        // if the image is loading we need to create a div width, height and add a loading image 
        return <img width={model.width} height={model.height} src={this.state.url} alt={model.altText}/>;
    }
}

ArticleImage.defaultProps = {
    type: "",
    model: {
        url: "",
        altText: "",
        height: "",
        width: ""
    }
}
export default ArticleImage;