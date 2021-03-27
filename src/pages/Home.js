import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import styles from './styles/textContent.module.css';
import homeStyles from './styles/Home.module.css';
import bellbar from '../images/bellbar.png';
import yoga from '../images/yoga.png';
import logo from '../images/logo.svg';
import SvgLogo from '../components/shared/Logo/SvgLogo';

const Home = () => {
  return (
    <Layout type="text">
      <header className={homeStyles.header}>
        <SvgLogo width="35%" />
      </header>
      <article className={homeStyles.article}>
        {/* <cite>Rest is not the answer.<br />
        Activity and therapy help healing most.</cite><br />
        <p className={homeStyles.quoteAuthor}>― Joerg Teichmann</p> */}

        <img
          className={homeStyles.ilustration}
          src={bellbar}
          alt="woman lifting"
        />

        <section className={homeStyles.section}>
          <p></p>
          <h3 className={homeStyles.h3}>What is PhysIO?</h3>
          <p></p>
          <p>
            PyshIO is an app for pysiotherapists and their clients. Our goal is
            to make it easier for pysiotherapists to provide their services to
            clients in a digital world.
          </p>
          <p>
            Using PhysIO allows you to keep in touch with your clients wherever
            they are and despite any epidemiological restrictions. PhysIO is
            also great continuation of in-person visits.
          </p>
        </section>

        <div className={homeStyles.divCard}>
          <p>
            <b>
              Already a user? <Link to="/login">Log in</Link>
            </b>
          </p>
          <p>
            <b>
              Are you a physiotherapis and want to use our app?{' '}
              <Link to="/signup">Sign up</Link>
            </b>
          </p>
        </div>

        <img
          className={homeStyles.ilustration}
          src={yoga}
          alt="woman lifting"
        />

        <section className={homeStyles.section}>
          <p></p>
          <h3 className={homeStyles.h3}>Are you interested in using PhysIO?</h3>
          <p>
            <b>For physiotherapists:</b>
            <br />
            <Link to="/signup">Sign up</Link> and start using PhysIO today!{' '}
            <br />
            If you have any questions do not hesitate to{' '}
            <Link to="/about">contact us</Link> and request a demo or ask us
            anything.
          </p>
          <p>
            <b>For clients:</b>
            <br />
            <Link to="/about">Contact us</Link> for any questions or tell your
            physiotherapist about us.
          </p>
        </section>
      </article>
    </Layout>
  );
};

export default Home;
