import { PayloadAction } from '@reduxjs/toolkit';
// import { push } from 'connected-react-router';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import { router } from 'routers';
import routes from 'config/routes';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);

    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'hauxun',
      })
    );

    // redirect to admin page
    // yield put(push('/admin/dashboard'));
    router.navigate(`/${routes.admin}/${routes.dashboard}`);
  } catch (error : any) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');

  // redirect to login page
  // yield put(push('/login'));
  router.navigate(`/${routes.login}`);
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}