import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WrappedSocket} from '../../modules/socket-io/services/socket-io.service';


@Component({
  selector: 'app-page-lets-start',
  templateUrl: './page-lets-start.component.html',
  styleUrls: ['./page-lets-start.component.scss']
})
export class PageLetsStartComponent implements OnInit {

  public params: any;

  constructor(private route: ActivatedRoute, private socket: WrappedSocket) {

  }

  ngOnInit(): void {
    // https://www.youtube.com/watch?v=DvlyzDZDEq4
    this
      .route
      .params
      .subscribe((params => {
        this.params = params;
        this.socket.emit('join-room', this.params.roomId, new Date().getTime());
      }));
  }

}
