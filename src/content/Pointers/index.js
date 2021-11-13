import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

type Props = {
};

export class Pointers extends React.Component<Props> {

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
            <p style={{ marginTop: 10, marginBottom: 20, textAlign: 'center' }}>The following are a few things to keep in mind that may make the game more enjoyable for everyone:</p>
        );

    }

    renderRules() {
        return (
            <div style={{ marginTop: 40, paddingLeft: 50, paddingRight: 50 }}>
                <p style={{ marginTop: 10, marginBottom: 20 }}>- The game will end on December 1st.</p>
                <p style={{ marginTop: 10, marginBottom: 20 }}>- I do not have any allergies, and I am not on any medications.</p>
                <p style={{ marginTop: 10, marginBottom: 20 }}>- I wear contacts and glasses. You can choose to not let me wear or service them, but that may result in my vision being impared and thus my ability to complete tasks being diminished.</p>
                <p style={{ marginTop: 10, marginBottom: 20 }}>- I live about a 30-40 minute drive from the center of D.C. Be aware of this when playing, it may be boring to watch me sit in a car if you vote for me to visit there.</p>
                <p style={{ marginTop: 10, marginBottom: 20 }}>- I will try to do every rule-abiding task I am given, but I cannot push past my physical limits. If I am extremely tired, I may fall asleep involuntarily instead of completing the current task.</p>
            </div>
        )
    }
}


export default Pointers;