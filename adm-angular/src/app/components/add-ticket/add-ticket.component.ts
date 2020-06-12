import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  constructor() { }

  randomTicket: string;

  ngOnInit(): void {
  }

  createRandomCode() {
    
    let randomNumber = Math.random().toString().substr(3, 12);

    return this.randomTicket = randomNumber;
  }

}
