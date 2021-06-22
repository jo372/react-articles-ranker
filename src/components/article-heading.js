export function ArticleHeading(props) {
    return <h1> {props.model.text} </h1>
}

ArticleHeading.defaultProps = {
    type: "heading",
    model: {
        text: ""
    }
}

export default ArticleHeading;