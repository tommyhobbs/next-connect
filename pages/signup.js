import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Gavel from '@material-ui/icons/Gavel';
import VerifiedUserTwoTone from '@material-ui/icons/VerifiedUserTwoTone';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'next/link';
import { signupUser } from '../lib/auth';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Signup = ({ classes }) => {
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState({ message: '', open: false });
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [createdUser, setUser] = useState('');

  const handleClose = () => setValues({ ...form, openError: false });

  const handleChange = event => {
    setValues({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    setError({ ...error, message: '' });
    signupUser({ ...form })
      .then(user => {
        setError({ ...error, message: '' });
        setUser(user);
        setLoading(false);
        setOpenSuccess(true);
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
          <Gavel />
        </Avatar>
        <Typography variant="h5" component="h1">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlform="name">Name</InputLabel>
            <Input name="name" type="text" onChange={handleChange} />
          </FormControl>
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
            {isLoading ? 'Signing up' : 'Sign up'}
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

      <Dialog
        open={openSuccess}
        disableBackdropClick
        transitionComponent={Transition}
      >
        <DialogTitle>
          <VerifiedUserTwoTone className={classes.icon} />
          New Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            User {createdUser} successfully created!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained">
            <Link href="/signin">
              <a href="/signin">
                <a className={classes.signInLink}>Sign in</a>
              </a>
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
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
  signinLink: {
    textDecoration: 'none',
    color: 'white'
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
  },
  icon: {
    padding: '0px 2px 2px 0px',
    verticalAlign: 'middle',
    color: 'green'
  }
});

export default withStyles(styles)(Signup);
