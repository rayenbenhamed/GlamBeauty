import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarPanel = ({ events }) => {
  const defaultEvents = [
    { title: "Bridal Trial", start: "2026-06-06T11:00:00" },
    { title: "Balayage", start: "2026-06-07T15:30:00" }
  ];

  return (
    <div className="glass-panel p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        events={events || defaultEvents}
        height="auto"
      />
    </div>
  );
};

export default CalendarPanel;
