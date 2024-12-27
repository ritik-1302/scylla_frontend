export type Ticket = {
    _id: string;
    type: string;
    device: {
      _id: string;
      identifier: string;
      type: string;
    };
    status: string;
    createdAt:number;
    updatedAt:number;
  };
  
 export interface TicketsProps {
    tickets: Ticket[];
  }

  export interface TicketProp{
    ticket:Ticket
  }