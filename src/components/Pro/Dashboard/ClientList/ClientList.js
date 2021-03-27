import React from 'react';
import { Link } from 'react-router-dom';

import { PersonAddRounded } from '@material-ui/icons';

import styles from './ClientList.module.css';
import Button from '../../../Button/Button';
import Client from './Client';
import classes from './ClientList.module.css';

const ClientList = props => {
  const { title, clients } = props;

  const clientEntries = clients.map(client => (
    <Client key={client._id} client={client} />
  ));

  return (
    <div className={classes.activeClientsContainer}>
      <div className={classes.heading}>
        <h3>{title}</h3>
        <Link to={`/invite`}>
          <Button actionStyle="invite">
            <PersonAddRounded />
            <p>Invite New</p>
          </Button>
        </Link>
      </div>
      {clients.length > 0 ? (
        <ul className={styles.clientList}>{clientEntries}</ul>
      ) : (
        `No ${title.toLowerCase()}`
      )}
    </div>
  );
};

export default ClientList;
