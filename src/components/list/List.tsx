import React from "react";

// creating a list type which is just an enum with the string value as I can updated this whenever I should need to.
enum ListType {
    ORDERED = "ordered",
    UNORDERED = "unordered"
}

// creating the list properties which should contain the type (ListType) and the items you want to add string[]
interface ListProps {
    type: ListType,
    items: string[]
}

class List extends React.Component<ListProps> {
    // assigning type on list to be the same as the enum created above so users who import List can just use List.type.UNORDERED
    static type = ListType;
    // setting the default to unordered as it the most common list type used with not item attached.
    static defaultProps = {
        type: ListType.UNORDERED,
        items: []
    }
    render() {
        const { type, items } = this.props;

        // looping through and generating a unique key for the list items.
        const listElements = items.map((itemText, index) => <li key={`${itemText}_${new Date().getTime()}_${index}`}>{ itemText }</li>);
        // depending on the ListType depends on what the parent container will be.
        

        // temporary fix to the warning about unreachable code
        let obj; 
        switch(type) {
            case ListType.ORDERED:
                obj = <ol>{listElements}</ol>
                break;
            case ListType.UNORDERED:
                obj = <ul>{listElements}</ul>
                break;
        }

        return obj;
    }
}

export default List;
