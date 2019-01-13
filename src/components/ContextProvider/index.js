
import React, {
  Component,
} from 'react';

import Context from '@prisma-cms/context';

import * as UI from "../ui"

class CooperationContextProvider extends Component {

  static contextType = Context;


  // componentWillMount() {

  //   const {
  //     query,
  //     ...other
  //   } = this.context;

  //   this.newContext = {
  //     query: {
  //       ...query,
  //       ...this.prepareQuery(),
  //     },
  //     ...other
  //   }

  // }


  render() {

    const {
      children,
    } = this.props;

    let {
      query,
    } = this.context;

    Object.assign(this.context, {
      query: {
        ...query,
        ...this.prepareQuery(),
      },
      ...UI,
    });

    return <Context.Provider
      value={this.context}
    >
      {children || null}
    </Context.Provider>;

  }

  prepareQuery() {

    return {
      ...this.prepareProjectQuery(),
      ...this.prepareTaskQuery(),
      ...this.prepareTimerQuery(),
      ...this.prepareTeamQuery(),
      ...this.preparePositionQuery(),
      ...this.prepareProjectMemberQuery(),
      ...this.prepareServiceQuery(),
      ...this.prepareTaskMemberQuery(),
      ...this.prepareTeamMemberQuery(),
    }
  }

  
  prepareProjectQuery() {
    

    const {
      queryFragments,
    } = this.context;


    const {
      ProjectNoNestingFragment,
    } = queryFragments;



    const projectsConnection = `
      query projectsConnection (
        $where: ProjectWhereInput
        $orderBy: ProjectOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: projectsConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...ProjectNoNesting
            }
          }
        }
      }

      ${ProjectNoNestingFragment}
    `;


    const projects = `
      query projects (
        $where: ProjectWhereInput
        $orderBy: ProjectOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: projects (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...ProjectNoNesting
        }
      }

      ${ProjectNoNestingFragment}
    `;


    const project = `
      query project (
        $where: ProjectWhereUniqueInput!
      ){
        object: project (
          where: $where
        ){
          ...ProjectNoNesting
        }
      }

      ${ProjectNoNestingFragment}
    `;


    const createProjectProcessor = `
      mutation createProjectProcessor(
        $data: ProjectCreateInput!
      ) {
        response: createProjectProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...ProjectNoNesting
          }
        }
      }

      ${ProjectNoNestingFragment}
    `;


    const updateProjectProcessor = `
      mutation updateProjectProcessor(
        $data: ProjectUpdateInput!
        $where: ProjectWhereUniqueInput!
      ) {
        response: updateProjectProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...ProjectNoNesting
          }
        }
      }

      ${ProjectNoNestingFragment}
    `;



    return {
      projectsConnection,
      projects,
      project,
      createProjectProcessor,
      updateProjectProcessor,
    }

  }

  
  prepareTaskQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      TaskNoNestingFragment,
    } = queryFragments;



    const tasksConnection = `
      query tasksConnection (
        $where: TaskWhereInput
        $orderBy: TaskOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: tasksConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...TaskNoNesting
            }
          }
        }
      }

      ${TaskNoNestingFragment}
    `;


    const tasks = `
      query tasks (
        $where: TaskWhereInput
        $orderBy: TaskOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: tasks (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...TaskNoNesting
        }
      }

      ${TaskNoNestingFragment}
    `;


    const task = `
      query task (
        $where: TaskWhereUniqueInput!
      ){
        object: task (
          where: $where
        ){
          ...TaskNoNesting
        }
      }

      ${TaskNoNestingFragment}
    `;


    const createTaskProcessor = `
      mutation createTaskProcessor(
        $data: TaskCreateInput!
      ) {
        response: createTaskProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TaskNoNesting
          }
        }
      }

      ${TaskNoNestingFragment}
    `;


    const updateTaskProcessor = `
      mutation updateTaskProcessor(
        $data: TaskUpdateInput!
        $where: TaskWhereUniqueInput!
      ) {
        response: updateTaskProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TaskNoNesting
          }
        }
      }

      ${TaskNoNestingFragment}
    `;



    return {
      tasksConnection,
      tasks,
      task,
      createTaskProcessor,
      updateTaskProcessor,
    }

  }

  
  prepareTimerQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      TimerNoNestingFragment,
    } = queryFragments;



    const timersConnection = `
      query timersConnection (
        $where: TimerWhereInput
        $orderBy: TimerOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: timersConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...TimerNoNesting
            }
          }
        }
      }

      ${TimerNoNestingFragment}
    `;


    const timers = `
      query timers (
        $where: TimerWhereInput
        $orderBy: TimerOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: timers (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...TimerNoNesting
        }
      }

      ${TimerNoNestingFragment}
    `;


    const timer = `
      query timer (
        $where: TimerWhereUniqueInput!
      ){
        object: timer (
          where: $where
        ){
          ...TimerNoNesting
        }
      }

      ${TimerNoNestingFragment}
    `;


    const createTimerProcessor = `
      mutation createTimerProcessor(
        $data: TimerCreateInput!
      ) {
        response: createTimerProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TimerNoNesting
          }
        }
      }

      ${TimerNoNestingFragment}
    `;


    const updateTimerProcessor = `
      mutation updateTimerProcessor(
        $data: TimerUpdateInput!
        $where: TimerWhereUniqueInput!
      ) {
        response: updateTimerProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TimerNoNesting
          }
        }
      }

      ${TimerNoNestingFragment}
    `;



    return {
      timersConnection,
      timers,
      timer,
      createTimerProcessor,
      updateTimerProcessor,
    }

  }

  
  prepareTeamQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      TeamNoNestingFragment,
    } = queryFragments;



    const teamsConnection = `
      query teamsConnection (
        $where: TeamWhereInput
        $orderBy: TeamOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: teamsConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...TeamNoNesting
            }
          }
        }
      }

      ${TeamNoNestingFragment}
    `;


    const teams = `
      query teams (
        $where: TeamWhereInput
        $orderBy: TeamOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: teams (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...TeamNoNesting
        }
      }

      ${TeamNoNestingFragment}
    `;


    const team = `
      query team (
        $where: TeamWhereUniqueInput!
      ){
        object: team (
          where: $where
        ){
          ...TeamNoNesting
        }
      }

      ${TeamNoNestingFragment}
    `;


    const createTeamProcessor = `
      mutation createTeamProcessor(
        $data: TeamCreateInput!
      ) {
        response: createTeamProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TeamNoNesting
          }
        }
      }

      ${TeamNoNestingFragment}
    `;


    const updateTeamProcessor = `
      mutation updateTeamProcessor(
        $data: TeamUpdateInput!
        $where: TeamWhereUniqueInput!
      ) {
        response: updateTeamProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TeamNoNesting
          }
        }
      }

      ${TeamNoNestingFragment}
    `;



    return {
      teamsConnection,
      teams,
      team,
      createTeamProcessor,
      updateTeamProcessor,
    }

  }

  
  preparePositionQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      PositionNoNestingFragment,
    } = queryFragments;



    const positionsConnection = `
      query positionsConnection (
        $where: PositionWhereInput
        $orderBy: PositionOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: positionsConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...PositionNoNesting
            }
          }
        }
      }

      ${PositionNoNestingFragment}
    `;


    const positions = `
      query positions (
        $where: PositionWhereInput
        $orderBy: PositionOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: positions (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...PositionNoNesting
        }
      }

      ${PositionNoNestingFragment}
    `;


    const position = `
      query position (
        $where: PositionWhereUniqueInput!
      ){
        object: position (
          where: $where
        ){
          ...PositionNoNesting
        }
      }

      ${PositionNoNestingFragment}
    `;


    const createPositionProcessor = `
      mutation createPositionProcessor(
        $data: PositionCreateInput!
      ) {
        response: createPositionProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...PositionNoNesting
          }
        }
      }

      ${PositionNoNestingFragment}
    `;


    const updatePositionProcessor = `
      mutation updatePositionProcessor(
        $data: PositionUpdateInput!
        $where: PositionWhereUniqueInput!
      ) {
        response: updatePositionProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...PositionNoNesting
          }
        }
      }

      ${PositionNoNestingFragment}
    `;



    return {
      positionsConnection,
      positions,
      position,
      createPositionProcessor,
      updatePositionProcessor,
    }

  }

  
  prepareProjectMemberQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      ProjectMemberNoNestingFragment,
    } = queryFragments;



    const projectMembersConnection = `
      query projectMembersConnection (
        $where: ProjectMemberWhereInput
        $orderBy: ProjectMemberOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: projectMembersConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...ProjectMemberNoNesting
            }
          }
        }
      }

      ${ProjectMemberNoNestingFragment}
    `;


    const projectMembers = `
      query projectMembers (
        $where: ProjectMemberWhereInput
        $orderBy: ProjectMemberOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: projectMembers (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...ProjectMemberNoNesting
        }
      }

      ${ProjectMemberNoNestingFragment}
    `;


    const projectMember = `
      query projectMember (
        $where: ProjectMemberWhereUniqueInput!
      ){
        object: projectMember (
          where: $where
        ){
          ...ProjectMemberNoNesting
        }
      }

      ${ProjectMemberNoNestingFragment}
    `;


    const createProjectMemberProcessor = `
      mutation createProjectMemberProcessor(
        $data: ProjectMemberCreateInput!
      ) {
        response: createProjectMemberProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...ProjectMemberNoNesting
          }
        }
      }

      ${ProjectMemberNoNestingFragment}
    `;


    const updateProjectMemberProcessor = `
      mutation updateProjectMemberProcessor(
        $data: ProjectMemberUpdateInput!
        $where: ProjectMemberWhereUniqueInput!
      ) {
        response: updateProjectMemberProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...ProjectMemberNoNesting
          }
        }
      }

      ${ProjectMemberNoNestingFragment}
    `;



    return {
      projectMembersConnection,
      projectMembers,
      projectMember,
      createProjectMemberProcessor,
      updateProjectMemberProcessor,
    }

  }

  
  prepareServiceQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      ServiceNoNestingFragment,
    } = queryFragments;



    const servicesConnection = `
      query servicesConnection (
        $where: ServiceWhereInput
        $orderBy: ServiceOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: servicesConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...ServiceNoNesting
            }
          }
        }
      }

      ${ServiceNoNestingFragment}
    `;


    const services = `
      query services (
        $where: ServiceWhereInput
        $orderBy: ServiceOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: services (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...ServiceNoNesting
        }
      }

      ${ServiceNoNestingFragment}
    `;


    const service = `
      query service (
        $where: ServiceWhereUniqueInput!
      ){
        object: service (
          where: $where
        ){
          ...ServiceNoNesting
        }
      }

      ${ServiceNoNestingFragment}
    `;


    const createServiceProcessor = `
      mutation createServiceProcessor(
        $data: ServiceCreateInput!
      ) {
        response: createServiceProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...ServiceNoNesting
          }
        }
      }

      ${ServiceNoNestingFragment}
    `;


    const updateServiceProcessor = `
      mutation updateServiceProcessor(
        $data: ServiceUpdateInput!
        $where: ServiceWhereUniqueInput!
      ) {
        response: updateServiceProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...ServiceNoNesting
          }
        }
      }

      ${ServiceNoNestingFragment}
    `;



    return {
      servicesConnection,
      services,
      service,
      createServiceProcessor,
      updateServiceProcessor,
    }

  }

  
  prepareTaskMemberQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      TaskMemberNoNestingFragment,
    } = queryFragments;



    const taskMembersConnection = `
      query taskMembersConnection (
        $where: TaskMemberWhereInput
        $orderBy: TaskMemberOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: taskMembersConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...TaskMemberNoNesting
            }
          }
        }
      }

      ${TaskMemberNoNestingFragment}
    `;


    const taskMembers = `
      query taskMembers (
        $where: TaskMemberWhereInput
        $orderBy: TaskMemberOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: taskMembers (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...TaskMemberNoNesting
        }
      }

      ${TaskMemberNoNestingFragment}
    `;


    const taskMember = `
      query taskMember (
        $where: TaskMemberWhereUniqueInput!
      ){
        object: taskMember (
          where: $where
        ){
          ...TaskMemberNoNesting
        }
      }

      ${TaskMemberNoNestingFragment}
    `;


    const createTaskMemberProcessor = `
      mutation createTaskMemberProcessor(
        $data: TaskMemberCreateInput!
      ) {
        response: createTaskMemberProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TaskMemberNoNesting
          }
        }
      }

      ${TaskMemberNoNestingFragment}
    `;


    const updateTaskMemberProcessor = `
      mutation updateTaskMemberProcessor(
        $data: TaskMemberUpdateInput!
        $where: TaskMemberWhereUniqueInput!
      ) {
        response: updateTaskMemberProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TaskMemberNoNesting
          }
        }
      }

      ${TaskMemberNoNestingFragment}
    `;



    return {
      taskMembersConnection,
      taskMembers,
      taskMember,
      createTaskMemberProcessor,
      updateTaskMemberProcessor,
    }

  }

  
  prepareTeamMemberQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      TeamMemberNoNestingFragment,
    } = queryFragments;



    const teamMembersConnection = `
      query teamMembersConnection (
        $where: TeamMemberWhereInput
        $orderBy: TeamMemberOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: teamMembersConnection (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          aggregate{
            count
          }
          edges{
            node{
              ...TeamMemberNoNesting
            }
          }
        }
      }

      ${TeamMemberNoNestingFragment}
    `;


    const teamMembers = `
      query teamMembers (
        $where: TeamMemberWhereInput
        $orderBy: TeamMemberOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: teamMembers (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...TeamMemberNoNesting
        }
      }

      ${TeamMemberNoNestingFragment}
    `;


    const teamMember = `
      query teamMember (
        $where: TeamMemberWhereUniqueInput!
      ){
        object: teamMember (
          where: $where
        ){
          ...TeamMemberNoNesting
        }
      }

      ${TeamMemberNoNestingFragment}
    `;


    const createTeamMemberProcessor = `
      mutation createTeamMemberProcessor(
        $data: TeamMemberCreateInput!
      ) {
        response: createTeamMemberProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TeamMemberNoNesting
          }
        }
      }

      ${TeamMemberNoNestingFragment}
    `;


    const updateTeamMemberProcessor = `
      mutation updateTeamMemberProcessor(
        $data: TeamMemberUpdateInput!
        $where: TeamMemberWhereUniqueInput!
      ) {
        response: updateTeamMemberProcessor(
          data: $data
          where: $where
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TeamMemberNoNesting
          }
        }
      }

      ${TeamMemberNoNestingFragment}
    `;



    return {
      teamMembersConnection,
      teamMembers,
      teamMember,
      createTeamMemberProcessor,
      updateTeamMemberProcessor,
    }

  }

}

export default CooperationContextProvider;