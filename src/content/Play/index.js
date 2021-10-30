import React from 'react';
import { TwitchEmbed } from 'react-twitch-embed';
import { VotingSection } from './VotingSection';
import { BrowserView, MobileView } from 'react-device-detect';

type Props = {
};

type State = {
    selectedItem: string,
    voted: boolean,
}

const description = '' +
    'Vote on what you want me to do next, and watch me complete the top voted item.';


export class Play extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            voted: false,
            selectedItem: ''
        };
    }

    render(): Node {
        return (
            <>
                <BrowserView>
                    <div>
                        <p style={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }}>{description}</p>
                        <div className='flex-row play' style={{ flex: 1 }}>
                            <div style={{ flex: 1, width: '50%', marginRight: 20, border: '1px solid lightgray' }}>
                                <TwitchEmbed width={'100%'} height={'60vh'} channel={'christhesim'} withChat={false} />
                            </div>
                            <VotingSection />
                        </div>
                    </div>
                </BrowserView>
                <MobileView>
                    <div>
                        <p style={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }}>{description}</p>
                        <div className='play' style={{ flex: 1 }}>
                            <VotingSection />
                            <div style={{ flex: 1, width: '100%', marginRight: 20, border: '1px solid lightgray', marginTop: 20 }}>
                                <TwitchEmbed width={'100%'} height={'60vh'} channel={'christhesim'} withChat={false} />
                            </div>
                        </div>
                    </div>
                </MobileView>
            </>

        );
    }
}


export default Play;