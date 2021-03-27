import axios from '../../utils/axios';
import * as authActions from './auth';

export function createInvitation(invitationData) {
  return async (dispatch) => {
    const response = await axios.post(`/invitations`, invitationData);
    if (response.status === 200) {
      dispatch(authActions.tryToAutoLog());
    }
  };
}
