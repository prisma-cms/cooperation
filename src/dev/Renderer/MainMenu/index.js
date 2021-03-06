import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import Context from "@prisma-cms/context";

import AppBar from 'material-ui/AppBar';
// import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { Link } from 'react-router-dom';

import UserItem from './User';
import { withStyles } from 'material-ui/styles';

import { Notices } from '@prisma-cms/society';

import {
  Timer,
} from '../../../App';

// console.log("MainMenu Context", Context);

// import Modal from './AuthModal';

export const styles = theme => {


  const {
    palette: {
      type: paletteType,
    },
  } = theme;


  return {
    root: {

      // Fix contrast 
      // "& a, & button": {
      //   "&, & *": {
      //     color: paletteType === "light" ? "#fff" : undefined,
      //   },
      // },
    },
    link: {
      color: paletteType === "light" ? "#fff" : undefined,
    },
  }
}

export class MainMenu extends PureComponent {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }


  // static contextTypes = {
  //   logout: PropTypes.func.isRequired,
  //   onAuthSuccess: PropTypes.func.isRequired,
  //   user: PropTypes.object,
  //   openLoginForm: PropTypes.func.isRequired,
  // }
  static contextType = Context;

  state = {
    // opened: false,
  }

  logout() {

    const {
      logout,
    } = this.context;

    logout();

  }

  // componentWillMount(){
  //   console.log("menu componentWillMount");
  // }

  // handleClose = () => {

  //   this.setState({
  //     opened: false,
  //   });

  // }


  render() {

    const {
      user,
      Grid,
    } = this.context;

    // const {
    //   // opened,
    // } = this.state;

    const {
      classes,
    } = this.props;

    const {
      id: userId,
      // sudo,
      Timers,
    } = user || {}

    const [ActiveTimer] = (Timers || []);

    return (

      <AppBar
        // position="relative"
        className={classes.root}
        style={{
          position: "relative",
        }}
      >

        <Grid
          container
          spacing={16}
          alignItems="center"
          className="MainMenu-root"
        >

          <Grid
            item
          >
            <Link
              to="/"
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Main page
            </Typography>
            </Link>
          </Grid>

          <Grid
            item
          >
            <Link
              to="/users"
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Users
            </Typography>
            </Link>
          </Grid>

          <Grid
            item
          >
            <Link
              to="/projects"
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Projects
            </Typography>
            </Link>
          </Grid>

          <Grid
            item
          >
            <Link
              to={`/tasks?filters=%7B"status_not"%3A"Done"%7D`}
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Tasks
            </Typography>
            </Link>
          </Grid>

          <Grid
            item
          >
            <Link
              to="/timers"
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Timers
              </Typography>
            </Link>
          </Grid>

          <Grid
            item
          >
            <a
              href="/graphql-voyager"
            >
              <Typography
                component="span"
                className={classes.link}
              >
                Graphql Voyager
              </Typography>
            </a>
          </Grid>


          <Grid
            item
            xs
          >
          </Grid>

          {user
            ?
            <Fragment>

              <Grid
                key="notifications"
                item
              >
                <Notices
                  key={userId}
                  user={user}
                  classes={{
                    icon: classes.link,
                  }}
                />
              </Grid>

              {ActiveTimer
                ?
                <Grid
                  key="timer"
                  item
                >
                  <Timer
                    timer={ActiveTimer}
                    iconClassName={classes.link}
                  />
                </Grid>
                : null
              }

              <Grid
                key="user"
                item
              >
                <UserItem
                  key={userId}
                  user={user}
                  classes={classes}
                />
              </Grid>
              <Grid
                key="logout"
                item
              >
                <Button
                  onClick={() => this.logout()}
                  className={classes.link}
                >
                  Signout
                  </Button>

              </Grid>
            </Fragment>
            :
            <Grid
              key="login"
              item
            >
              <Button
                onClick={e => {
                  // this.setState({
                  //   opened: true,
                  // });
                  const {
                    openLoginForm,
                  } = this.context;
                  openLoginForm();
                }}
              >
                <Typography
                  component="span"
                  className={classes.link}
                >
                  Signin
              </Typography>
              </Button>

            </Grid>
          }


        </Grid>

      </AppBar>

    )
  }
}

export default withStyles(styles)(props => <MainMenu
  {...props}
/>);