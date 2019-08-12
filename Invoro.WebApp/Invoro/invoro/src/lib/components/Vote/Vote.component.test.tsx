import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import VoteComponent from './Vote.component';

describe("VoteComponent", () => {
    let voteComponent: ReactWrapper;

    describe("Vote Icon rendered", () => {
        describe("when isVoted is true", () => {
            beforeEach(() => {
                let props = {
                    isVoted: true,
                    voteHandle: () => { },
                    unvoteHandle: () => { },
                };
                voteComponent = mount(<VoteComponent {...props} />);
            });

            it("Exactly one icon is rendered", () => {
                const icons = voteComponent.find("IconButton");
                expect(icons.length).toBe(1);
            });

            it("Correct icon rendered", () => {
                const voteIcon = voteComponent.find("VoteIconComponent");
                expect(voteIcon.length).toBe(1);
            });
        });

        describe("when isVoted is false", () => {
            beforeEach(() => {
                let props = {
                    isVoted: false,
                    voteHandle: () => { },
                    unvoteHandle: () => { },
                };
                voteComponent = mount(<VoteComponent {...props} />);
            });

            it("Exactly one icon is rendered", () => {
                const icons = voteComponent.find("IconButton");
                expect(icons.length).toBe(1);
            });

            it("Correct icon rendered", () => {
                const unvoteIcon = voteComponent.find("UnvoteIconComponent");
                expect(unvoteIcon.length).toBe(1);
            });
        });
    });

    describe("Vote icon clicked", () => {
        let result: string;
        const VOTED = "voted";
        const UNVOTED = "unvoted";

        it("When isVoted false calls voteHandle", () => {
            let props = {
                isVoted: false,
                voteHandle: () => { result = VOTED },
                unvoteHandle: () => { result = UNVOTED },
            };
            voteComponent = mount(<VoteComponent {...props} />);

            voteComponent.simulate('click');
            expect(result).toBe(VOTED);
        });

        it("When isVoted true calls unvoteHandle", () => {
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