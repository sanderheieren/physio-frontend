import React from 'react';
import Layout from '../components/Layout/Layout';
import { connect } from 'react-redux';
import styles from './styles/About.module.css';
import meditation from '../images/meditation.png';
import cycling from '../images/cycling.png';
import paperPlane from '../images/paperPlane.png';
import email from '../images/email.svg';
import { Link } from 'react-router-dom';
import SvgLogo from '../components/shared/Logo/SvgLogo';

const About = ({ isAuth }) => {
  console.log(isAuth);
  const notLoggedInContent = (
    <>
      <h3 className={styles.h3}>Are you interested in using our services?</h3>
      <p>
        <b>For physiotherapists:</b>
        <br />
        Please contact us and request a demo or ask us any questions.
      </p>
      <p>
        <b>For clients:</b>
        <br />
        Contact us for any questions or tell your physiotherapist about us.
      </p>
    </>
  );

  const logoLink = isAuth ? '/dashboard' : '/';

  return (
    <Layout type="text">
      <header className={styles.header}>
        <Link to={logoLink}>
          <div className={styles.logoContainer}>
            <SvgLogo width="35%" />
          </div>
        </Link>
      </header>

      <article className={styles.article}>
        <img className={styles.ilustration} src={cycling} alt="cycling" />

        <section className={styles.section}>
          <h1>About</h1>
          <p>
            We are Loopers, a group of dedicated web developers embarked on a
            mission to build PhysIO. The first app dedicated to solve
            communication issues between physiotherapists and their clients.{' '}
            <br />
            <br />
            <b>Let's take physiotherapy into the digital world.</b>
          </p>
        </section>

        <img className={styles.ilustration} src={meditation} alt="meditation" />

        <section className={styles.section}>
          <h3 className={styles.h3}>Our mission</h3>
          <p>
            Due to the global pandemic many countries impose restrictions on
            physical contact, functioning of training and medical facilities.
            This makes it difficult for many to keep in shape, but also receive
            necessary treatments such as physiotherapy. Our app attempts to
            solve this issue. It allows personal trainers and physiotherapists
            to continue providing their services and follow up with their
            customers regardless of where you are and what are the local
            restrictions.
          </p>
          <br />
          <br />
          <br />
        </section>

        <img
          className={styles.ilustration}
          src={paperPlane}
          alt="paper plane"
        />

        <section className={styles.section}>
          <h1>Contact</h1>
          <br />
          {!isAuth && notLoggedInContent}
        </section>

        <div className={styles.contactDiv}>
          <a href="mailto:contact@phys.io">
            <img className={styles.emailImg} src={email} alt="envelop" />
            <br />
            contact@phys.io
          </a>
        </div>

        <section className={styles.section}>
          <h3 className={styles.h3}>Work with us</h3>
          <p>
            We are currently looking for a <b>skilled designer</b>!<br />
            Introduce yourself -{' '}
            <a href="mailto:career@phys.io">career@phys.io</a>
          </p>
        </section>
      </article>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(mapStateToProps)(About);
