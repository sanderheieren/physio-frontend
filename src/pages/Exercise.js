import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button/Button';

import axios from '../utils/axios';
import Layout from '../components/Layout/Layout';
import Video from '../components/Video/Video';
import styles from './styles/Exercise.module.css';


const Exercise = props => {
  const { userType } = props;
  const [exercise, setExercise] = useState();
  const videoUrl = exercise?.media && exercise.media; // change later for dynamic vidoes
  const { id } = useParams();

  useEffect(() => {
    const fetchExercise = async () => {
      const response = await axios.get(`exercises/${id}`);
      setExercise(response.data);
    };
    fetchExercise();
  }, [id]);

  const exerciseJsx = exercise && (
    <article className={styles.exercise_article}>
      <Video url={videoUrl} />
      <h2 className={styles.exercise_title}>{exercise.title}</h2>
      <p className={styles.exercise_description}>{exercise.description}</p>
      <Link to={`/exercise/create?edit=true&exerciseId=${id}`}>
        {userType === 'pro' && <Button actionStyle="edit">Edit</Button>}
      </Link>
    </article>
  );

  return <Layout>{exerciseJsx}</Layout>;
};

const mapStateToProps = state => ({
  userType: state.authReducer.user.userType,
});

export default connect(mapStateToProps)(Exercise);
