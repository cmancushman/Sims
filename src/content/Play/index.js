import React from 'react';
import { connect } from 'react-redux';
import type { ComponentType } from 'react';
import _ from 'lodash';
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

const data = [
    {
        label: 'Kitchen',
        value: 'searchmetoo',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Cook a meal',
                value: 'anonymous',
                tagClassName: 'selected-item',
            },
        ],
    },
];



type Props = {
};

export class Play extends React.Component<Props> {
    render(): Node {
        return (
            <div className='flex-row full-width'>
                <DropdownTreeSelect mode='radioSelect' data={data} onChange={_.noop} onAction={_.noop} onNodeToggle={_.noop} />
                <button style={{width: 150, marginLeft: 20}} title={'Confirm Vote'}>Confirm Vote</button>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const connected: ComponentType<Props> = connect(mapStateToProps, {})(Play);
export default connected;