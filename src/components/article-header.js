export function ArticleHeader(props) {
    return <h1> {props.model.text} </h1>
}

ArticleHeader.defaultProps = {
    type: "heading",
    model: {
        text: ""
    }
}

export default ArticleHeader;