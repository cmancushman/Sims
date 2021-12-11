import React, { Component } from 'react';
import ChartRace from './ChartRace';
import firebase from 'firebase/app';
import "firebase/database";
import { replaceAll } from '../../AppLibrary';


type Props = {
    voteNumber: string,
}
type State = {
    data: any,
}
export default class BarChartRace extends Component<Props, State> {
    colorMapping: {[key: string]: string}

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.colorMapping = {
            '#50c4fe': '', '#3fc42d': '', '#c33178': '', '#423bce': '', '#c8303b': '',
        };
    }

    componentDidMount() {
        this.handleChange();
        setInterval(() => {
            this.handleChange();
        }, 2000);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    handleChange = async () => {
        const { voteNumber } = this.props;

        const votes = (await firebase.database().ref(`voteCounts/vote-${voteNumber}`).orderByValue().limitToLast(5).once('value')).val();

        const voteKeys = Object.keys(votes || {}) || [];
        const colorKeys = Object.keys(this.colorMapping || {}) || [];

        for (const key of colorKeys) {
            if (!voteKeys.find(vote => this.colorMapping[key] === vote)) {
                this.colorMapping[key] = '';
            }
        }

        for (const vote of voteKeys) {
            if (!colorKeys.find(colorKey => this.colorMapping[colorKey] === vote)) {
                for (const colorKey of colorKeys) {
                    if (!this.colorMapping[colorKey]) {
                        this.colorMapping[colorKey] = vote;
                        break;
                    }
                }
            }
        }
        
        // const colors = ['#50c4fe', '#3fc42d', '#c33178', '#423bce', 'green'];
        const data = voteKeys.map((vote, index) => ({
            id: vote, title: replaceAll(vote, '-', ' '), value: votes[vote], color: colorKeys.find(key => this.colorMapping[key] === vote)
        }));

        this.setState({ data });
    }

    render() {
        return (
            <div>
                <ChartRace
                    data={this.state.data}
                    backgroundColor='transparent'
                    width={'100%'}
                    padding={12}
                    itemHeight={58}
                    gap={12}
                    titleStyle={{ fontSize: 12, color: '#000', fontStyle: 'normal' }}
                    valueStyle={{ fontSize: 11, color: 'rgba(0,0,0, 0.42)' }}
                />
            </div>
        );
    }

}