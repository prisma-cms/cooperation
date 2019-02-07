import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

// import Autocomplete, { styles as stylesProto } from 'autocomplete';
// import Avatar from 'Avatar';

import { ListItem } from 'material-ui/List';

import gql from 'graphql-tag';
// import { withState } from 'recompose';
import { withStyles } from 'material-ui';
import IconButton from 'material-ui/IconButton';

import DoneIcon from 'material-ui-icons/Done';
import ClearIcon from 'material-ui-icons/Clear';

import Context from "@prisma-cms/context";

// const styles = {
//   ...stylesProto,
//   menuListItemText: {
//     ...stylesProto.menuListItemText,
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     fontWeight: "normal",
//     fontSize: "1rem",
//   },
// }


// const projectsQuery = gql`
//   query projects(
//     $where: ProjectWhereInput!
//     $orderBy: ProjectOrderByInput
//   ){
//     projects(
//       where: $where
//       orderBy: $orderBy
//     ){
//       id
//       projectname
//       firstname
//       lastname
//       fullname
//       photo
//     }
//   }
// `;

export class ProjectsAutocomplete extends Component {

  static contextType = Context;

  static propTypes = {
    classes: PropTypes.object.isRequired,

    // Кого исключить из результатов поиска
    exclude: PropTypes.array,

    // Выполнение при подтверждении
    onSubmit: PropTypes.func,
  }

  state = {
    value: "",
    project: undefined,
    opened: false,
  }

  onChange(event) {

    const {
      value,
    } = event.target;

    this.setState({
      value,
    }, () => this.loadData());


  }


  async loadData() {

    const {
      value,
    } = this.state;

    const {
      client,
      query: {
        projects: projectsQuery,
      },
    } = this.context;

    console.log("projectsQuery", projectsQuery);

    // return null;

    const {
      exclude,
    } = this.props;

    let projects = [];

    let $query = value;

    let where = {
      OR: [{
        projectname_contains: $query
      }, {
        firstname_contains: $query
      }, {
        lastname_contains: $query
      }, {
        email_contains: $query
      }]
    };

    if (exclude && exclude.length) {
      where.id_not_in = exclude;
    }

    if (value) {

      projects = await client.query({
        query: gql(projectsQuery),
        variables: {
          where,
        },
      })
        .then(r => {


          const {
            projects,
          } = r.data;

          return projects;

        })
        .catch(console.error);

    }


    this.setState({
      projects,
    });

  }


  onSelect = (value, item) => {

    this.setState({
      project: item,
    });
  }


  async submit() {

    const {
      project,
    } = this.state;

    const {
      onSubmit,
    } = this.props;

    await onSubmit(project)
      .catch(console.error);

    this.resetData();
  }


  resetData() {
    this.setState({
      project: null,
      value: "",
      projects: [],
    });
  }


  renderProject(item) {

    const {
      fullname,
      projectname,
    } = item;

    const text = fullname || projectname;

    const {
      Avatar,
    } = this.context;

    return <Fragment>
      <Avatar
        project={item}
        size="small"
        style={{
          marginRight: 5,
        }}
      /> {text}
    </Fragment>
  }

  render() {

    const {
      Autocomplete,
    } = this.context;

    const {
      classes,
      ...other
    } = this.props;

    const {
      value,
      projects,
      project,
      opened,
    } = this.state;

    let items = [];

    if (projects) {
      projects.map(project => {

        const {
          id: value,
          fullname,
          projectname,
        } = project;

        items.push({
          ...project,
          value,
          label: fullname || projectname,
        });
        // items.push(project);
      })
    }

    return (
      <Autocomplete
        {...other}
        onChange={event => this.onChange(event)}
        value={value || ""}
        items={items}
        onSelect={this.onSelect}
        onMenuVisibilityChange={opened => this.setState({
          opened,
        })}
        renderInput={!opened && project
          ?
          props => {



            return <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
              }}
            >
              {this.renderProject(project)} <IconButton
                style={{
                  width: 34,
                  height: 34,
                }}
                onClick={event => this.submit()}
              >
                <DoneIcon
                  style={{
                    color: "green",
                  }}
                />
              </IconButton>
              <IconButton
                style={{
                  width: 34,
                  height: 34,
                }}
                onClick={event => this.resetData()}
              >
                <ClearIcon
                  style={{
                    color: "red",
                  }}
                />
              </IconButton>
            </div>
          }
          :
          undefined
        }
        renderItem={(item, isHighlighted, style) => {




          // const text = getItemText(item);

          const {
            label,
          } = item;

          const text = label;

          return <ListItem
            key={item.value}
            className={[classes.menuListItem, (isHighlighted || item.label === value || item.value === value) ? "actived" : ""].join(" ")}
          >
            <div
              className={classes.menuListItemText}
            >
              {this.renderProject(item)}
            </div>
          </ListItem>
        }}
      />
    )
  }
}

export default ProjectsAutocomplete;

// export default withStyles(styles)(props => <ProjectsAutocomplete 
//   {...props}
// />);