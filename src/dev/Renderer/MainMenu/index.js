import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import {Grid} from '../../../components/ui';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

// import { Link } from 'react-router-dom';

import UserItem from './User';
import { withStyles } from 'material-ui/styles';
import Context from "@prisma-cms/context";


const styles = theme => {


  const {
    palette: {
      type: paletteType,
    },
  } = theme;


  return {
    root: {

      // Fix contrast 
      "& a, & button": {
        "&, & *": {
          color: paletteType === "light" ? "#fff" : undefined,
        },
      },
    },
  }
}

export class MainMenu extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }


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

  // handleClose = () => {

  //   this.setState({
  //     opened: false,
  //   });

  // }


  render() {

    const {
      user,
      Link,
      Grid,
    } = this.context;

    const {
      // opened,
    } = this.state;

    const {
      classes,
    } = this.props;

    const {
      id: userId,
      sudo,
    } = user || {}

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
              >
                Главная страница
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
              >
                Пользователи
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
              >
                Проекты
            </Typography>
            </Link>
          </Grid>
 
          <Grid
            item
          >
            <Link
              // to='/tasks?filters=%7B"status_in"%3A%5B"New"%2C"Accepted"%2C"Progress"%2C"Paused"%2C"RevisionsRequired"%2C"Discuss"%2C"Approved"%2C"Done"%5D%7D'
              to='/tasks?filters=%7B"status_not"%3A"Done"%7D'
            >
              <Typography
                component="span"
              >
                Задачи
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
              >
                Таймеры
            </Typography>
            </Link>
          </Grid>


          <Grid
            item
            xs
          >
          </Grid>

          {user
            ?
            [
              <Grid
                key="user"
                item
              >
                <UserItem
                  key={userId}
                  user={user}
                />
              </Grid>,
              <Grid
                key="logout"
                item
              >
                <Button
                  onClick={() => this.logout()}
                >
                  Signout
              </Button>

              </Grid>
            ]
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