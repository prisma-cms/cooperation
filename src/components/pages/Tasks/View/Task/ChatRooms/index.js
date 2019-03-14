import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  ChatRooms,
  // NewMessage,
} from "@prisma-cms/society";

import ChatRoomView from "@prisma-cms/society/lib/components/pages/ChatRooms/View/Object";

import PrismaCmsComponent from "@prisma-cms/component";

import { Button } from 'material-ui';
import gql from 'graphql-tag';


class ChatRoomsByTaskView extends PrismaCmsComponent {


  static propTypes = {
    data: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    updateChatRoomProcessor: PropTypes.func.isRequired,
  };


  async createChatRoom(data) {

    const {
      inRequest,
    } = this.state;

    if (inRequest) {
      return;
    }

    this.setState({
      inRequest: true,
    });

    const {
      query: {
        createChatRoomProcessor,
      },
    } = this.context;


    await this.mutate({
      mutation: gql(createChatRoomProcessor),
      variables: {
        data,
      },
    })
      .catch(error => {

        console.error(error);

        /**
         * Восстанавливаем право запроса только в случае ошибки, так как создаться комната должна только одна.
         * А так, пока данные обновляются и подтягивается информация о чат-комнате, юзер может еще раз нажать.
         */
        this.setState({
          inRequest: false,
        });

      });

  }


  render() {

    const {
      user: currentUser,
    } = this.context;

    const {
      id: currentUserId
    } = currentUser || {};

    const {
      data: {
        loading,
        objectsConnection,
      },
      task,
      updateChatRoomProcessor,
    } = this.props;

    const {
      inRequest,
    } = this.state;

    const {
      id: taskId,
      name,
      Project,
    } = task;

    if (!taskId) {
      return null;
    }

    const {
      CreatedBy: projectCreatedBy,
    } = Project || {};

    const {
      id: projectCreatedById,
    } = projectCreatedBy || {};

    const chatRoom = objectsConnection && objectsConnection.edges[0] && objectsConnection.edges[0].node || null;

    // console.log("task", task);

    let output = null;

    if (chatRoom) {
      output = <ChatRoomView
        data={{
          object: chatRoom,
        }}
        mutate={updateChatRoomProcessor}
      />
    }
    else {

      if (!loading) {

        output = <Button
          color="primary"
          disabled={inRequest ? true : false}
          onClick={event => {

            if (!currentUserId) {

              const {
                openLoginForm,
              } = this.context;

              openLoginForm();

              return;
            }

            let Members = {
              connect: [],
            };

            if (projectCreatedById && projectCreatedById !== currentUserId) {
              Members.connect.push({
                id: projectCreatedById,
              });
            }

            this.createChatRoom({
              name,
              isPublic: true,
              Task: {
                connect: {
                  id: taskId,
                },
              },
              Members,
            })
          }}
        >
          Начать чат
       </Button>

      }
    }

    return super.render(output);
  }

}


class ChatRoomsByTask extends ChatRooms {

  static defaultProps = {
    ...ChatRooms.defaultProps,
    View: ChatRoomsByTaskView,
  }



  setPageMeta(meta) {
  }


  getFilters() {
    return;
  }

}

export default ChatRoomsByTask;

