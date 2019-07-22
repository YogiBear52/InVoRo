import React from 'react';
import { mount, shallow, ReactWrapper } from 'enzyme';
import StatusComponent from './Status.component';
import Status from '../../dataModel/Status';

describe("StatusComponent", () => {
    it("when status is NotPlanned, the label is corresponding", () => {
        // Prepare
        let props = {
            status: Status.NotPlanned
        };

        // Action
        let statusComponent: ReactWrapper = mount(<StatusComponent {...props} />);

        // Assert
        const chip = statusComponent.find("Chip");
        expect(chip.prop('label')).toBe("Not Planned");
    });

    it("when status is Planned, the label is corresponding", () => {
        // Prepare
        let props = {
            status: Status.Planned
        };

        // Action
        let statusComponent: ReactWrapper = mount(<StatusComponent {...props} />);

        // Assert
        const chip = statusComponent.find("Chip");
        expect(chip.prop('label')).toBe("Planned");
    });

    it("when status is InProgress, the label is corresponding", () => {
        // Prepare
        let props = {
            status: Status.InProgress
        };

        // Action
        let statusComponent: ReactWrapper = mount(<StatusComponent {...props} />);

        // Assert
        const chip = statusComponent.find("Chip");
        expect(chip.prop('label')).toBe("In Progress");
    });

    it("when status is ReadySoon, the label is corresponding", () => {
        // Prepare
        let props = {
            status: Status.ReadySoon
        };

        // Action
        let statusComponent: ReactWrapper = mount(<StatusComponent {...props} />);

        // Assert
        const chip = statusComponent.find("Chip");
        expect(chip.prop('label')).toBe("Ready Soon");
    });

    it("when status is Released, the label is corresponding", () => {
        // Prepare
        let props = {
            status: Status.Released
        };

        // Action
        let statusComponent: ReactWrapper = mount(<StatusComponent {...props} />);

        // Assert
        const chip = statusComponent.find("Chip");
        expect(chip.prop('label')).toBe("Released");
    });
});