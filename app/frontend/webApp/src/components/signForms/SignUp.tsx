import { useState, SyntheticEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import logo from '../../public/images/logo.png';
import back from '../../public/images/back.png';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from './formStyles';
import { signUp } from '../../requests/userRequests';
import './styles.css';
import decodeToken from '../../helpers/decodeToken';
import { createUserAction } from '../../redux/sessionDucks';
import { useDispatch } from 'react-redux';
import { checkEnteredFieldsSignUp } from '../../helpers/helpers';

const COMP_NAME = 'SignForms';

export default function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [confirmedPass, setConfirmedPass] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passError, setPassError] = useState<string>("");
    const [confirmedPassError, setConfirmedPassError] = useState<string>("");
    const [fieldsError, setFieldsError] = useState<string>("");
    const dispatch = useDispatch();
    let history = useHistory();
    const classes = useStyles();

    function clearErrors() {
        setEmailError("");
        setPassError("");
        setConfirmedPassError("");
        setFieldsError("");
    };

    async function onSubmit(event: SyntheticEvent) {
        event.preventDefault();

        signUp(email, pass, confirmedPass)
        .then((res) => {
            if (res.error) {
                switch (Object.keys(res.error)[0]) {
                    case 'BadArguments':
                        setFieldsError(res.error.BadArguments);
                    break;
    
                    case 'EmailBadSyntax':
                        setEmailError(res.error.EmailBadSyntax);
                    break;

                    case 'UnsafePass':
                        setPassError(res.error.UnsafePass);
                    break;

                    case 'PasswordsDontMatch':
                        setConfirmedPassError(res.error.PasswordsDontMatch);
                    break;

                    case 'DuplicatedEmail':
                        setEmailError(res.error.DuplicatedEmail);
                    break;
                }
                return false;
            }

            const userData = decodeToken(res.data);

            dispatch(createUserAction(res.data, userData));

            history.push('/home');
        });
    }

    return (
        <Container className={`${COMP_NAME}__main-container`} component="main" maxWidth="xs">
            <Box border={1} borderRadius="borderRadius" className={classes.box} borderColor="primary.main">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={`${COMP_NAME}__logo`} src={logo} alt="Logo"/>
                <section className={`${COMP_NAME}__typo-back`}>
                    <Typography component="h1" variant="h5">
                       <span>SignUp in Organize&amp;Go!</span></Typography>
                    <Link to="/"><img src={back} alt="Go back"/></Link>
                </section>
                <form className={classes.form} onSubmit={onSubmit}>
                    <p className={`${COMP_NAME}__general-error`}>{fieldsError}</p>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => {setEmail(e.target.value); clearErrors();}}
                            />
                            <p className={`${COMP_NAME}__error`}>{emailError}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => {setPass(e.target.value); clearErrors()}}
                            />
                            <p className={`${COMP_NAME}__error`}>{passError}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="confirmedPass"
                                label="Confirm password"
                                type="password"
                                id="confirmedPass"
                                autoComplete="current-password"
                                onChange={(e) => {setConfirmedPass(e.target.value); clearErrors();}}
                            />
                            <p className={`${COMP_NAME}__error`}>{confirmedPassError}</p>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!checkEnteredFieldsSignUp(email, pass, confirmedPass)}
                    >Sign Up
                    </Button>
                    <section className={`${COMP_NAME}__remember-me`}>
                        <Checkbox color="primary"/>
                        <p>Remember me</p>
                    </section>
                </form>
                <section className={`${COMP_NAME}__signin`}>
                    <p>Already have an account?</p>
                    <Link to="/login">SignIn</Link>
                </section>
            </div>
            </Box>
        </Container>
    );
}
