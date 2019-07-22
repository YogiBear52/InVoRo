import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import VoteComponent from './Vote.component';

describe("VoteComponent", () => {
    let voteComponent: ReactWrapper;

    describe("Star Icon rendered when isVoted is true", () => {
        beforeEach(() => {
            let props = {
                isVoted: true,
                voteHandle: () => { },
                unvoteHandle: () => { },
            };
            voteComponent = mount(<VoteComponent {...props} />);
        });

        it("isVoted true Exactly one icon is rendered", () => {
            const icons = voteComponent.find("IconButton");
            expect(icons.length).toBe(1);
        });

        it("Full star when isVoted is true", () => {
            const voteIcon = voteComponent.find("VoteIconComponent");
            expect(voteIcon.length).toBe(1);
        });
    });
    describe("Star Icon rendered when isVoted is false", () => {
        beforeEach(() => {
            let props = {
                isVoted: false,
                voteHandle: () => { },
                unvoteHandle: () => { },
            };
            voteComponent = mount(<VoteComponent {...props} />);
        });

        it("isVoted false Exactly one icon is rendered", () => {
            const icons = voteComponent.find("IconButton");
            expect(icons.length).toBe(1);
        });

        it("Empty star when isVoted is false", () => {
            const unvoteIcon = voteComponent.find("UnvoteIconComponent");
            expect(unvoteIcon.length).toBe(1);
        });
    })

    describe("Star clicked", () => {
        let result: string;
        const VOTED = "voted";
        const UNVOTED = "unvoted";

        beforeEach(() => {
            let props = {
                isVoted: false,
                voteHandle: () => { result = VOTED },
                unvoteHandle: () => { result = UNVOTED },
            };
            voteComponent = mount(<VoteComponent {...props} />);
        });

        it("OnClick when isVoted true calls unvoteHandle", () => {
            let props = {
                isVoted: false,
                voteHandle: () => { result = VOTED },
                unvoteHandle: () => { result = UNVOTED },
            };
            voteComponent = mount(<VoteComponent {...props} />);

            voteComponent.simulate('click');
            expect(result).toBe(VOTED);
        });

        it("OnClick when isVoted false calls voteHandle", () => {
            let props = {
                isVoted: true,
                voteHandle: () => { result = VOTED },
                unvoteHandle: () => { result = UNVOTED },
            };
            voteComponent = mount(<VoteComponent {...props} />);

            voteComponent.simulate('click');
            expect(result).toBe(UNVOTED);
        });
    });
});