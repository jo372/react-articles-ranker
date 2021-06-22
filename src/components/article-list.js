export function ArticleList(props) {
    if(props.model.type === "unordered") {
        return <ul>
            { props.model.items.map((itemText, index) => <li key={`${itemText}_${new Date().getTime()}_${index}`}>{itemText}</li>) }
        </ul>
    }

    if(props.model.type === "ordered") {
        return <ol>
            { props.model.items.map((itemText, index) => <li key={`${itemText}_${new Date().getTime()}_${index}`}>{itemText}</li>) }
        </ol>
    }
}

ArticleList.defaultProps = {
    type: "",
    model: {
        type: "unordered",
        items: []
    }
}
export default ArticleList;
