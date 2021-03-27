import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../components/Layout/Layout';
import ClientDetails from '../components/Pro/Client/ClientDetails';
import SessionList from '../components/SessionList/SessionList';
import { Link } from 'react-router-dom';
import * as clientActions from '../redux/actions/client';
import Button from '../components/Button/Button';
import classes from './styles/Client.module.css';

const Client = props => {
  let { id } = useParams();
  const { clients } = props;

  const client = clients.find(element => element._id.toString() === id);

  const renderClient = () => {
    if (!client) {
      return <h1>No maching client</h1>;
    }
    return (
      <div className={classes.clientWrapper}>
        <h1 className={classes.headingTitle}>{client.name}</h1>
        <div className={classes.cardWrapper}>
          <ClientDetails client={client} />
          <SessionList
            title="Assigned sessions:"
            sessions={client.sessions}
            clientId={client._id}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Layout>{renderClient()}</Layout>
    </>
  );
};

const mapStateToProps = state => ({
  clients: state.authReducer.user.clients,
});

const mapDispatchToProps = dispatch => ({
  updateClient: client => dispatch(clientActions.updateClient(client)),
  // login: (loginCredentials) => dispatch(authActions.login(loginCredentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
