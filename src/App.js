import React from 'react';
import './styles/App.css';
import MobileStoreButton from 'react-mobile-store-button';

const path = window.location.pathname;
const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());
const title = params['title'];

window.document.title = title || 'Willow Redirect';

const App = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
        {path.split('/')[1] === 'share-profile' 
            ? <p>Download or update Willow to follow {params['user']}</p> 
            : <p>Download or update Willow to follow this link</p>}
        <MobileStoreButton
            store="ios"
            url={'https://apps.apple.com/bg/app/willow-protocols-for-life/id1559364055#?platform=iphone'}
            linkProps={{ title: 'iOS Store Button' }}
        />
    </div>
);

export default App;