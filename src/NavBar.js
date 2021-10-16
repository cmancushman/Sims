import React from 'react';
import type { BrowserHistory } from 'history';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';


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

        console.log(pathname);
        return (
            <div className='navbar'>
                <h2 className={`nav-button ${isOnPlay ? '' : 'nav-button-disabled'}`} onClick={() => history.push('/play')}>Play</h2>
                <h2 className={`nav-button ${isOnRules ? '' : 'nav-button-disabled'}`} onClick={() => history.push('/the-rules')}>The Rules</h2>
                <h2 className={`nav-button ${isOnAboutMe ? '' : 'nav-button-disabled'}`} onClick={() => history.push('/about-me')}>About Me</h2>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const connected: any = connect(mapStateToProps, {})(withRouter(NavBar));
export default connected;        