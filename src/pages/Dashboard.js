import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout/Layout';
import ProDashboard from '../components/Pro/ProDashboard';
import ClientDashboard from '../components/Client/ClientDashboard';

const Dashboard = ({ userType }) => {
  return (
    <div>
      <Layout>
        {userType === 'pro' ? <ProDashboard /> : <ClientDashboard />}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userType: state.authReducer.user.userType,
});

export default connect(mapStateToProps)(Dashboard);
