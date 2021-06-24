import React from "react";
import Image from "../image/Image";
import List from "../list/List";
import TextItem, { TextItemType } from "../text-item/TextItem";

// article properties, id must be passed in. it dynamically loads the url. I might change this so you need to pass in the url so we can grab data from anywhere not just one folder.
interface ArticleProps {
    id: number // making sure this is required by the user.
}

// article state, data is an object which has a body (array) similar to the json format.
interface ArticleState {
    data: {
        body: []
    },
    isLoading: boolean,
    error: Error | null
}

/** created an interfact that is used later on so the compiler knowns there will be a type and model */
interface ArticleItem {
    type: string,
    model: Record<string, string>
}


export class Article extends React.Component<ArticleProps, ArticleState> {
    constructor(props: ArticleProps) {
        super(props);

        // setting the default state of our react object, the body is a blank array. nothing is loading and there should be absolutely no errors.
        this.state = {
            data: {
                body: []
            },
            isLoading: false,
            error: null
        }
    }

    // creating a private function which is called in did component mount as we only ever want to make one request. The task requires No actual server logic is required -feel free to stub any HTTP requests with a local, asynchronous function so this might change in the future.
    private fetchArticleData() {
         // setting the state to loading, as we're about to prepare for asynchrous data collection.
        this.setState({
            isLoading: true
        });

        // attempting to fetch the "data" from the requested url.
        fetch(`${process.env.PUBLIC_URL}/data/article-${this.props.id}.json`)
        // TODO: catch HTTP 404 errors, not point in continuing with response.json() if the response isn't event reachable.
        .then(response => response.json())
        .then(result => {
            this.setState({ 
                data: result, 
                isLoading: false
            });
        })
        .catch(error => {
            // setting the error property within our state as we have an error we need to either display or log.
            this.setState({
                error, 
                isLoading : false
            })
        });
    }

    /**
     * @param {string} type the type of component you want to create, every component has their own types e.g. "image", "heading", "paragraph"
     * @param {Record<string, string>} model the properties that you want to provide the currently object
     * @param {string=} key the randomly generated key you want to provide. 
     * @returns {React.Component} the created component
    */
    createComponent(type: string, model: any, key?: string) {

        // created a simple switch statement which creates the item depending on component type.
        
        // TODO: eplace this with a static constant instead of using strings, this might change in the future and it's not great practice.
        switch(type) {
            case "paragraph": 
                return <TextItem key={ key } type={ TextItemType.PARAGRAPH } text={ model.text }/>
                break;  
            case "heading":
                return <TextItem type={ TextItemType.HEADING } text={ model.text }/>
                break;
            case "image":
                const { url, altText, width, height } = model;
                return <Image url={ url } altText={ altText } width={ width } height={ height }/>
                break;
            case "list":
                return <List items={ model.items } />
                break;
        }
    }
    
    componentDidMount() {
        this.fetchArticleData();
    }

    // componentDidCatch(error: any, errorInfo : any) { // don't like the fact i'm using any, I need to research their actual types instead.
    //     this.setState({
    //         error,
    //         isLoading : false
    //     })
    // }

    render() {

        // getting the data, isLoading and error from state
        const { data, isLoading, error } = this.state;

        // if for some reason there is still no body or someone passes null, setting it back to default.
        const body = data.body ?? [];
       

        let components = null; 

        // checking if the body exists is an array and has content.
        if(body && Array.isArray(body) && body.length > 0) {
            components = body.map((item: ArticleItem, index) => this.createComponent(item.type, item.model, `${item.type}_${new Date().getTime()}_${index}}`)); 
        }        
        
        // if there is an error display it, this will be changed to logging because the less we show the user the better also better for cyber security.
        if(error) {
            return <p>{error.message}</p>;
        }

        // TODO: change this to a loading animation, we already have the width and height of the container. We could create a grey box with a loading icon in the middle.
        if(isLoading) {
            return <p>Loading ...</p>;
        }

        // returning a div which contains our article! might change the className to a static class which holds the css names (not sure about the best practice for this)
        return (<div className={"article"}> 
            { components }
        </div>);
    } 
}

export default Article;