import { Injectable } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
@WebSocketGateway(3002,{cors:true})
export class SocketService implements OnGatewayConnection,OnGatewayDisconnect {

    @WebSocketServer()
    server:any;

    @SubscribeMessage("message")
    handleMessage(@MessageBody() body :any ,@ConnectedSocket() socket:Socket){
         console.log('!!!!!!!!!!!!',body,socket.id)
    }

    handleConnection(@ConnectedSocket() socket:any){
      console.log("Client connected");   
    }

    handleDisconnect(@ConnectedSocket() socket:any){
        console.log("Client disconnected");
    }
}
