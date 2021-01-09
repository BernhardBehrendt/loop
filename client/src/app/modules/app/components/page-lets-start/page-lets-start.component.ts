import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WrappedSocket} from '../../../socket-io/services/socket-io.service';

declare var Peer: any;

@Component({
    selector: 'app-page-lets-start',
    templateUrl: './page-lets-start.component.html',
    styleUrls: ['./page-lets-start.component.scss']
})
export class PageLetsStartComponent implements OnInit {

    public params: any;

    private peer: any;

    private p2pcon: any;

    public data: any;

    constructor(private route: ActivatedRoute, private socket: WrappedSocket) {
        this.peer = new Peer(undefined, {
            host: '/',
            port: 3001
        });
    }

    ngOnInit(): void {
        this
            .peer
            .on('open', (id: string) => {
                this
                    .route
                    .params
                    .subscribe((params => {
                        this.params = params;
                        this.socket.emit('join-room', this.params.roomId, id);
                    }));
            });

        this.peer.on('connection', (connection: any) => {
            connection.on('data', (data: any) => {
                this.data = data.data;
                console.log('Daten', data);
            });
        })

        this
            .socket
            .on('user-connected', (userId: any) => {
                console.log('User connected', userId);

                this.p2pcon = this.peer.connect(userId)

                this.p2pcon.on('open', () => {
                    //    this.p2pcon.send('HALLO ' + userId);
                });
            });
    }


    public broadcastLoop(event: any) {
        console.log('ready to broadcast');
        console.log(event);
        this.p2pcon.send(event);
    }

}
