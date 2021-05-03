import { useState, SyntheticEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import profile2 from '../../public/images/profile2.png';
import back from '../../public/images/back.png';
import './styles.css';
import useStyles from './formStyles';
import { setProfile, deleteProfile, logOut } from '../../requests/userRequests';
import { setUserDataAction, deleteUserAction } from '../../redux/sessionDucks';

const COMP_NAME = 'SignForms';

export default function Profile() {
    const userInfo = useSelector((state: RootStateOrAny) => state.session);

    let history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>(userInfo.email);
    const [pass, setPass] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");
    const [info, setInfo] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passError, setPassError] = useState<string>("");
    const [newPassError, setNewPassError] = useState<string>("");
    const [deleteError, setDeleteError] = useState<string>("");
    const classes = useStyles();

    async function onSubmit(event: SyntheticEvent) {
        event.preventDefault();

        setProfile(userInfo.id, userInfo.token, email, pass, newPass)
        .then((res) => {
            console.log(res);
            if (res.error) {

            }

            if (res.data.info) {
                setInfo(res.data.info);
                //setUserDataAction(re)
            }
        });
    }

    function checkEnteredFields() {
        return true;
    }

    function handleDelete() {
        deleteProfile(userInfo.id, userInfo.token)
        .then((res) => {
            if (res.error) {
                setDeleteError(res.error.UserNotDeleted);
                return false;
            }
            dispatch(deleteUserAction());
            logOut();

            history.push('/');
        });
    }

    function clearErrors() {
        setEmailError("");
        setPassError("");
        setNewPassError("");
    }

    return (
        <Container className={`${COMP_NAME}__main-container`} component="main" maxWidth="xs">
            <Box border={1} borderRadius="borderRadius" className={classes.box} borderColor="primary.main">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={`${COMP_NAME}__logo`} src={profile2} alt="Logo"/>
                <section className={`${COMP_NAME}__typo-back`}>
                    <Typography component="h1" variant="h5">My profile <span>Organize&amp;Fly!</span>
                    </Typography>
                    <Link to="/"><img src={back} alt="Go back"/></Link>
                </section>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                value={email}
                                name="email"
                                autoComplete="email"
                                onChange={(ev) => {setEmail(ev.target.value); clearErrors();}}
                            />
                        <p className={`${COMP_NAME}__error`}>{emailError}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Current password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(ev) => {setPass(ev.target.value); clearErrors()}}
                            />
                            <p className={`${COMP_NAME}__error`}>{passError}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="newPass"
                                label="New password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(ev) => {setNewPass(ev.target.value); clearErrors()}}
                            />
                            <p className={`${COMP_NAME}__error`}>{newPassError}</p>
                        </Grid>
                    </Grid>
                    <p className={`${COMP_NAME}__info`}>{info}</p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!checkEnteredFields()}
                    >Update
                    </Button>

                    <Button
                        id={`${COMP_NAME}__delete-btn`}
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={handleDelete}
                    >Delete my profile
                    </Button>
                    <p className={`${COMP_NAME}__error`}>{deleteError}</p>
                </form>
            </div>
            </Box>
        </Container>
    );
}
