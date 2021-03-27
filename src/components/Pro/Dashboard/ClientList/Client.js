import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  ChevronRight,
  AccountCircleRounded,
  CancelOutlined,
} from '@material-ui/icons';

import styles from './ClientList.module.css';
import Button from '../../../Button/Button';

import * as clientActions from '../../../../redux/actions/client';

const Client = ({ client, invitation, cancelInvite }) => {
  return (
    <li className={styles.client}>
      <div className={styles.clientData}>
        <AccountCircleRounded />
        <Link to={`/client/${client._id}`}>
          <span>{client.name}</span>
        </Link>
      </div>
      {invitation ? (
        <Button actionStyle="cancel" action={() => cancelInvite(client._id)}>
          <CancelOutlined />
        </Button>
      ) : (
        <Link to={`/client/${client._id}`}>
          <Button actionStyle="more">
            <ChevronRight fontSize="inherit" />
          </Button>
        </Link>
      )}
    </li>
  );
};

const mapDispatchToProps = dispatch => ({
  cancelInvite: id => dispatch(clientActions.cancelInvite(id)),
});
export default connect(null, mapDispatchToProps)(Client);
