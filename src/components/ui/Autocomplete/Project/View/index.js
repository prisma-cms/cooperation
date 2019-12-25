import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

// import Autocomplete, { styles as stylesProto } from 'autocomplete';
// import Avatar from 'Avatar';

import { ListItem } from 'material-ui/List';

import gql from 'graphql-tag';
// import { withState } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';
import IconButton from 'material-ui/IconButton';

import DoneIcon from 'material-ui-icons/Done';
import ClearIcon from 'material-ui-icons/Clear';

import Context from "@prisma-cms/context";

import AutocompleteObject from "./Object";

const styles = {
  menuListItemText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "normal",
    fontSize: "1rem",
  },
}


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

export class ProjectsAutocompleteView extends Component {

  static contextType = Context;

  static propTypes = {
    classes: PropTypes.object.isRequired,

    // Кого исключить из результатов поиска
    exclude: PropTypes.array,

    // Выполнение при подтверждении
    onSubmit: PropTypes.func,

    onSelect: PropTypes.func.isRequired,
    resetData: PropTypes.func.isRequired,

    value: PropTypes.string.isRequired,

    // item: PropTypes.object,
    objectId: PropTypes.string,
  }

  state = {
    // value: "",
    // project: undefined,
    opened: false,
  }

  // onChange(event) {

  //   const {
  //     value,
  //   } = event.target;

  //   this.setState({
  //     value,
  //   }, () => this.loadData());


  // }


  // async loadData() {

  //   const {
  //     value,
  //   } = this.state;

  //   const {
  //     client,
  //     query: {
  //       projects: projectsQuery,
  //     },
  //   } = this.context;

  //   // console.log("projectsQuery", projectsQuery);

  //   // return null;

  //   const {
  //     exclude,
  //   } = this.props;

  //   let objects = [];

  //   let $query = value;

  //   let where = {
  //     name_contains: $query
  //   };

  //   if (exclude && exclude.length) {
  //     where.id_not_in = exclude;
  //   }

  //   if (value) {

  //     objects = await client.query({
  //       query: gql(projectsQuery),
  //       variables: {
  //         where,
  //       },
  //     })
  //       .then(r => {


  //         const {
  //           objects,
  //         } = r.data;

  //         return objects;

  //       })
  //       .catch(console.error);

  //   }


  //   this.setState({
  //     objects,
  //   });

  // }



  // async submit() {

  //   const {
  //     project,
  //   } = this.state;

  //   const {
  //     onSubmit,
  //   } = this.props;

  //   await onSubmit(project)
  //     .catch(console.error);

  //   this.resetData();
  // }


  // resetData() {
  //   this.setState({
  //     project: null,
  //     value: "",
  //     objects: [],
  //   });
  // }


  renderItem(item) {

    const {
      name,
    } = item;

    return name
  }

  render() {

    const {
      Autocomplete,
    } = this.context;

    const {
      classes,
      onSubmit,
      data: {
        objects,
      },
      value,
      // item: project,
      objectId,
      onSelect,
      resetData,
      ...other
    } = this.props;

    const {
      // value,
      // project,
      opened,
    } = this.state;

    let items = [];

    if (objects) {
      objects.map(n => {

        const {
          id: value,
          name: label,
        } = n;

        items.push({
          ...n,
          value,
          label,
        });
        // items.push(project);
      })
    }

    return (
      <Autocomplete
        {...other}
        // onChange={event => this.onChange(event)}
        value={value || ""}
        items={items}
        onSelect={onSelect}
        onMenuVisibilityChange={opened => this.setState({
          opened,
        })}
        renderInput={!opened && objectId
          ?
          // props => {

          //   return <div
          //     style={{
          //       display: "flex",
          //       flexDirection: "row",
          //       flexWrap: "nowrap",
          //       alignItems: "center",
          //     }}
          //   >
          //     {this.renderItem(project)} {onSubmit ?
          //       <IconButton
          //         style={{
          //           width: 34,
          //           height: 34,
          //         }}
          //         onClick={event => this.submit()}
          //       >
          //         <DoneIcon
          //           style={{
          //             color: "green",
          //           }}
          //         />
          //       </IconButton>
          //       : null
          //     }
          //     <IconButton
          //       style={{
          //         width: 34,
          //         height: 34,
          //       }}
          //       onClick={resetData}
          //     >
          //       <ClearIcon
          //         style={{
          //           color: "red",
          //         }}
          //       />
          //     </IconButton>
          //   </div>
          // }
          props => {

            return <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
              }}
            >
              <AutocompleteObject
                where={{
                  id: objectId,
                }}
              /> {onSubmit ?
                <IconButton
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
                : null
              }
              <IconButton
                style={{
                  width: 34,
                  height: 34,
                }}
                onClick={resetData}
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
              {this.renderItem(item)}
            </div>
          </ListItem>
        }}
      />
    )
  }
}

// export default ProjectsAutocompleteView;

export default withStyles(styles)(props => <ProjectsAutocompleteView
  {...props}
/>);