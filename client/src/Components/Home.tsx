import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { reducerActions } from '../reducers/rootActions';
import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { openNewWebSocket } from '../websockets/websockets';

import Navigation from './Navigation';
import ContactList from './ContactList';
import MessageBoard from './MessageBoard';
import MessageEditor from './MessageEditor';
import ContactSearch from './ContactSearch';

const generateWebSocketId = (userId: string): string => `${userId}--${uuid()}`;

const Home = ({ store, actions }: ReduxProps): JSX.Element => {
  const { session, parcelService, client } = store;

  if (session.user.id && !parcelService.webSocket) {
    const webSocket = openNewWebSocket(generateWebSocketId(session.user.id));
    actions.addParcelService(webSocket, actions);
  }

  return (
    <div className="home">
      <div className="home_sidebar">
        {session.user.name}
        <ContactSearch />
        <ContactList />
      </div>
      <div className="home_main">
        {!client.chatPartner
          ? ''
          : (
            <>
              <MessageBoard />
              <MessageEditor />
            </>
          )}
      </div>
      <Navigation />
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(Home);
