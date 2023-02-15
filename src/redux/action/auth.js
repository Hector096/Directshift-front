/* eslint-disable no-console */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    INVITE_SUCCESS,
    INVITE_FAILED,
} from "./types";

import AuthService from "../../service/auth";

// eslint-disable-next-line max-len
export const register = (values, referral) => (dispatch) =>
    AuthService.register(values, referral).then(
        (response) => {
            console.log(response.data.message);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: { user: response.data.message },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );

export const login = (email, password) => (dispatch) =>
    AuthService.login(email, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                error.response.status === 401
                    ? "Invalid Credentials"
                    : (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                      error.message ||
                      error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );

export const invite = (values) => (dispatch) =>
    AuthService.invite(values.email, values.referral).then(
        (data) => {
            dispatch({
                type: INVITE_SUCCESS,
                payload: { message: data.message },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                error.response.status === 401
                    ? "Something went Wrong.."
                    : (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                      error.message ||
                      error.toString();

            dispatch({
                type: INVITE_FAILED,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
};
