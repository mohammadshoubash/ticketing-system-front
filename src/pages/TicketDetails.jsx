import AppLayout from '../layouts/AppLayout.jsx'
import { useParams } from 'react-router-dom';

export default function TicketDetails() {
  const {id} = useParams();

  return (
    <AppLayout>
      <div>Ticket {id} Details Page</div>
    </AppLayout>
  )
}