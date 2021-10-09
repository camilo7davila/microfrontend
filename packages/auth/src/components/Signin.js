import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ onSignIn }) {
  const classes = useStyles();

  const validations = Yup.object({
    email: Yup.string()
      .email('Este no es un correo valido')
      .required('Este campo es requerido'),

    password: Yup.string()
      .max(15, 'Máximo 5 caracteres')
      .min(8, 'Minimo 8 caracteres')
      .required('Este campo es requerido')
  })

  const onSubmitHandler = (values) => {
    const event = new CustomEvent("userLogin", {
      detail: {
        message: { ...values },
      },
      bubbles: true,
      composed: true,
    });
    dispatchEvent(event);
    setTimeout(() => {
      onSignIn()
    }, 300);

    // dispatch(startLoginEmailPassword(values.email, values.password))
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validations}
          onSubmit={onSubmitHandler}
        >
          {
            formik => (
              <Form className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  type="text"
                  {...formik.getFieldProps('email')}
                />
                {
                  formik.touched.email && formik.errors.email && <Alert severity="error">Email invalid</Alert>
                }
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...formik.getFieldProps('password')}
                />
                {
                  formik.touched.password && formik.errors.password && <Alert severity="error">Password invalido</Alert>
                }
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!formik.isValid}
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/auth/signup">{"Don't have an account? Sign Up"}</Link>
                  </Grid>
                </Grid>
              </Form>
            )
          }
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
