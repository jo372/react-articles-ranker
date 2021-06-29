import React from "react";

// this class was creating because paragraph and heading are identical in design therefore we'll have one class deal with text items.
export interface TextItemProps {
    type: TextItemType // the current implemented types for this class, obviously this can be expanded at a later date.
    text: string
}

// creating an enum so I don't have anyone mess up writing string and I can change it in one place.
export enum TextItemType {
    PARAGRAPH = "paragraph",
    HEADING = "heading"
}

export class TextItem extends React.Component<TextItemProps> {
    // setting the default props to be a paragraph item with no text
    static defaultProps = {
        type: TextItemType.PARAGRAPH,
        text: ""
    }
    // creating and returning the item back to whatever called it.
    render() {
        const { type, text } = this.props;

        let el; 
        switch(type) {
            case TextItemType.PARAGRAPH:
                el = <p>{ text }</p>;
                break;
            case TextItemType.HEADING:
                el = <h1>{ text }</h1>;
                break;
        } 
        return el;
    }
}

export default TextItem;