import { webSocketService } from '../services/webSocketService';

import { UserCredentials, MessageHistoryParcel, Messages, Parcel, ConnectedUsersParcel, ContactListParcel, DirectMessageParcel 
} from '../types/applicationWide';

const getParcel = (type: string, receiverId = 'all', senderId = 'system'): Parcel => ({
  timeStamp: new Date().toLocaleString(),
  type,
  receiverId,
  senderId,
});

const directMessageParcel = (userId: string, message: string): DirectMessageParcel => ({
  ...getParcel('DIRECT MESSAGE', userId),
  message,
});

const messageHistoryParcel = (userId: string, messages: Messages): MessageHistoryParcel => ({
  ...getParcel('REPLACE MESSAGE HISTORY', userId),
  messages,
});

const connectedUserParcel = (userId: string): ConnectedUsersParcel => ({
  ...getParcel('UPDATE CONNECTED USERS', userId),
  connectedUsers: webSocketService.getConnectedUsers(),
});

const contactListParcel = (userId: string, contactList: UserCredentials[]): ContactListParcel => ({
  ...getParcel('UPDATE CONTACTLIST', userId),
  contactList,
  connectedUsers: webSocketService.getConnectedUsers(),
});

export { messageHistoryParcel, contactListParcel, connectedUserParcel, directMessageParcel };
