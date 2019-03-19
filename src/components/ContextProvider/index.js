
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
      ...this.prepareTaskReactionQuery(),
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
      UserNoNestingFragment,
      TaskNoNestingFragment,
      TimerNoNestingFragment,
    } = queryFragments;


    const ProjectFragment = `fragment Project on Project {
      ...ProjectNoNesting

      CreatedBy{
        ...UserNoNesting
      }
  
      Members{
        id
        User{
          ...UserNoNesting
        }
      }
      
      Tasks{
        ...TaskNoNesting
        Timers(
          where:{
            stopedAt: null
          }
        ){
          ...TimerNoNesting
          CreatedBy{
            ...UserNoNesting
          }
        }
        CreatedBy{
          ...UserNoNesting
        }
        Parent {
          ...TaskNoNesting
        }
      }

    }
    
      ${ProjectNoNestingFragment}
      ${UserNoNestingFragment}
      ${TaskNoNestingFragment}
      ${TimerNoNestingFragment}
    `;


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
              ...Project
            }
          }
        }
      }

      ${ProjectFragment}
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
          ...Project
        }
      }

      ${ProjectFragment}
    `;


    const project = `
      query project (
        $where: ProjectWhereUniqueInput!
      ){
        object: project (
          where: $where
        ){
          ...Project
        }
      }

      ${ProjectFragment}
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
            ...Project
          }
        }
      }

      ${ProjectFragment}
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
            ...Project
          }
        }
      }

      ${ProjectFragment}
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
      TaskReactionNoNestingFragment,
      UserNoNestingFragment,
      TimerNoNestingFragment,
      ProjectNoNestingFragment,
      ProjectMemberNoNestingFragment,
    } = queryFragments;


    const TaskFragment = `
      fragment Task on Task{
        ...TaskNoNesting

        CreatedBy{
          ...UserNoNesting
        }

        Timers(
          orderBy: createdAt_DESC
        ){
          ...TimerNoNesting
          CreatedBy{
            ...UserNoNesting
          }
        }

        Project{
          ...ProjectNoNesting
          CreatedBy{
            ...UserNoNesting
          }
          Members{
            ...ProjectMemberNoNesting
            User{
              ...UserNoNesting
            }
          }
        }

        RelatedTo{
          ...TaskNoNesting
        }

        Reactions{
          ...TaskReactionNoNesting
          CreatedBy{
            ...UserNoNesting
          }
        }
        
      }
      
      ${TaskNoNestingFragment}
      ${TaskReactionNoNestingFragment}
      ${UserNoNestingFragment}
      ${TimerNoNestingFragment}
      ${ProjectNoNestingFragment}
      ${ProjectMemberNoNestingFragment}
    `


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
              ...Task
            }
          }
        }
      }

      ${TaskFragment}
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
          ...Task
        }
      }

      ${TaskFragment}
    `;


    const task = `
      query task (
        $where: TaskWhereUniqueInput!
      ){
        object: task (
          where: $where
        ){
          ...Task
        }
      }

      ${TaskFragment}
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
            ...Task
          }
        }
      }

      ${TaskFragment}
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
            ...Task
          }
        }
      }

      ${TaskFragment}
    `;


    const taskStatusEnum = `
      query {
        objects: __type(
          name: "TaskStatus"
        ){
          values: enumValues{
            name
            description
          }
        }
      }
    `;

    return {
      tasksConnection,
      tasks,
      task,
      createTaskProcessor,
      updateTaskProcessor,
      taskStatusEnum,
    }

  }


  prepareTaskReactionQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      TaskReactionNoNestingFragment,
      TaskNoNestingFragment,
      UserNoNestingFragment,
    } = queryFragments;


    const TaskReactionFragment = `
      fragment TaskReaction on TaskReaction{
        ...TaskReactionNoNesting

        CreatedBy{
          ...UserNoNesting
        }

        Task{
          ...TaskNoNesting
          CreatedBy{
            ...UserNoNesting
          }
        }
        
      }
      
      ${TaskNoNestingFragment}
      ${TaskReactionNoNestingFragment}
      ${UserNoNestingFragment}
    `


    const taskReactionsConnection = `
      query taskReactionsConnection (
        $where: TaskReactionWhereInput
        $orderBy: TaskReactionOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objectsConnection: taskReactionsConnection (
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
              ...TaskReaction
            }
          }
        }
      }

      ${TaskReactionFragment}
    `;


    const taskReactions = `
      query taskReactions (
        $where: TaskReactionWhereInput
        $orderBy: TaskReactionOrderByInput
        $skip: Int
        $after: String
        $before: String
        $first: Int
        $last: Int
      ){
        objects: taskReactions (
          where: $where
          orderBy: $orderBy
          skip: $skip
          after: $after
          before: $before
          first: $first
          last: $last
        ){
          ...TaskReaction
        }
      }

      ${TaskReactionFragment}
    `;


    const taskReaction = `
      query taskReaction (
        $where: TaskReactionWhereUniqueInput!
      ){
        object: taskReaction (
          where: $where
        ){
          ...TaskReaction
        }
      }

      ${TaskReactionFragment}
    `;


    const createTaskReactionProcessor = `
      mutation createTaskReactionProcessor(
        $data: TaskReactionCreateInput!
      ) {
        response: createTaskReactionProcessor(
          data: $data
        ){
          success
          message
          errors{
            key
            message
          }
          data{
            ...TaskReaction
          }
        }
      }

      ${TaskReactionFragment}
    `;


    const updateTaskReactionProcessor = `
      mutation updateTaskReactionProcessor(
        $data: TaskReactionUpdateInput!
        $where: TaskReactionWhereUniqueInput!
      ) {
        response: updateTaskReactionProcessor(
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
            ...TaskReaction
          }
        }
      }

      ${TaskReactionFragment}
    `;

    const deleteTaskReaction = `
      mutation deleteTaskReaction(
        $where: TaskReactionWhereUniqueInput!
      ) {
        deleteTaskReaction(
          where: $where
        ){
          ...TaskReactionNoNesting
        }
      }

      ${TaskReactionNoNestingFragment}
    `;



    return {
      taskReactionsConnection,
      taskReactions,
      taskReaction,
      createTaskReactionProcessor,
      updateTaskReactionProcessor,
      deleteTaskReaction,
    }

  }


  prepareTimerQuery() {


    const {
      queryFragments,
    } = this.context;


    const {
      TimerNoNestingFragment,
      UserNoNestingFragment,
      TaskNoNestingFragment,
      ProjectNoNestingFragment,
    } = queryFragments;

    const TimerFragment = `
      fragment Timer on Timer{
        ...TimerNoNesting
    
        CreatedBy{
          ...UserNoNesting
        }
    
        Task {
          ...TaskNoNesting
    
          Project{
            ...ProjectNoNesting
          }
    
          CreatedBy{
            ...UserNoNesting
          }
        }
        
      }
      
      ${TimerNoNestingFragment}
      ${UserNoNestingFragment}
      ${TaskNoNestingFragment}
      ${ProjectNoNestingFragment}
    `

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
              ...Timer
            }
          }
        }
      }

      ${TimerFragment}
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
          ...Timer
        }
      }

      ${TimerFragment}
    `;


    const timer = `
      query timer (
        $where: TimerWhereUniqueInput!
      ){
        object: timer (
          where: $where
        ){
          ...Timer
        }
      }

      ${TimerFragment}
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
            ...Timer
          }
        }
      }

      ${TimerFragment}
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
            ...Timer
          }
        }
      }

      ${TimerFragment}
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
      BatchPayloadNoNestingFragment,
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


    const deleteTeamMember = `
      mutation deleteTeamMember (
        $where: TeamMemberWhereUniqueInput!
      ){
        deleteTeamMember(
          where: $where
        ){
          ...TeamMemberNoNesting
        }
      }
      ${TeamMemberNoNestingFragment}
    `;


    const deleteManyTeamMembers = `
      mutation deleteManyTeamMembers (
        $where: TeamMemberWhereInput
      ){
        deleteManyTeamMembers(
          where: $where
        ){
          ...BatchPayloadNoNesting
        }
      }
      ${BatchPayloadNoNestingFragment}
    `;



    return {
      teamMembersConnection,
      teamMembers,
      teamMember,
      createTeamMemberProcessor,
      updateTeamMemberProcessor,
      deleteTeamMember,
      deleteManyTeamMembers,
    }

  }

}

export default CooperationContextProvider;