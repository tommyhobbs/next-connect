import { useState } from 'react';
import Router from 'next/router';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Lock from '@material-ui/icons/Lock';
import withStyles from '@material-ui/core/styles/withStyles';

import { signinUser } from '../lib/auth';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Signin = ({ classes }) => {
  const [form, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState({ message: '', open: false });
  const [isLoading, setLoading] = useState(false);

  const handleClose = () => setValues({ ...form, openError: false });

  const handleChange = event => {
    setValues({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    setError({ ...error, message: '' });
    signinUser({ ...form })
      .then(() => {
        Router.push('/');
      })
      .catch(showError);
  };

  const showError = err => {
    const e = (err.response && err.response.data) || err.message;
    setLoading(false);
    setError({ message: e, openError: true });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Lock />
        </Avatar>
        <Typography variant="h5" component="h1">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlform="email">Email</InputLabel>
            <Input name="email" type="email" onChange={handleChange} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlform="password">Password</InputLabel>
            <Input name="password" type="password" onChange={handleChange} />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            className="{classes.submit}"
          >
            {isLoading ? 'Signing in' : 'Sign in'}
          </Button>
        </form>
        {error.openError && (
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={error.openError}
            onClose={handleClose}
            autoHideDuration={6000}
            message={<span className={classes.snack}>{error.message}</span>}
          />
        )}
      </Paper>
    </div>
  );
};

const styles = theme => ({
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 2
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2
  },
  snack: {
    color: theme.palette.secondary.light
  }
});

export default withStyles(styles)(Signin);
