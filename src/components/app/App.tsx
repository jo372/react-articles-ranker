import axios from "axios";
import React, { ReactElement, useState } from "react";
import Article, { ArticleData, ArticleItem } from "../article/Article";
import ArticlePreview from "../article/ArticlePreview";
import Image from "../image/Image";
import ScrollToTopButton from "../scroll-to-top/scrollToTopButton";
import { TextItemType } from "../text-item/TextItem";

// an array of article id's you want to load, this would be replaced with a GET Request if it was implemented on an actual website or passed through.
interface AppProps {
    articleIds: Array<number> // an array of article ids you want to load. Note: the numbers need to match those in the public/data folder. Example: article-{id}.json will get article of that id.
}

interface AppState {
    articles: Array<ReactElement<Article>>, // an array of react elements which are the articles we will create later
    currentArticle: ReactElement<Article> | null, // creating a state which will hold the current article, this will be updated when the user clicks on the screen.
    articlePreviews: Array<ReactElement<ArticlePreview>> // an array of react elements (article previews) which are the links at the bottom of the page
    error: Error | string // the error to be displayed.
}

export class App extends React.Component<AppProps, AppState> {
    // setting the default properties.
    static defaultProps = {
        articleIds: []
    }

    constructor(props: AppProps) {
        super(props);
        // setting the default states
        this.state = {
            articles: [],
            articlePreviews: [],
            currentArticle: null,
            error: ""
        }
    }

    /**
     * @param {number} id the id of the article you want to fetch.
     */
    fetchArticle(id: number) {
        axios.get(`${process.env.PUBLIC_URL}/data/article-${id}.json`)
        .then(response => {

            const key : string = `${Article.name}_${response.data.title}_${this.state.articles.length}`;
            const article : ReactElement<Article> = <Article key={key} data={response.data}/>;
            
            // const test = data.filter((obj : ArticleItem) => obj.type === Image.name.toLowerCase() || obj.type === TextItemType.PARAGRAPH);
            
            const articlePreview = this.createArticlePreview(key, response.data);
            this.setState({
                articles: [...this.state.articles, article],
                articlePreviews: [...this.state.articlePreviews, articlePreview]
            });
        })
        .catch((err: Error) => {
            this.setState({ error: err })
            console.error("Error fetching data: ", err);
        });
    }

    /** a function which is used to force the user to scroll to the top of the page. If I had extra time, I would make this a functional component and use the UseEffect */
    scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    }

    /**
     * @param {string} parentKey the key of the parent (article)
     * @param {ArticleData} data the data you want the article preview to display
     * @return a ArticlePreview React Element
     */
    createArticlePreview(parentKey: string, data: ArticleData) : ReactElement<ArticlePreview> {
        // getting the body from the data provided.
        const { body } = data;

        // getting the first image and text from the article to display as a preview button (fake link).
        // TODO: currently this it not implemented (at least the preview image)
        let articlePreviewImage : any = body.find((obj: ArticleItem) => obj.type === Image.name.toLowerCase());
        let articlePreviewText : any = body.find((obj: ArticleItem) => obj.type === TextItemType.PARAGRAPH);
        
        // if for some reason the image or text don't exist, we need to provide default ones.
        if(!articlePreviewImage) {
            articlePreviewImage = {
                model: {
                    url: ""
                },
                altText: "No Image Found (Warning)"
            }
        }

        // getting the preview text otherwise just returning blank.
        const articleText = articlePreviewText.model.text ?? "";
        
        //returning the article preview back to whatever called it.
        return <ArticlePreview key={`${ArticlePreview.name}_${data.title}_${this.state.articles.length}`} className={"article-preview"} title={ data.title } url={articlePreviewImage.model.url} altText={articlePreviewImage.altText}  previewText={articleText} clickHandler={() => {
            // looking for the parent article 
            const requestedArticle : ReactElement<Article> | undefined = this.state.articles.find(article => article.key === parentKey);
    
            // if for some reason it didn't exist, we need to check for existence.
            if(requestedArticle) {

                // TODO: remove this completely and switch to a React.FC component and useEffet to window scroll instead.
                // Also note, this doesn't work 100% of the time, so this is another reason I might change it at a later date.
                
                this.scrollToTop();
                // setting the current article to the parent!
                this.setState({
                    currentArticle: requestedArticle
                });
            } else {
                this.setState({
                    error: `unabled to find parent with key ${parentKey}`
                });
            }
        }}/>
    }

    componentDidMount() {
        // looping through the ids passed in and fetching the article data
        this.props.articleIds.map((id: number) => this.fetchArticle(id)); 
    }

    render() {
        // using a nullish coalescing to see if the current article was set (in theory this should only ever happen on component mount).
        const article = this.state.currentArticle ?? this.state.articles[0];
        return (
            <section>
                { article }
                <div className={"article-preview-list"}>
                    { this.state.articlePreviews }
                </div>
                <ScrollToTopButton/>
            </section>
        );
    }
}

export default App;
