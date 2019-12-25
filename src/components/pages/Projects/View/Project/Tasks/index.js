import React from 'react';
import PropTypes from 'prop-types';

import 'react-sortable-tree/style.css';

import SortableTree, {
  // addNodeUnderParent,
  // removeNodeAtPath,
} from "react-sortable-tree";

import TasksListView from "../../../../Tasks/View/List";
import withStyles from 'material-ui/styles/withStyles';
import IconButton from 'material-ui/IconButton';

import AddIcon from "material-ui-icons/AddCircleOutline";

import TaskView, {
  styles as taskStyles,
} from "./Task";
import gql from 'graphql-tag';


export const styles = theme => {

  const baseStyles = taskStyles(theme);

  // console.log("baseStyles", baseStyles);

  const {
    status,
  } = baseStyles;

  let row = {
  };

  for (var i in status) {

    row[`${i}.status`] = {
      "& .rst__moveHandle": {
        ...status[i],
      },
    }

  }

  return {
    ...baseStyles,
    root: {
      height: 700,
    },
    row,
  };
}


export class ProjectTasksListView extends TasksListView {


  static propTypes = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...TasksListView.propTypes,
    classes: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
  }


  static defaultProps = {
    ...TasksListView.defaultProps,
    TaskView,
  }


  constructor(props) {

    super(props);

    this.state = {
      ...this.state,
      treeData: [],
      newChilds: [],
      expanded: [],
      expandedAll: true,
    }

  }

  getNodeKey({ node, treeIndex, }) {

    const {
      id,
    } = node;

    return id || treeIndex;
  }

  onMoveNode = async (data) => {

    const {
      node,
      nextParentNode,
      prevPath,
    } = data;

    // const {
    //   updateTaskProcessorQuery,
    // } = this.props;

    const {
      query: {
        updateTaskProcessor,
      },
    } = this.context;

    const {
      id,
    } = node;

    let Parent;

    if (nextParentNode) {

      const {
        id,
      } = nextParentNode;

      Parent = {
        connect: {
          id,
        },
      }
    }
    else if (prevPath && prevPath.length > 1) {
      Parent = {
        disconnect: true,
      }
    }

    await this.mutate({
      mutation: gql(updateTaskProcessor),
      variables: {
        where: {
          id,
        },
        data: {
          Parent,
        },
      },
    });


  }


  renderItems() {

    const {
      classes,
      tasks,
      project,
    } = this.props;

    const {
      // treeData,
      newChilds,
      // children,
      expanded,
      expandedAll,
    } = this.state;

    let treeData = [];

    if (!tasks || !project) {
      return null;
    }

    // const {
    //   ProjectLink,
    // } = this.context;

    const {
      id: projectId,
    } = project;

    const nodes = tasks.map(n => {

      const {
        id,
      } = n;

      return {
        ...n,
        expanded: expandedAll || (id && expanded.indexOf(id) !== -1) ? true : false,
        children: [],
      };
    }).concat(newChilds);

    /**
     * Сначала получаем первый уровень
     */
    // let rootLevel = tasks.filter(n => !n.Parent).map(n => ({
    //   ...n,
    //   children: [],
    // }));

    /**
     * Обрабатываем все остальные ноды, создавая иерархию
     */

    /**
     * Сортировка происходит в два этапа:
     * 1. Создаем одноуровневый массив всех элементов.
     * 2. Затем делаем его клон (сохраняя сами элементы).
     * 3. Последним этапом проходим по каждому элементу и если находим элемент, закидываем его дочерним в него
     */




    let nodesTree = [];

    nodes.map(n => {

      const {
        Parent,
      } = n;

      if (Parent) {

        let parentNode = nodes.find(n => n.id === Parent.id);

        if (parentNode) {

          parentNode.children.push(n);

          return null;
        }

      }

      /**
       * Если не был добавлен в другую ноду, выводим в корень
       */
      nodesTree.push(n);

      return null;
    });


    nodesTree.map(n => {

      treeData.push(n);

      return null;
    });

    return <div
      className={classes.root}
    >
      <SortableTree
        rowHeight={74}
        treeData={treeData}
        getNodeKey={this.getNodeKey}
        onChange={treeData => {
          // console.log("onChange treeData", treeData);
          // this.setState({ treeData });
        }}
        onVisibilityToggle={({ treeData, node, expanded, path }) => {
          console.log("onVisibilityToggle treeData", treeData, node, expanded, path);
          // this.setState({ treeData });

          const {
            id,
          } = node;

          if (!id) {
            return;
          }

          let {
            expanded: prevExpanded,
            expandedAll,
          } = this.state;

          let newExpanded = [...prevExpanded];


          if (expandedAll) {
            expandedAll = false;
            path.splice(-1, 1);
            newExpanded = [...path];
          }
          else if (expanded) {
            newExpanded.push(id);
          }
          else {
            newExpanded.splice(newExpanded.indexOf(id), 1);
          }

          this.setState({
            expandedAll,
            expanded: newExpanded,
          })

        }}
        onMoveNode={this.onMoveNode}
        generateNodeProps={({ node, path }) => {

          // console.log("generateNodeProps", node, path);

          const {
            id: taskId,
            // name: title,
            status,
          } = node;

          let buttons = [];

          if (taskId) {

            buttons.push(<IconButton
              onClick={(event) => {

                // console.log("onAddClick", event);

                // return;

                // this.setState(state => ({
                //   treeData: addNodeUnderParent({
                //     treeData,
                //     parentKey: path[path.length - 1],
                //     expandParent: true,
                //     getNodeKey: this.getNodeKey,
                //     newNode: {
                //       id: "DSfsdf",
                //       title: `rgergerg`,
                //     },
                //     // addAsFirstChild: state.addAsFirstChild,
                //     addAsFirstChild: true,
                //   }).treeData,
                // }))

                let newItem = {
                  Parent: {
                    id: taskId,
                  },
                  _dirty: {
                    name: "",
                    Project: {
                      connect: {
                        id: projectId,
                      },
                    },
                    Parent: {
                      connect: {
                        id: taskId,
                      },
                    },
                  },
                };

                newItem.onSave = result => {

                  const {
                    success,
                  } = result.data.response;

                  if (success) {

                    let {
                      newChilds,
                    } = this.state;

                    /**
                      Если успешно сохранено, то удаляем из новых элементов
                     */
                    const index = newChilds.indexOf(newItem);

                    if (index !== -1) {
                      newChilds.splice(index, 1);

                      this.setState({
                        newChilds,
                      });
                    }

                  }

                }

                this.setState({
                  newChilds: [...newChilds].concat([newItem]),
                });
              }}
            >
              <AddIcon />
            </IconButton>
            );
          }

          return {
            className: [classes.row, "status", status].join(" "),
            // subtitle: () => <div>
            //   <ProjectLink
            //     object={project}
            //   />
            // </div>,
            title: () => {
              return this.renderItem(node);
            },
            buttons,
          };
        }}
      />
    </div >
  }


  renderItem(task, props) {

    const {
      _dirty,
      onSave,
      ...other
    } = task;

    return super.renderItem(other, {
      ...props,
      onSave,
      _dirty,
    });
  }

}


export default withStyles(styles)(props => <ProjectTasksListView
  {...props}
/>);