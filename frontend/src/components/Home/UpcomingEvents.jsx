import { Link } from 'react-router-dom'
import { formatDate } from './HomeHelpers'
 const UpcomingEvents = ({ events }) => {
    if (!events.length) return null

    const displayed = events.slice(0, 3)

   return (
           <section className="events-section">
               <div className="container">
                   <h2 className="section-title center">Upcoming Events</h2>
                   <div className="events-grid">
                       {displayed.map(event => {
                           const { day, month } = formatDate(event.event_date)
                           return (
                               <div key={event.id} className="event-card">
                                   <div className="event-img-wrap">
                                       {event.event_image ? (
                                           <img
                                               src={event.event_image}
                                               alt={event.event_title}
                                               className="event-img"
                                           />
                                       ) : (
                                           <div className="event-img-placeholder">🎉</div>
                                       )}
                                       <div className="event-date-badge">
                                           <span className="event-date-day">{day}</span>
                                           <span className="event-date-month">{month}</span>
                                       </div>
                                   </div>
                                   <div className="event-body">
                                       <h3 className="event-title">{event.event_title}</h3>
                                       <div className="event-meta">
                                           {event.event_time && (
                                               <span className="event-meta-item">
                                                   <span className="event-meta-icon">🕐</span>
                                                   {event.event_time}
                                               </span>
                                           )}
                                           {event.venue && (
                                               <span className="event-meta-item">
                                                   <span className="event-meta-icon">📍</span>
                                                   {event.venue}
                                               </span>
                                           )}
                                       </div>
                                       {event.short_description && (
                                           <p className="event-desc">{event.short_description}</p>
                                       )}
                                       {event.button_name && (
                                           <Link
                                               to={event.button_link || '/events'}
                                               className="btn btn-outline"
                                               style={{ fontSize: '13px', padding: '8px 20px' }}
                                           >
                                               {event.button_name}
                                           </Link>
                                       )}
                                   </div>
                               </div>
                           )
                       })}
                   </div>
                   <div className="events-view-all">
                       <Link to="/events" className="btn btn-primary">View All Events</Link>
                   </div>
               </div>
           </section>
       )
}

export default UpcomingEvents