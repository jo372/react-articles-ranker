import React from "react";
import Image from "../image/Image";
import List from "../list/List";
import TextItem, { TextItemType } from "../text-item/TextItem";


export type ArticleData = { title: string, body: [] };

// article properties, id must be passed in. it dynamically loads the url. I might change this so you need to pass in the url so we can grab data from anywhere not just one folder.
interface ArticleProps {
    // id: number // making sure this is required by the user.
    data: ArticleData
}

// article state, data is an object which has a body (array) similar to the json format.
interface ArticleState {
    hasBeenViewed : boolean
}

/** created an interfact that is used later on so the compiler knowns there will be a type and model */
export interface ArticleItem {
    type: string,
    model: Record<string, string>
}

export class Article extends React.Component<ArticleProps, ArticleState> {
    constructor(props: ArticleProps) {
        super(props);

        // setting the default state of our react object, the body is a blank array. nothing is loading and there should be absolutely no errors.
        this.state = {
            hasBeenViewed: false
        }
    }

    /**
     * @param {string} type the type of component you want to create, every component has their own types e.g. "image", "heading", "paragraph"
     * @param {Record<string, string>} model the properties that you want to provide the currently object
     * @param {string=} key the randomly generated key you want to provide. 
     * @returns {React.Component} the created component
    */
    createComponent(type: string, model: any, key: string) {

        // created a simple switch statement which creates the item depending on component type.
        
        // TODO: replace this with a static constant instead of using strings, this might change in the future and it's not great practice.
       
        let component; 
        switch(type) {
            case "paragraph": 
                component = <TextItem key={ key } type={ TextItemType.PARAGRAPH } text={ model.text }/>
                break;  
            case "heading":
                component = <TextItem key={ key } type={ TextItemType.HEADING } text={ model.text }/>
                break;
            case "image":
                const { url, altText, width, height } = model;
                component = <Image key={ key } url={ url } altText={ altText } width={ width } height={ height }/>
                break;
            case "list":
                component = <List key={ key } items={ model.items } />
                break;
        }
        return component;
    }

    /**
     * Note: this is not implemented yet.
     * @param {boolean} viewed if you want the article to have a view status or not 
     */
    hasViewedArticle(viewed: boolean) {
        this.setState({
            hasBeenViewed: viewed
        });
    }

    render() {

        // getting the data, isLoading and error from state
        const { data } = this.props;
        // if for some reason there is still no body or someone passes null, setting it back to default.
        const body = data.body;
       
        let components = null; 

        // checking if the body exists is an array and has content.
        if(body && Array.isArray(body) && body.length > 0) {
            components = body.map((item: ArticleItem, index) => this.createComponent(item.type, item.model, `${item.type}_${new Date().getTime()}_${index}`)); 
        }        
        
        // returning a div which contains our article! might change the className to a static class which holds the css names (not sure about the best practice for this)
        return (<article className={"container"}> 
            { components }
        </article>);
    } 
}

export default Article;