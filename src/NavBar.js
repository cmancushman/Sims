import React from 'react';
import type { BrowserHistory } from 'history';
import { withRouter } from 'react-router';
import { BrowserView, MobileView } from 'react-device-detect';


type Props = {
    history: BrowserHistory,
};

export class NavBar extends React.Component<Props> {
    render(): Node {
        const { history } = this.props;
        const pathname = history?.location?.pathname || '/';

        const isOnPlay = pathname === '/' || pathname === '/play';
        const isOnRules = pathname === '/the-rules';
        const isOnAboutMe = pathname === '/about-me';
        return (
            <>
                <BrowserView>
                    <div className='navbar'>
                        <h2 className={`nav-button left ${isOnPlay ? '' : 'nav-button-disabled'}`} onClick={() => history.push('/play')}>Play</h2>
                        <h2 className={`nav-button ${isOnRules ? '' : 'nav-button-disabled'}`} onClick={() => history.push('/the-rules')}>Rules</h2>
                        <h2 className={`nav-button right ${isOnAboutMe ? '' : 'nav-button-disabled'}`} onClick={() => history.push('/about-me')}>About</h2>
                    </div>
                </BrowserView>
                <MobileView>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, marginTop: 20}}>
                        <h2 className={`nav-button left ${isOnPlay ? '' : 'nav-button-disabled'}`} onClick={() => history.push('/play')}>Play</h2>
                        <h2 className={`nav-button ${isOnRules ? '' : 'nav-button-disabled'}`} onClick={() => history.push('/the-rules')}>Rules</h2>
                        <h2 className={`nav-button right ${isOnAboutMe ? '' : 'nav-button-disabled'}`} onClick={() => history.push('/about-me')}>About</h2>
                    </div>
                </MobileView>
            </>
        );
    }
}

const connected: any = withRouter(NavBar);
export default connected;