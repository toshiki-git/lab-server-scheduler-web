"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect } from "react";

export default function CalendarPage() {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/users?user_id=1935980d-81bc-4b59-9dfe-88f48fde9700"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // This will catch any responses that aren't in the 2xx range
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchUserData();
  }, []);
  const handleDateSelect = (selectInfo: any) => {
    let title = prompt("Please enter a new event title:");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      let event = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      calendarApi.addEvent(event);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-5">
      <FullCalendar
        plugins={[
          resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,dayGridMonth",
        }}
        initialView="timeGridWeek"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={[
          { title: "nice event", start: new Date(), resourceId: "a" },
        ]}
        select={handleDateSelect}
      />
    </div>
  );
}
