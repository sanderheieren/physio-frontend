import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ExpandMoreRounded, ExpandLessRounded, Edit } from '@material-ui/icons';

import Video from '../Video/Video';
import Button from '../Button/Button';
import classes from './ExerciseList.module.css';

const Exercise = ({ exerciseData, exerciseMode, userType, order }) => {
  const { exercise } = exerciseData;
  const [expanded, setExpanded] = useState(false);

  let buttonToggle = false;
  if ((userType === 'pro') & !exerciseMode) {
    buttonToggle = true;
  }

  const summaryText =
    exercise.description.length > 80
      ? exercise.description.slice(0, 80).concat('...')
      : exercise.description;
  const fullText = exercise.description;

  const toggleText = () => setExpanded(!expanded);

  const exerciseDetails = (
    <>
      {exercise.media && (
        <div className={classes.videoContainer}>
          <Video url={exercise.media} className={classes.video} />
        </div>
      )}
      <Link to={`/exercise/${exercise._id}`}>
        <h4 className={classes.exerciseHeading}>{exercise.title}</h4>
      </Link>
      {exercise.description && (
        <div className={classes.description} onClick={toggleText}>
          <p>{expanded ? fullText : summaryText}</p>
        </div>
      )}
      <div className={classes.actionContainer}>
        {expanded ? (
          <ExpandLessRounded onClick={toggleText} />
        ) : (
          <ExpandMoreRounded onClick={toggleText} />
        )}
      </div>
    </>
  );

  const exerciseSummary = (
    <div>
      {exercise.media && (
        <div className={classes.videoContainer}>
          <Video url={exercise.media} className={classes.video} />
        </div>
      )}
      <Link to={`/exercise/${exercise._id}`}>
        <h4 className={classes.exerciseHeading}>{exercise.title}</h4>
      </Link>
      {exercise.description && (
        <div className={classes.description} onClick={toggleText}>
          <p>{expanded ? fullText : summaryText}</p>
        </div>
      )}
      <div className={classes.actionContainer}>
        {expanded ? (
          <ExpandLessRounded onClick={toggleText} />
        ) : (
          <ExpandMoreRounded onClick={toggleText} />
        )}
      </div>
    </div>
  );

  return (
    <div className={classes.exercise}>
      {buttonToggle && (
        <div className={classes.editActionContainer}>
          <Link to={`/exercise/create?edit=true&exerciseId=${exercise._id}`}>
            <Button actionStyle="editSvg">
              <Edit />
              <p></p>
            </Button>
          </Link>
        </div>
      )}
      {/* {!exerciseMode && (
        <Link to={`/exercise/${exercise._id}`}>
          <Button actionStyle="link">Details</Button>
        </Link>
      )} */}
      {exerciseMode && <div className={classes.order}>{order}</div>}
      {exerciseMode ? exerciseDetails : exerciseSummary}
    </div>
  );
};

const mapStateToProps = state => ({
  userType: state.authReducer.user.userType,
});

export default connect(mapStateToProps)(Exercise);
