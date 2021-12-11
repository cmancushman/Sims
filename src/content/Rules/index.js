import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

type Props = {
};

export class Play extends React.Component<Props> {

    render(): Node {
        return (
            <>
                <BrowserView>
                    <div style={{ width: '50%', margin: 'auto' }}>
                        {this.renderDescription()}
                        {this.renderRules()}
                    </div>

                </BrowserView>
                <MobileView>
                    <div>
                        {this.renderDescription()}
                        {this.renderRules()}
                    </div>
                </MobileView>
            </>

        );
    }

    renderDescription() {
        return (
            <p style={{ marginTop: 10, marginBottom: 20, textAlign: 'center' }}>I want you all to have as much freedom as possible while playing this game, but there are unfortunately some limitations. The rules to this game are as follows:</p>
        );

    }

    renderRules() {
        return (
            <div style={{ marginTop: 40, paddingLeft: 50, paddingRight: 50 }}>
                <p style={{ marginTop: 10, marginBottom: 20 }}>1. You cannot make me violate the <a href={'https://www.twitch.tv/p/en/legal/terms-of-service/'}>Twitch Terms of Service</a></p>
                <p style={{ marginTop: 10, marginBottom: 20 }}>2. You cannot make me commit a crime</p>
                <p style={{ marginTop: 10, marginBottom: 20 }}>3. You cannot make me do anything that puts my health in grave danger</p>
                <p style={{ marginTop: 10, marginBottom: 20 }}>4. You cannot make me travel outside of the Washington metropolitan area</p>
                <p style={{ marginTop: 10, marginBottom: 20 }}>5. I get to drink out of and refill my water bottle whenever I want</p>
                <p style={{ marginTop: 10, marginBottom: 20 }}>6. Have fun!</p>

            </div>
        )
    }
}


export default Play;