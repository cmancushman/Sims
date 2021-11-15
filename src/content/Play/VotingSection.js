import React from 'react';
import 'react-dropdown-tree-select/dist/styles.css'
import DropdownTreeSelect from './DropdownTree';
import BarChartRace from './BarChartRace';
import '../../styles/TreeStyles.css'
import '../../styles/ChartRaceStyles.css'
import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth";
import { replaceAll } from '../../AppLibrary';

type Props = {
};

type State = {
    selectedItem: string,
    voted: boolean,
    [voteNumber: string]: boolean,
    voteInfo: {
        voteNumber: number,
        voteStatus: string,
        topVoted: string,
    },
    usingCustomVote: boolean,
}

export class VotingSection extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            voted: false,
            selectedItem: '',
            voteInfo: {
                voteNumber: 0,
                voteStatus: 'accepcted',
                topVoted: '',
            },
            usingCustomVote: false,
        };
    }


    componentDidMount() {
        const uid = firebase.auth().currentUser.uid
        firebase.database().ref('voteNumber').on('value', (snapshot => {
            this.setState({ voteNumber: snapshot.val() || 0 });
        }));

        firebase.database().ref(`votes/${uid}`).on('value', (snapshot => {
            const votesMappings = snapshot.val() || {};
            this.setState({ ...votesMappings });
        }));

        firebase.database().ref(`/voteInfo`).on('value', snapshot => {
            const voteInfo = snapshot.val();
            this.setState({ voteInfo });
        })
    }

    updateItems = (node) => {
        this.setState({ selectedItem: node[0]?.value });
        if (node[0]?.value) {
            for (let el of document.querySelectorAll('.tag-item')) el.style.display = 'none';
        } else {
            for (let el of document.querySelectorAll('.tag-item')) el.style.display = 'flex';
        }
    }

    confirmVote = async () => {
        const { selectedItem, voteInfo } = this.state;
        const { voteNumber = 0 } = voteInfo || {};
        const uid = firebase.auth().currentUser.uid;
        await firebase.database().ref(`votes/${uid}/vote-${voteNumber}`).set(selectedItem);
    }

    render(): Node {
        const { selectedItem, voteInfo, usingCustomVote } = this.state;
        const { voteNumber = 0, voteStatus, topVoted = '' } = voteInfo || {};

        if (!voteNumber) {
            return <div style={{ flex: 1 }}></div>;
        }

        const currentVote = this.state[`vote-${voteNumber}`];

        const topVotedTitle = replaceAll(topVoted, '-', ' ');
        const switchEntryTypeDescription = usingCustomVote
            ? 'Use standard choices'
            : 'Enter custom vote';


        return (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                {!currentVote && voteStatus === 'rejected' &&
                    <p style={{ color: 'red', textAlign: 'center' }}>Rejected: {topVotedTitle}</p>
                }
                {!currentVote && voteStatus === 'accepted' &&
                    <p style={{ textAlign: 'center' }}>Accepted: {topVotedTitle}</p>
                }
                {!currentVote && !(voteStatus === 'done') ?
                    <div className='full-width' style={{ height: '100%' }}>
                        <div className='flex-row full-width'>
                            <div style={{ flexGrow: 1 }}>
                                <input
                                    placeholder={'Choose what I do next...'}
                                    style={{
                                        height: 41,
                                        width: '100%',
                                        display: !usingCustomVote ? 'none' : 'flex',
                                        borderRadius: '.25rem',
                                        border: '1px solid #b9b9b9',
                                        paddingLeft: 10,
                                        paddingBottom: 3
                                    }}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        this.setState({ selectedItem: val });
                                    }} />
                                <div style={{ display: usingCustomVote ? 'none' : 'flex' }}>
                                    <DropdownTreeSelect placeholderOverride={selectedItem ? 'Are you sure?' : 'Choose what I do next...'} onHandleChange={this.updateItems} />
                                </div>
                                <button
                                    onClick={() => this.setState({ usingCustomVote: !usingCustomVote })}
                                    style={{ fontSize: 12, paddingLeft: 10, marginTop: 2, color: 'gray', cursor: 'pointer', backgroundColor: 'transparent', borderWidth: 0 }}
                                >
                                    <u>{switchEntryTypeDescription}</u>
                                </button>
                            </div>
                            <button type="button" onClick={this.confirmVote} style={{ width: 150, marginLeft: 10, height: 41 }} disabled={!selectedItem} className="btn btn-success">Confirm Vote</button>
                        </div>
                    </div> :
                    voteStatus === 'done' &&
                    <div style={{ flexGrow: 1, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                        <h4 style={{ textAlign: 'center' }}>Voting Has Ended</h4>
                        <h6 style={{ textAlign: 'center' }}>Top voted: {topVotedTitle}</h6>
                    </div>
                }
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ textAlign: 'center' }}>Things I Might Do Next</h4>
                    <div style={{ borderRadius: 5, border: '1px solid lightgray', flexGrow: 1, backgroundColor: '#fafafa' }}>
                        <BarChartRace voteNumber={voteNumber} />
                    </div>
                </div>
            </div>
        );
    }
}
export default VotingSection;