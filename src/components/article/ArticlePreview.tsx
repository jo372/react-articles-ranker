import React, { MouseEventHandler } from "react";
import Image, { ImageProps } from "../image/Image";

interface ArticlePreviewProps extends ImageProps {
    title?: string, // the title of the article preview
    previewText?: string, // the preview text of the article preview
    clickHandler?: MouseEventHandler<HTMLDivElement> // the click handler you want to run when the item is clicked.
}


export class ArticlePreview extends React.Component<ArticlePreviewProps & React.HTMLAttributes<HTMLDivElement>> {
    static defaultProps = {
        url: "",
        altText: "",
        title: "",
        previewText: "",
        clickHandler: () => void(0)
    }

    render() {
        const { url, altText } = this.props;

        return <div className={this.props.className} onClick={this.props.clickHandler?.bind(this)}>
            <div className={"preview-image"}>
                {/** TODO: fix this, this will always return no image, as the it doesn't return the parents (article) first image. */}
                {/* <Image url={ url } altText={ altText }/> */}
                <img className={"image-responsive"} src={`${process.env.PUBLIC_URL}/image-not-found.jpg`} alt={ altText }/>
            </div>
            <div className={"preview-details"}>
                <h1 className={"preview-title"}> { this.props.title }</h1>
                <p className={"preview-text"}> { this.props.previewText }</p>
            </div>
        </div>
    }
}


export default ArticlePreview;
