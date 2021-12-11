import React, { Component } from 'react';
import '../../styles/index.css';

export default class ChartRace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data.sort((a, b) => b.value - a.value),
            temp: this.props.data,
            maxValue: Math.max.apply(Math, this.props.data.map(item => item.value))
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let newProps = [...nextProps.data];
        return {
            data: nextProps.data,
            temp: newProps.sort((a, b) => b.value - a.value),
            maxValue: Math.max.apply(Math, nextProps.data.map(item => item.value))
        };
    }

    draw(item, index) {
        const indis = this.state.temp.findIndex(temp => temp.id === item.id);
        const translateY = indis === 0 ? this.props.padding : (this.props.padding + (indis * this.props.itemHeight) + (indis * this.props.gap));

        const width =  `${item.value / this.state.maxValue * (1000 - 120 - (2 * this.props.padding)) / 10}%`

        return (
            <div key={index} className="raceItem" style={{ height: this.props.itemHeight, transform: 'translateY(' + translateY + 'px) translateX(' + this.props.padding + 'px)', width: '100%' }}>
                <b style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: item.color, width }}>
                    <span style={{backgroundColor: 'rgba(255, 255, 255, .5)', borderRadius: '.25rem', padding: 5, flexShrink: 1}}>
                        <em style={this.props.titleStyle}>{item.title}</em>
                        <i style={this.props.valueStyle}>{item.value}</i>
                    </span>
                </b>
            </div>
        );
    }

    render() {
        return (
            <div className="raceArea" style={{ backgroundColor: this.props.backgroundColor, paddingTop: this.props.padding, paddingBottom: this.props.padding, width: '100%', height: (2 * this.props.padding) + (this.state.temp.length * this.props.itemHeight) + ((this.state.temp.length - 1) * this.props.gap) }}>
                {this.state.data.map((item, index) => this.draw(item, index))}
            </div>
        );
    }

}

ChartRace.defaultProps = {
    data: [],
    backgroundColor: '#f9f9f9',
    width: 680,
    padding: 20,
    itemHeight: 38,
    gap: 4,
    titleStyle: { fontFamily: 'MyFont', color: '#212121' },
    valueStyle: { fontFamily: 'MyFont', color: '#777' }
};