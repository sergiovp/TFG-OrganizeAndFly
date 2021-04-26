import react, { useState, SyntheticEvent } from 'react';
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
import './styles.css';
import { logIn } from '../../requests/userRequests';
import { useDispatch } from 'react-redux';
import decodeToken from '../../helpers/decodeToken';
import { createUserAction } from '../../redux/sessionDucks';

const COMP_NAME = 'SignForms';

export default function LogIn() {
    let history = useHistory();
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [error, setError] = useState<string>("");
    const classes = useStyles();
    const dispatch = useDispatch();

    function clearErrors() {
        setError("");
    }

    async function onSubmit(event: SyntheticEvent) {
        event.preventDefault();

        const res = await logIn(email, pass);

        if (res.error) {
            switch (Object.keys(res.error)[0]) {
                case 'WrongData':
                    setError(res.error.WrongData);
                break;

                case 'BadArguments':
                    setError(res.error.BadArguments);
                break;
            }
            return false;
        }

        const userData = decodeToken(res.data);

        dispatch(createUserAction(res.data, userData));

        history.push('/home');
    }

    function checkEnteredFields(): boolean {
        return email.length > 0 && pass.length > 0;
    }

    return (
        <Container className={`${COMP_NAME}__main-container`} component="main" maxWidth="xs">
            <Box border={1} borderRadius="borderRadius" className={classes.box} borderColor="primary.main">
            <CssBaseline />
            <div className={classes.paper}>
                <img className={`${COMP_NAME}__logo`} src={logo} alt="Logo"/>
                <section className={`${COMP_NAME}__typo-back`}>
                    <Typography component="h1" variant="h5">
                        Log In <span>Organize&amp;Fly!</span>
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
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(ev) => {setEmail(ev.target.value); clearErrors();}}
                            />
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
                                onChange={(ev) => {setPass(ev.target.value); clearErrors()}}
                            />
                        </Grid>
                    </Grid>
                    <p className={`${COMP_NAME}__error`}>{error}</p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!checkEnteredFields()}
                    >LogIn
                    </Button>
                    <section className={`${COMP_NAME}__remember-me`}>
                        <Checkbox color="primary"/>
                        <p>Remember me</p>
                    </section>
                </form>
                <section className={`${COMP_NAME}__signin`}>
                    <p>Don't you have an account?</p>
                    <Link to="/signup">SignUp</Link>
                </section>
            </div>
            </Box>
        </Container>
    );
}
