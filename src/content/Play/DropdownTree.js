import React, { useState, useEffect, useMemo } from "react";
import 'react-dropdown-tree-select/dist/styles.css'
import DropdownTreeSelect from 'react-dropdown-tree-select'

const initialData = [
    {
        label: 'Bathroom',
        value: 'bathroom',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Complete morning routine',
                value: 'complete-morning-routine',
                tagClassName: 'selected-item',
            },
            {
                label: 'Complete evening routine',
                value: 'complete-evening-routine',
                tagClassName: 'selected-item',
            },
            {
                label: 'Use toilet',
                value: 'use-toilet',
                tagClassName: 'selected-item',
            },
            {
                label: 'Take a shower',
                value: 'take-a-shower',
                tagClassName: 'selected-item',
            },
            {
                label: 'Brush teeth',
                value: 'brush-teeth',
                tagClassName: 'selected-item',
            },
            {
                label: 'Wash hands',
                value: 'wash-hands',
                tagClassName: 'selected-item',
            },
            {
                label: 'Fix hair',
                value: 'fix-hair',
                tagClassName: 'selected-item',
            },
            {
                label: 'Switch to contacts',
                value: 'switch-to-contacts',
                tagClassName: 'selected-item',
            },
            {
                label: 'Switch to glasses',
                value: 'switch-to-glasses',
                tagClassName: 'selected-item',
            },
            {
                label: 'Shave',
                value: 'shave',
                tagClassName: 'selected-item',
            },
        ],
    },
    {
        label: 'Bedroom',
        value: 'bedroom',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Go to bed',
                value: 'go-to-bed',
                tagClassName: 'selected-item',
            },
            {
                label: 'Dress casually',
                value: 'dress-casually',
                tagClassName: 'selected-item',
            },
            {
                label: 'Dress formally',
                value: 'dress-formally',
                tagClassName: 'selected-item',
            },
            {
                label: 'Dress for cold weather',
                value: 'dress-for-cold-weather',
                tagClassName: 'selected-item',
            },
            {
                label: 'Dress for warm weather',
                value: 'dress-for-warm-weather',
                tagClassName: 'selected-item',
            },
            {
                label: 'Do the laundry',
                value: 'do-the-laundry',
                tagClassName: 'selected-item',
            },
        ],
    },
    {
        label: 'Gym',
        value: 'gym',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Run on a treadmill',
                value: 'run-on-a-treadmill',
                tagClassName: 'selected-item',
            },
            {
                label: 'Work out arms',
                value: 'work-out-arms',
                tagClassName: 'selected-item',
            },
            {
                label: 'Work out legs',
                value: 'work-out-legs',
                tagClassName: 'selected-item',
            },
            {
                label: 'Work out back',
                value: 'work-out-back',
                tagClassName: 'selected-item',
            },
            {
                label: 'Work out chest',
                value: 'work-out-chest',
                tagClassName: 'selected-item',
            },
            {
                label: 'Work out abs',
                value: 'work-out-abs',
                tagClassName: 'selected-item',
            },
        ],
    },
    {
        label: 'Kitchen',
        value: 'kitchen',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Cook breakfast',
                value: 'cook-breakfast',
                tagClassName: 'selected-item',
            },
            {
                label: 'Cook lunch',
                value: 'cook-lunch',
                tagClassName: 'selected-item',
            },
            {
                label: 'Cook dinner',
                value: 'cook-dinner',
                tagClassName: 'selected-item',
            },
            {
                label: 'Make a snack',
                value: 'make-a-snack',
                tagClassName: 'selected-item',
            },
            {
                label: 'Have a cup of coffee',
                value: 'have-a-cup-of-coffee',
                tagClassName: 'selected-item',
            },
            {
                label: 'Wash the dishes',
                value: 'wash-the-dishes',
                tagClassName: 'selected-item',
            },
            {
                label: 'Clean up counters',
                value: 'clean-up-counters',
                tagClassName: 'selected-item',
            },
            {
                label: 'Take out trash',
                value: 'take-out-trash',
                tagClassName: 'selected-item',
            },
        ],
    },
    {
        label: 'Living Room',
        value: 'living-room',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Watch A Show',
                value: 'watch-a-show',
                tagClassName: 'selected-item',
            },
            {
                label: 'Watch Youtube Videos',
                value: 'watch-youtube-videos',
                tagClassName: 'selected-item',
            },
            {
                label: 'Watch A Twitch Stream',
                value: 'watch-a-twitch-stream',
                tagClassName: 'selected-item',
            },
            {
                label: 'Play video games',
                value: 'play-video-games',
                tagClassName: 'selected-item',
            },
            {
                label: 'Read a Book',
                value: 'read-a-book',
                tagClassName: 'selected-item',
            },
            {
                label: 'Do some yoga',
                value: 'do-some-yoga',
                tagClassName: 'selected-item',
            },
            {
                label: 'Practice ab exercises',
                value: 'practice-ab-exercises',
                tagClassName: 'selected-item',
            },
            {
                label: 'Jump on the couch',
                value: 'jump-on-the-couch',
                tagClassName: 'selected-item',
            },
        ],
    },
    {
        label: 'Miscellaneous',
        value: 'miscellaneous',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Smoke a cigarette',
                value: 'smoke-a-cigarette',
                tagClassName: 'selected-item',
            },
            {
                label: 'Smoke from a vape',
                value: 'smoke-from-a-vape',
                tagClassName: 'selected-item',
            },
            {
                label: 'Have a beer',
                value: 'have-a-beer',
                tagClassName: 'selected-item',
            },
            {
                label: 'Make a mess',
                value: 'make-a-mess',
                tagClassName: 'selected-item',
            },
            {
                label: 'Take a shot',
                value: 'take-a-shot',
                tagClassName: 'selected-item',
            },
            {
                label: 'Play a drinking game',
                value: 'play-a-drinking-game',
                tagClassName: 'selected-item',
            },
            {
                label: 'Have a cocktail',
                value: 'have-a-cocktail',
                tagClassName: 'selected-item',
            },
            {
                label: 'Drink a gallon of milk',
                value: 'drink-a-gallon-of-milk',
                tagClassName: 'selected-item',
            },
            {
                label: 'Eat an onion',
                value: 'eat-an-onion',
                tagClassName: 'selected-item',
            },
            {
                label: 'Roll around on the ground',
                value: 'roll-around-on-the-ground',
                tagClassName: 'selected-item',
            },
            {
                label: 'Spin in circles',
                value: 'spin-in-circles',
                tagClassName: 'selected-item',
            },
        ],
    },
    {
        label: 'Purchases',
        value: 'purchases',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Purchase Groceries',
                value: 'purchase-groceries',
                tagClassName: 'selected-item',
            },
            {
                label: 'Purchase Beer',
                value: 'purchase-beer',
                tagClassName: 'selected-item',
            },
            {
                label: 'Purchase Wine',
                value: 'purchase-wine',
                tagClassName: 'selected-item',
            },
            {
                label: 'Purchase Liquor',
                value: 'purchase-liquor',
                tagClassName: 'selected-item',
            },
            {
                label: 'Purchase Gallon of Milk',
                value: 'purchase-gallon-of-milk',
                tagClassName: 'selected-item',
            },
            {
                label: 'Purchase Cigarettes',
                value: 'purchase-cigarettes',
                tagClassName: 'selected-item',
            },
            {
                label: 'Purchase Vape Supplies',
                value: 'purchase-vape-supplies',
                tagClassName: 'selected-item',
            },
        ],
    },
    {
        label: 'Outdoors',
        value: 'outdoors',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Go on a walk',
                value: 'go-on-a-walk',
                tagClassName: 'selected-item',
            },
            {
                label: 'Go to the park',
                value: 'go-to-the-park',
                tagClassName: 'selected-item',
            },
            {
                label: 'Go see a friend',
                value: 'go-see-a-friend',
                tagClassName: 'selected-item',
            },
            {
                label: 'Go out to eat',
                value: 'go-out-to-eat',
                tagClassName: 'selected-item',
            },
            {
                label: 'Go to a bar',
                value: 'go-to-a-bar',
                tagClassName: 'selected-item',
            },
            {
                label: 'Go to the White House',
                value: 'go-to-the-white-house',
                tagClassName: 'selected-item',
            },
            {
                label: 'Go to the Capitol Building',
                value: 'go-to-the-capitol-building',
                tagClassName: 'selected-item',
            },
            {
                label: 'Go on a hike',
                value: 'go-on-a-hike',
                tagClassName: 'selected-item',
            },
        ],
    },
    {
        label: 'People',
        value: 'people',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Hang out with girlfriend',
                value: 'hang-out-with-girlfriend',
                tagClassName: 'selected-item',
            },
            {
                label: 'Dance with girlfriend',
                value: 'dance-with-girlfriend',
                tagClassName: 'selected-item',
            },
            {
                label: 'Annoy girlfriend',
                value: 'annoy-girlfriend',
                tagClassName: 'selected-item',
            },
            {
                label: 'Woohoo',
                value: 'wooho',
                tagClassName: 'selected-item',
            },
            {
                label: 'Call family member',
                value: 'call-family-member',
                tagClassName: 'selected-item',
            },
            {
                label: 'Call friend',
                value: 'call-friend',
                tagClassName: 'selected-item',
            },
            {
                label: 'Invite friend over',
                value: 'invite-friend-over',
                tagClassName: 'selected-item',
            },
        ],
    },
    {
        label: 'Practice',
        value: 'practice',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Practice creative writing',
                value: 'practice-creative-writing',
                tagClassName: 'selected-item',
            },
            {
                label: 'Practice coding',
                value: 'practice-coding',
                tagClassName: 'selected-item',
            },
            {
                label: 'Practice drawing',
                value: 'practice-drawing',
                tagClassName: 'selected-item',
            },
            {
                label: 'Practice hand stands',
                value: 'practice-hand-stands',
                tagClassName: 'selected-item',
            },
            {
                label: 'Practice meditation',
                value: 'practice-meditation',
                tagClassName: 'selected-item',
            },
            {
                label: 'Practice Spanish',
                value: 'practice-Spanish',
                tagClassName: 'selected-item',
            },
            {
                label: 'Practice German',
                value: 'practice-german',
                tagClassName: 'selected-item',
            },
            {
                label: 'Practice Russian',
                value: 'practice-russian',
                tagClassName: 'selected-item',
            },
            {
                label: 'Practice Chinese',
                value: 'practice-chinese',
                tagClassName: 'selected-item',
            },
        ],
    },
    {
        label: 'Rooftop',
        value: 'rooftop',
        className: 'parent-item',
        tagClassName: 'selected-item',
        readOnly: true,
        children: [
            {
                label: 'Read a Book',
                value: 'read-a-book',
                tagClassName: 'selected-item',
            },
            {
                label: 'Play pool',
                value: 'play-pool',
                tagClassName: 'selected-item',
            },            
            {
                label: 'Watch TV',
                value: 'watch-tv',
                tagClassName: 'selected-item',
            },
        ],
    },

];

export class ReactDropdownTreeSelectContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static getDerivedStateFromProps(props) {
        return {
            data: props.data
        };
    }

    shouldComponentUpdate() {
        return this.props.data !== this.state.data;
    }

    render() {
        return <DropdownTreeSelect {...this.props} {...this.state} />;
    }
}

export function adaptData(data, selectedValues) {
    return data.map(node => {
        if (selectedValues.includes(node.label)) {
            return {
                ...node,
                children: node.children ? adaptData(node.children, selectedValues) : [],
                checked: true
            };
        }
        return {
            ...node,
            checked: false,
            children: node.children ? adaptData(node.children, selectedValues) : []
        };
    });
}


export default function DropdownTree({ onHandleChange, placeholderOverride }) {
    const [dataFromServer, setDataFromServer] = useState();
    const [selectedValuesFromFormik, setSeletedValue] = useState([]);

    // Simulating data query (graphql)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDataFromServer(initialData);
        }, 10);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    // Memoize costly data to get
    const adaptedData = useMemo(() => {
        if (!dataFromServer) return null;
        return adaptData(dataFromServer, selectedValuesFromFormik);
        // Explicitly don't update data when field are value is updated.
    }, [dataFromServer]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = useMemo(
        () => (_, selectedValues) => {
            onHandleChange(selectedValues);
            setSeletedValue(selectedValues.map(val => val.label));
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    if (!dataFromServer || !adaptedData) {
        return "loading...";
    }

    return (
        <ReactDropdownTreeSelectContainer
            data={adaptedData}
            onChange={handleChange}
            mode='radioSelect'
            texts={{placeholder: placeholderOverride || 'Choose what I do next...'}}
        />
    );
}