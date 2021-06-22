export function ArticleParagraph(props) {
    return <p> { props.model.text } </p>
}

ArticleParagraph.defaultProps = {
    model : {
        text: ""
    }
}
export default ArticleParagraph;