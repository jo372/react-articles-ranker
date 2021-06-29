import { mount, shallow } from "enzyme";
import Image, { ImageProps } from "./Image";

describe('no properties passed, default constructor', () => {
   
    it('it should render with default values', () => {        
        const wrapper = shallow(<Image />);
        const props = wrapper.props();

        expect(props.style.maxWidth).toEqual("0px");
        expect(props.src).toEqual("");
        expect(props.alt).toEqual("");
        expect(props.height).toEqual("0");        
    });

});

describe('properties passed', () => {
    
    const expectedProps : ImageProps = {
        url: "non-existent-url.jpg",
        altText: "some cool test text",
        width: "1280",
        height: "720"
    }
    const component = shallow(<Image {...expectedProps} />);
    const props = component.props();

    test(`it should set the altText to ${expectedProps.altText}`, () => {
        expect(props.alt).toEqual(expectedProps.altText);
    });

    test(`it should set the maxWidth to ${expectedProps.width}`, () => {
        expect(props.style.maxWidth).toEqual(`${expectedProps.width}px`);
    });
    
    test(`it should set the height to ${expectedProps.height}`, () => {
        expect(props.height).toEqual(expectedProps.height);
    });

    test(`it should set the url to ${expectedProps.url}`, () => {
        const comp = mount(<Image {...expectedProps} />);
        expect(comp.props().url).toEqual(`${expectedProps.url}`);
    });
});


// TODO: write a test that allows me to confirm that the fallback image url has been set.

// describe('when the url is invalid, it should set a fallback image url.', () => {
    
//     const expectedProps : ImageProps = {
//         url: "/non-existent-url.jpg",
//         altText: "some cool test text",
//         width: "1280",
//         height: "720"
//     }
    
//     const component = create(<Image url={expectedProps.url} altText={expectedProps.altText} width={expectedProps.width} height={expectedProps.height} />)
//     const instance = component.getInstance();
//     const actualProps = instance?.props;
//     const fallbackImageURL = AppConfig.fallbackImageURL;

//     test(`the image url should equal to the fallback url => ${fallbackImageURL}`, async() => {
//         // expect(wrapper.state('url')).toEqual(fallbackImageURL);
//         // const wrapper = await mount(<Image {...expectedProps} />);
//         // wrapper.update();
//         // console.log(wrapper.state());

//         const wrapper = render(<Image {...expectedProps} />);
        
        
//         // expect(wrapper.state("url")).toEqual(fallbackImageURL);
//     });
// });