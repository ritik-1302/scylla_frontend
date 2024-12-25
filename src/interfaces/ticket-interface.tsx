export type Ticket = {
    _id: string | null;
    type: string;
    device: {
      _id: string;
      identifier: string;
      type: string;
    };
    status: string;
  };
  
 export interface TicketsProps {
    tickets: Ticket[];
  }

  export interface TicketProp{
    ticket:Ticket
  }