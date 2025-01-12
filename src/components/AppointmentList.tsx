import { useState } from "react";
import { ScheduleAppointment } from "./ScheduleAppointment";
import { Appointment, formatDateTime } from "../utilities/types";
import { cancelAppointment } from "../services/cancelAppointment";

interface AppointmentListProps {
  appointments: Appointment[];
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
}) => {
  const [managing, setManaging] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleManage = (appointment: Appointment) => {
    setManaging(true);
    setSelectedAppointment(appointment);
  };

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded shadow-md p-5 mt-10 h-full">
        <h2 className="text-2xl font-bold mb-4 text-gray">
          No Appointments Found
        </h2>
        <ScheduleAppointment />
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div className="p-4 bg-off-white rounded">
          <h2 className="text-2xl font-bold mb-4 text-gray">
            Your Appointments
          </h2>
          <ul>
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="p-4 mb-5 bg-off-white hover:bg-white shadow-sm hover:shadow-md animation transition ease-in-out duration-75 group"
              >
                <p className="mb-2">
                  <strong>Reason for Visit: </strong>
                  <span className=" px-2 py-1 shadow-md">
                    {appointment.reasonForVisit}
                  </span>
                </p>

                <p className="mb-2">
                  <strong>Status: </strong>
                  {appointment.status}
                </p>
                <p className="mb-2">
                  <strong>Date: </strong>
                  {formatDateTime(appointment.appointmentDate)}
                </p>
                <button
                  onClick={() => handleManage(appointment)}
                  className="font-mono bg-dark-gray p-1 rounded-sm text-white transition ease-in-out duration-300 group-hover:bg-blue"
                >
                  Manage
                </button>
              </li>
            ))}
          </ul>
        </div>
        {managing && selectedAppointment && (
          <div className="w-full h-full absolute top-0 left-0 bg-off-white flex items-center justify-center">
            <div>
              <h1 className="font-bold text-gray mb-2">
                {selectedAppointment.reasonForVisit}
              </h1>
              <h2 className="mb-2">
                {formatDateTime(selectedAppointment.appointmentDate)}
              </h2>
              <div className="flex gap-3 justify-between">
                <button
                  onClick={() => {
                    console.log(
                      "Selected appointment timeSlot:",
                      selectedAppointment.timeSlot
                    );
                    console.log(
                      "Selected appointment date:",
                      selectedAppointment.appointmentDate
                    );
                    cancelAppointment(
                      selectedAppointment.id,
                      selectedAppointment.appointmentDate, // Pass the date
                      selectedAppointment.timeSlot // Pass the time slot
                    );
                  }}
                  className="bg-red rounded-sm shadow-md text-white py-1 px-2 mt-5 mx-auto block font-mono"
                >
                  cancel appt.
                </button>
                <button
                  onClick={() => setManaging(false)}
                  className="bg-green rounded-sm shadow-md text-white py-1 px-2 mt-5 mx-auto block font-mono"
                >
                  reschedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray">
          Schedule an appointment
        </h2>
        <ScheduleAppointment />
      </div>
    </>
  );
};
