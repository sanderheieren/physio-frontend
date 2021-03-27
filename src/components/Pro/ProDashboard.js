import React, { useState } from 'react';
import { connect } from 'react-redux';

import ClientList from './Dashboard/ClientList/ClientList';
import PendingList from './Dashboard/PendingList';
import AsideExercisesList from '../AsideExercisesList/AsideExercisesList';
import classes from './ProDashboard.module.css';
import Button from '../Button/Button';

const ProDashboard = props => {
  const { clients, invitations } = props;
  const [activePage, setActivePage] = useState('CLIENTS');
  const handleShow = e => setActivePage(e.target.innerText);

  let content;

  switch (activePage) {
    case 'CLIENTS':
      content = (
        <div className={classes.clientsContainer}>
          <ClientList title="Active Clients" clients={clients} />
          <PendingList invitations={invitations} />
        </div>
      );
      break;
    case 'EXERCISES':
      content = (
        <div className={classes.dashboardStats}>
          <div className={classes.dashboardExercises}>
            <h3>Your Exercises</h3>
            <AsideExercisesList dashboard />
          </div>
        </div>
      );
      break;

    default:
      break;
  }

  return (
    <div className={classes.proDashWrapper}>
      <div className={classes.cardsBtns}>
        <Button
          action={e => handleShow(e)}
          actionStyle={activePage === 'CLIENTS' ? 'cardActive' : 'cardInactive'}
        >
          Clients
        </Button>
        <Button
          action={e => handleShow(e)}
          actionStyle={
            activePage === 'EXERCISES' ? 'cardActive' : 'cardInactive'
          }
        >
          Exercises
        </Button>
      </div>
      {content}
    </div>
  );
};

const mapStateToProps = state => ({
  clients: state.authReducer.user.clients,
  invitations: state.authReducer.user.invitations,
});

export default connect(mapStateToProps)(ProDashboard);
