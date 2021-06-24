import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './List';
import { create, ReactTestInstance, ReactTestRendererJSON } from 'react-test-renderer';

// creating a test for our list item, testing default constructor and if the properties are pass are they set.
describe('no properties passed, default constructor', () => {
   
    const component = create(<List />)
    const instance = component.getInstance();
    const items = instance?.props.items;

    test('it should be an unordered list', () => {
        expect(instance?.props.type).toEqual(List.type.UNORDERED);
    });

    test('it should contain no child elements (items)', () => {
        expect(Array.isArray(items)).toEqual(true);
        expect(items.length).toEqual(0);
    });
});

describe('properties passed', () => {
  
    test('type - it should be an ordered list when type property is passed', () => {
        const expectedType = List.type.ORDERED;
        const component = create(<List type={expectedType}/>);
        const instance = component.getInstance();
        expect(instance?.props.type).toEqual(expectedType);
        expect(instance?.props.items).toEqual([]);
    });

    test('items - it should contain the requested list through props (items)', () => {
        const items = [
            "Hello World",
            "Something",
            "test"
        ]
        const component = create(<List items={[...items]}/>);
        const root = component.root;        
        const testResult = root.findAllByType("li").every(item => items.includes(item.children[0].toString()));
        
        expect(testResult).toEqual(true);
    });
});

  