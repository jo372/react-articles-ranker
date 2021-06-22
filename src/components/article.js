import React from "react";
import ArticleHeading from "./article-heading";
import ArticleImage from "./article-image";
import ArticleList from "./article-list";
import ArticleParagraph from "./article-paragraph";
import { ArticleType } from "./article-type";

export class Article extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isLoading: false,
            error : null
        }
    }

    getArticleData() {
        this.setState({
            isLoading: true
        });

        fetch(`${process.env.PUBLIC_URL}/data/article-2.json`)
        // TODO: catch HTTP 404 errors, not point in continuing with response.json() if the response isn't event reachable.
        .then(response => response.json())
        .then(result => {
            this.setState({ 
            data: result, 
            isLoading: false
        })})
        .catch(error => this.setState({
            error, 
            isLoading : false
        }));
    }

    createComponent(type, model, key) {
        switch(type) {
            case ArticleType.PARAGRAPH: // replace this with a static constant instead of using strings, this might change in the future and it's not great practice.
                return <ArticleParagraph key={key} model={model}/>
                break;
            case ArticleType.HEADING:
                return <ArticleHeading model={model}/>
                break;
            case ArticleType.IMAGE:
                return <ArticleImage model={model}/>
                break;
            case ArticleType.LIST:
                return <ArticleList model={model} />
                break;
        }
    }

    componentDidMount() {
        this.getArticleData();
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            isLoading : false
        })
    }

    render() {
        const { data, isLoading, error } = this.state;
        const body = data.body ?? [];
       
        let components = [] ;

        if(error) {
            return <p>{error.message}</p>;
        }

        if(isLoading) {
            return <p>Loading ...</p>;
        }

        // // checking if the body exists is an array and has content.
        if(body && Array.isArray(body) && body.length > 0) {
            components = body.map((item, index) => this.createComponent(item.type, item.model, `${item.type}_${new Date().getTime()}_${index}}`)); 
        }        

        console.log(components);
        return (<div>
            { components }
        </div>);
    } 
}

export default Article;
