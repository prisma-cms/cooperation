
import React from "react";

import gql from "graphql-tag";

import { graphql, compose } from "react-apollo";


import {
  ProjectNoNestingFragment,
  UserNoNestingFragment,
  TaskNoNestingFragment,
  TimerNoNestingFragment,
} from "../../../schema/generated/api.fragments";


export const createProjectProcessor = gql`
 

mutation createProjectProcessor(
  $data: ProjectCreateInput!
){
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


export const updateProjectProcessor = gql`


mutation updateProjectProcessor(
  $data: ProjectUpdateInput!
  $where: ProjectWhereUniqueInput!
){
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



export const projectFragment = `
  fragment projectFragment on Project{
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
`

export const projectsListFragment = `
  fragment projectsListFragment on Project{
    ...projectFragment
  }

  ${projectFragment}
`;



export const projectsConnectionQuery = gql`

  query projectsConnection(
    $first:Int!
    $skip:Int
    $where: ProjectWhereInput
    $orderBy: ProjectOrderByInput!
  ){
    objectsConnection: projectsConnection(
      orderBy: $orderBy
      first: $first
      skip: $skip
      where: $where
    ){
      aggregate{
        count
      }
      edges{
        node{
          ...projectsListFragment
        }
      }
    }
  }

  ${projectsListFragment}

`;

export const projectQuery = gql`

  query project(
    $where: ProjectWhereUniqueInput!
  ){
    object: project(
      where: $where
    ){ 
      ...projectFragment 
    }
  }

  ${projectFragment}

`;



const ProjectsQuery = graphql(projectsConnectionQuery);
export const ProjectsConnector = ProjectsQuery(props => {

  const {
    View,
    ...other
  } = props;

  return <View
    {...other}
  />;
});



const ProjectQuery = graphql(projectQuery);
export const Project = ProjectQuery(props => {

  const {
    View,
    ...other
  } = props;

  return <View
    {...other}
  />;
});



