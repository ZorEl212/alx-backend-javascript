import uploadPhoto from './5-photo-reject';
import signUpUser from './4-user-promise';

export default function handleProfileSignup (firstName, lastName, fileName) {
  return Promise
    .allSettled([uploadPhoto(fileName), signUpUser(fileName, lastName)])
    .then((messages) => (messages.map((message) => ({
      status: message.status,
      value: message.value ? message.value : message.reason
    }))
    ));
}
