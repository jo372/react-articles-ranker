import TextItem, { TextItemProps, TextItemType } from './TextItem';
import { create } from 'react-test-renderer';

describe('default constructor, no parameters passed', () => {
    const component = create(<TextItem />)
    const instance = component.getInstance();
    const props = instance?.props;

    it(`should set the type to ${TextItemType.PARAGRAPH} by default`, () => {
        expect(props?.type).toEqual(TextItemType.PARAGRAPH);
    });

    it('should set the text to BLANK', () => {
        expect(props?.text).toEqual("");
    });

    it('should create a paragraph element', () => {
        expect(component.toTree()?.rendered?.type).toEqual("p");
    });
});

describe('it should set the parameters when passed', () => {
    const expectedProps : TextItemProps = {
        type: TextItemType.HEADING,
        text: "This is a test!"
    };

    const component = create(<TextItem {...expectedProps}/>);
    const instance = component.getInstance();
    const props = instance?.props;

    it(`should set the type to ${expectedProps.type}`, () => {
        expect(props?.type).toEqual(expectedProps.type);
    });

    it(`should set the text to ${expectedProps.text}`, () => {
        expect(props?.text).toEqual(expectedProps.text);
    });

    it('should create a header element', () => {
        expect(component.toTree()?.rendered?.type).toEqual("h1");
    });
});
