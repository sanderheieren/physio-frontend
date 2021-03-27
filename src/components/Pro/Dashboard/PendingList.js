import React from 'react';

import Client from './ClientList/Client';
import styles from './PendingList.module.css';

const PendingList = props => {
  const { invitations } = props;

  const clientEntries = invitations.map(invitation => (
    <Client
      key={invitation._id}
      client={{ _id: invitation._id, name: invitation.email }}
      invitation
    />
  ));

  return (
    <div className={styles.pendingList}>
      <h3 className={styles.pendingListHeading}>Pending clients</h3>
      {invitations.length > 0 ? <ul>{clientEntries}</ul> : 'No pending clients'}
    </div>
  );
};

export default PendingList;
